import fs from "fs/promises";
import path from "path";

export default async function createVercelBoilerplate(opts){
	if(!opts["--for-vercel"]){
		return;
	}

	const outPath = path.join(
		process.cwd(),
		"vercel.json",
	);

	console.log("built", outPath);
	await fs.writeFile(outPath, JSON.stringify(

{
	"headers": [
		{
			"source": "/(.*)",
			"headers": [
				{ "key": "X-Clacks-Overhead", "value": "GNU Terry Pratchet" }
			]
		}
	],
	"rewrites": [
		{
			"source": "/bee.js",
			"destination": "https://cdn.splitbee.io/sb.js"
		},
		{
			"source": "/_hive/:slug",
			"destination": "https://hive.splitbee.io/:slug"
		}
	]
}
	,null, 2));

}
