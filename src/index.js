#!/usr/bin/env node

import arg from "arg";
import toml from "@iarna/toml";
import fs from "fs/promises";
import path from "path";
import prettier from "prettier";
import { mergeDeepLeft } from "ramda";

import createThumbnails from "./createThumbnails.js";
import createVercelBoilerplate from "./createVercelBoilerplate.js";
import generateLogoPage from "./generateLogoPage.js";
import generatePage from "./generatePage.js";
import internalizeExternaFilesFromFeed from "./internalizeExternaFilesFromFeed.js";
import runTailwind from "./runTailwind.js";
import writeStylesheet from "./writeStylesheet.js";

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
	console.log("built", outPath);
	await fs.writeFile(outPath, formattedHtml);
}

function generateFeedForEpisodePage(feed, episode) {
	return {
		...mergeDeepLeft(feed, episode),
		episodes: [episode],
	};
}

async function main(opts) {
	const feed = await fs
		.readFile(path.join(process.cwd(), opts["--feed"]), "utf8")
		.then(toml.parse)
		.then(internalizeExternaFilesFromFeed.bind(null, opts));

	await fs.mkdir(opts["--out-dir"], { recursive: true });

	await writePage(opts, "/", generatePage(opts, feed));

	await Promise.all(
		feed.episodes.map((episode) => {
			console.log(episode.slug);
			if (episode.slug) {
				return writePage(
					opts,
					`/episode/${episode.slug}`,
					generatePage(
						opts,
						generateFeedForEpisodePage(feed, episode),
					),
				);
			}

			return Promise.resolve();
		}),
	);

	if (opts["--logo-template"]) {
		await writePage(
			opts,
			`/logo-generator`,
			await generateLogoPage(opts, feed),
		);
	}

	await writeStylesheet(opts);
	//await createThumbnails(opts, feed);
	await runTailwind(opts);
	await createVercelBoilerplate(opts);
}

main(
	arg(
		{
			"--feed": String,
			"--out-dir": String,
			"--logo-template": String,
			"--for-hyper": Boolean,
			"--for-vercel": Boolean,
		},
		{ permissive: true, argv: process.argv.slice(2) },
	),
);
