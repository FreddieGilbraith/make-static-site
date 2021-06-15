import fs from "fs/promises";
import fsOld from "fs";
import path from "path";
import crypto from "crypto";
import detectMime from "mime-types";

async function download(url, filePath) {
	const proto = await (!url.charAt(4).localeCompare("s")
		? import("https")
		: import("http"));

	return new Promise((resolve, reject) => {
		const file = fsOld.createWriteStream(filePath);
		let fileInfo = null;

		const request = proto.get(url, (response) => {
			if (response.statusCode === 302) {
				resolve(download(response.headers.location, filePath));
				return;
			}

			if (response.statusCode !== 200) {
				reject(
					new Error(
						`Failed to get '${url}' (${response.statusCode})`,
					),
				);
				return;
			}

			fileInfo = {
				mime: response.headers["content-type"],
				size: parseInt(response.headers["content-length"], 10),
			};

			response.pipe(file);
		});

		// The destination stream is ended by the time it's called
		file.on("finish", () => resolve(fileInfo));

		request.on("error", (err) => {
			fsOld.unlink(filePath, () => reject(err));
		});

		file.on("error", (err) => {
			fs.unlink(filePath, () => reject(err));
		});

		request.end();
	});
}

async function doesFileExist(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch (e) {
		return false;
	}
}

async function convertRemoteToLocal(opts, remoteUrl) {
	const mime = detectMime.lookup(remoteUrl);
	const hash = crypto
		.createHash("sha256")
		.update(remoteUrl)
		.digest("hex")
		.slice(0, 16);
	const ext = path.extname(remoteUrl);

	const localPath = path.join("/", mime, `${hash}${ext}`);
	const absoluteLocalPath = path.join(
		process.cwd(),
		opts["--out-dir"],
		localPath,
	);
	const localDir = path.dirname(absoluteLocalPath);

	await fs.mkdir(localDir, { recursive: true });
	const fileExistsLocally = await doesFileExist(absoluteLocalPath);

	if (!fileExistsLocally) {
		console.log(remoteUrl, "=>", localPath);
		await download(remoteUrl, localPath);
	}

	return localPath;
}

export default async function internalizeExternaFilesFromFeed(opts, feed) {
	if (!opts["--import-files"]) {
		return feed;
	}
	const convertAsset = convertRemoteToLocal.bind(null, opts);

	feed.image = await convertAsset(feed.image);

	for (const episode of feed.episodes) {
		episode.image = await convertAsset(episode.image);
		episode.links.rss = await convertAsset(episode.links.rss);
	}

	return feed;
}
