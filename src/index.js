#!/usr/bin/env node

import arg from "arg";
import toml from "@iarna/toml";
import fs from "fs/promises";
import path from "path";
import prettier from "prettier";

import generatePage from "./generatePage.js";
import writeStylesheet from "./writeStylesheet.js";
import runTailwind from "./runTailwind.js";

async function writePage(opts, pagePath, html) {
	const outPath = path.join(
		process.cwd(),
		opts["--out-dir"],
		pagePath,
		"index.html",
	);
	const dirPath = path.dirname(outPath);
	await fs.mkdir(dirPath, { recursive: true });

	const formattedHtml = prettier.format(html, { parser: "html" });

	await fs.writeFile(outPath, formattedHtml);
}

function generateFeedForEpisodePage(feed, episode) {
	return {
		...feed,
		...episode,
		links: {
			...feed.links,
			...episode.links,
		},
		episodes: [episode],
	};
}

async function main(opts) {
	console.log(path.join(process.cwd(), opts["--feed"]));

	const feed = await fs
		.readFile(path.join(process.cwd(), opts["--feed"]), "utf8")
		.then(toml.parse);

	await fs.mkdir(opts["--out-dir"], { recursive: true });

	await writePage(opts, "/", generatePage(opts, feed));

	for (const episode of feed.episodes) {
		await writePage(
			opts,
			`/episode/${episode.slug}`,
			generatePage(opts, generateFeedForEpisodePage(feed, episode)),
		);
	}

	await writeStylesheet(opts);
	await runTailwind(opts);
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
