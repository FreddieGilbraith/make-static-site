import fs from "fs/promises";
import path from "path";

import makeDocumentHead from "./makeDocumentHead.js";

export default async function generateLogoPage(opts, feed) {
	const templateFilePath = path.join(process.cwd(), opts["--logo-template"]);

	const template = await fs.readFile(templateFilePath, "utf8");

	return `
<html>
	<head>
		${makeDocumentHead(opts, feed)}

		<style>
			html { font-size : calc(calc( min(1vh, 1vw ) + calc(1vh + 1vw ) ) / 3); }
		</style>

	</head>

	<body>

${template}

	<script>
document.querySelectorAll("[data-query-value]").forEach(el => {
	for(const [ key, value ] of new URLSearchParams(window.location.search)){
		if(key === el.dataset.queryValue){
			el.textContent = value;
		}
	}
});
	</script>

	</body>
</html>
`;
}
