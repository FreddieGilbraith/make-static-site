import fs from "fs/promises";
import path from "path";
import { spawn } from "child_process";

async function createTailwindConfig(opts) {
	const tailwindConfigSrc = `
const lbzConfig =require( "@little-bonsai/tailwind-config");

module.exports = {
	...lbzConfig,
	mode: "jit",
	purge: [
		"${opts["--out-dir"]}/**/*.html",
	]
}`;

	await fs.writeFile(
		path.join(process.cwd(), "tailwind.config.cjs"),
		tailwindConfigSrc,
	);
}

async function runTailwindCmd(opts) {
	console.log("running tailwind subproccess");

	const args = [
		"build",
		"-c",
		path.join(process.cwd(), "tailwind.config.cjs"),
		"--o",
		path.join(opts["--out-dir"], "tailwind.css"),
	];

	console.log("tailwind", ...args);

	const child = spawn("tailwind", args, {
		env: {
			...process.env,
			NODE_ENV: "production",
		},
	});

	for await (const data of child.stdout) {
		console.log("" + data);
	}
}

export default async function runTailwind(opts) {
	await createTailwindConfig(opts);
	await runTailwindCmd(opts);
}
