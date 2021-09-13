import fetch from "node-fetch";

import fs from "fs/promises";
import path from "path";

export default async function createSpodisafeRssFeed(opts, feed) {
	const outDir = path.join(process.cwd(), opts["--out-dir"], "/feed");

	const outPath = path.join(outDir, "spodisafe.xml");

	const source = await fetch(feed.links.rssSpotify).then((x) => x.text());

	let withReplacedMedia = source;

	for (const episode of feed.episodes) {
		if (episode.media.spodisafe) {
			withReplacedMedia = withReplacedMedia.replace(
				episode.media.audio,
				episode.media.spodisafe,
			);

			withReplacedMedia = withReplacedMedia.replace(
				episode.media.audio
					.replace("https", "http")
					.replace("/secure", ""),
				episode.media.spodisafe,
			);
		}
	}

	await fs.mkdir(outDir, { recursive: true });

	await fs.writeFile(outPath, withReplacedMedia);

	console.log("wrote", outPath);
}
