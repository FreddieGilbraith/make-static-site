import fs from "fs/promises";
import fsOld from "fs";
import path from "path";
import sharp from "sharp";

import pathToReadStream from "./pathToReadStream.js";

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

	for (const x of [4, 5, 6, 7, 8, 9, 10]) {
		const dim = Math.pow(2, x);

		const destinationFilePath = path.join(
			destinationFolder,
			`Square@${dim}.png`,
		);

		console.log(sourceFilePath, "=>", destinationFilePath);

		await new Promise(async (done, fail) => {
			const inStream = await pathToReadStream(sourceFilePath);

			const stream = inStream
				.pipe(sharp().resize(dim, dim))
				.pipe(fsOld.createWriteStream(destinationFilePath));

			stream.on("finish", done);
			stream.on("error", fail);
		});
	}
}
