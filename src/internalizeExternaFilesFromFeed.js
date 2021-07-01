import fs from "fs/promises";
import fsOld from "fs";
import path from "path";
import crypto from "crypto";
import detectMime from "mime-types";

import pathToReadStream from "./pathToReadStream.js";

async function download(url, filePath) {
	const file = fsOld.createWriteStream(filePath);
	const readStream = await pathToReadStream(url);

	await new Promise((done, fail) => {
		readStream.pipe(file);

		// The destination stream is ended by the time it's called
		file.on("finish", done);

		readStream.on("error", (err) => {
			fsOld.unlink(filePath, () => fail(err));
		});

		file.on("error", (err) => {
			fs.unlink(filePath, () => fail(err));
		});
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
	const absoluteLocalDir = path.dirname(absoluteLocalPath);

	await fs.mkdir(absoluteLocalDir, { recursive: true });
	const fileExistsLocally = await doesFileExist(absoluteLocalPath);

	if (!fileExistsLocally) {
		console.log(remoteUrl, "=>", localPath);
		await download(remoteUrl, absoluteLocalPath);
	}

	return localPath;
}

export default async function internalizeExternaFilesFromFeed(opts, feed) {
	if (!opts["--for-hyper"]) {
		return feed;
	}
	const convertAsset = convertRemoteToLocal.bind(null, opts);

	feed.image = await convertAsset(feed.image);

	for (const episode of feed.episodes) {
		if (episode?.media?.image) {
			episode.media.image = await convertAsset(episode?.media?.image);
		}
		if (episode?.media?.audio) {
			episode.media.audio = await convertAsset(episode?.media?.audio);
		}
	}

	return feed;
}
