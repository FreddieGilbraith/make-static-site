import fs from "fs/promises";

export default async function doesFileExist(filePath) {
	try {
		await fs.access(filePath);
		return true;
	} catch (e) {
		return false;
	}
}
