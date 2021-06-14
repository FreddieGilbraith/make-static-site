import arg from "arg";
import toml from "@iarna/toml";
import fs from "fs/promises";
import path from "path";

import generateHomepage from "./generateHomepage.js";
import generateEpisodePage from "./generateEpisodePage.js";

async function writePage(opts, pagePath, html) {
	const outPath = path.join(
		process.cwd(),
		opts["--out-dir"],
		pagePath,
		"index.html",
	);
	const dirPath = path.dirname(outPath);
	await fs.mkdir(dirPath, { recursive: true });

	await fs.writeFile(outPath, html);
}

async function main(opts) {
	console.log(path.join(process.cwd(), opts["--feed"]));

	const feed = await fs
		.readFile(path.join(process.cwd(), opts["--feed"]), "utf8")
		.then(toml.parse);

	await fs.mkdir(opts["--out-dir"], { recursive: true });

	await writePage(opts, "/", generateHomepage(opts, feed));

	for (const episode of feed.episodes) {
		await writePage(
			opts,
			`/episode/${episode.slug}`,
			generateEpisodePage(opts, feed, episode),
		);
	}
}

main(
	arg(
		{
			"--feed": String,
			"--out-dir": String,
		},
		{ permissive: true, argv: process.argv.slice(2) },
	),
);
