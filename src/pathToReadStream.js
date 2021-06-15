import fs from "fs";

async function urlToReadStream(url) {
	const proto = await (!url.charAt(4).localeCompare("s")
		? import("https")
		: import("http"));

	return new Promise((resolve, reject) => {
		proto.get(url, (response) => {
			if (response.statusCode === 302) {
				resolve(urlToReadStream(response.headers.location));
				return;
			}

			if (response.statusCode !== 200) {
				reject(
					new Error(
						`Failed to get '${url}' (${response.statusCode})`,
					),
				);
				return;
			}

			resolve(response);
		});
	});
}

export default function pathToReadStream(path) {
	if (path.startsWith("http")) {
		return urlToReadStream(path);
	} else {
		return fs.createReadStream(path);
	}
}
