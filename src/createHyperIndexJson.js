import fs from "fs/promises";
import path from "path";
import doesFileExist from "./doesFileExist.js";

export default async function createHyperIndexJson(opts, feed) {
	const outPath = path.join(process.cwd(), opts["--out-dir"], "index.json");

	const formattedIndex = JSON.stringify({
		title: feed.title,
		description: feed.subtitle,
	});

	const existingIndex = await doesFileExist(outPath).then((exists) =>
		exists ? fs.readFile(outPath, "utf8") : "",
	);

	if (formattedIndex === existingIndex) {
		console.log("skipped", outPath);
	} else {
		await fs.writeFile(outPath, formattedIndex);
		console.log("built", outPath);
	}
}
