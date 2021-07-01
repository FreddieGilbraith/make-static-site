import fs from "fs/promises";
import fsOld from "fs";
import path from "path";
import sharp from "sharp";

import pathToReadStream from "./pathToReadStream.js";

async function doesFileExist(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch (e) {
		return false;
	}
}

export default async function createThumbnails(opts, feed) {
	const sourceFilePath = feed.image.startsWith("http")
		? feed.image
		: path.join(process.cwd(), opts["--out-dir"], feed.image);

	const destinationFolder = path.join(
		process.cwd(),
		opts["--out-dir"],
		"logos",
	);

	await fs.mkdir(destinationFolder, { recursive: true });

	await Promise.all(
		[4, 5, 6, 7, 8, 9, 10].map(async (x) => {
			const dim = Math.pow(2, x);

			const destinationFilePath = path.join(
				destinationFolder,
				`Square@${dim}.png`,
			);

			if (await doesFileExist(destinationFilePath)) {
				console.log("skipped", destinationFilePath);
				return;
			}

			await new Promise(async (done, fail) => {
				const inStream = await pathToReadStream(sourceFilePath);

				const stream = inStream
					.pipe(sharp().resize(dim, dim))
					.pipe(fsOld.createWriteStream(destinationFilePath));

				stream.on("finish", done);
				stream.on("error", fail);
			});
			console.log(sourceFilePath, "=>", destinationFilePath);
		}),
	);

	if (opts["--for-hyper"]) {
		const sourcePath = path.join(destinationFolder, `Square@256.png`);
		const destPath = path.join(
			process.cwd(),
			opts["--out-dir"],
			"thumb.png",
		);

		if (doesFileExist(destPath)) {
			console.log("skipped", destPath);
			return;
		}
		console.log(sourcePath, "=>", destPath);
		await fs.copyFile(sourcePath, destPath);
	}
}
