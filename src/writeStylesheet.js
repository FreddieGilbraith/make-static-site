import fs from "fs/promises";
import path from "path";

function generateStylesheet(opts) {
	return `
@font-face {
	font-family: 'Comfortaa';
	src: url('/fonts/Comfortaa-Regular.ttf');
}

@font-face {
	font-family: 'SpecialElite';
	src: url('/fonts/SpecialElite-Regular.ttf');
}

html, body, #__next {
	height: 100%;
	min-height: 100%;
}

.episodePreviewContainer:hover > .episodePreviewSlideout {
	--tw-translate-x: 0rem;
}`;
}

async function copyFontFiles(opts) {
	const outDir = path.join(process.cwd(), opts["--out-dir"], "fonts");
	await fs.mkdir(outDir, { recursive: true });

	const fontsFolder = path.join(
		path.dirname(new URL(import.meta.url).pathname),
		"..",
		"fonts",
	);

	const fontsFileNames = await fs.readdir(fontsFolder);

	for (const fontFileName of fontsFileNames) {
		await fs.copyFile(
			path.join(fontsFolder, fontFileName),
			path.join(outDir, fontFileName),
		);
	}
}

export default async function writeStylesheet(opts) {
	const outPath = path.join(process.cwd(), opts["--out-dir"], "main.css");

	const dirPath = path.dirname(outPath);

	await fs.mkdir(dirPath, { recursive: true });
	await fs.writeFile(outPath, generateStylesheet(opts));

	await copyFontFiles(opts);
}
