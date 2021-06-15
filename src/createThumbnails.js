import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export default async function createThumbnails(opts, feed) {
	const sourceFilePath = path.join(
		process.cwd(),
		opts["--out-dir"],
		feed.image,
	);

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

		await new Promise((done, fail) =>
			sharp(sourceFilePath)
				.resize(dim, dim)
				.toFile(destinationFilePath, (err, dat) =>
					err ? fail(err) : done(dat),
				),
		);
	}

	console.log(feed.image);
}
