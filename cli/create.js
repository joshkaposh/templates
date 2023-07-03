import * as fs from "fs";

const CURR_DIR = process.cwd();

function createTemplate(projectName, templatePath,options) {
    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createTemplateRec(projectName,templatePath)
}

function createTemplateRec (newProjectPath,templatePath) {
	const filesToCreate = fs.readdirSync(templatePath);

	for (let i = 0; i < filesToCreate.length; i++) {
		let file = filesToCreate[i];
		const origFilePath = `${templatePath}/${file}`;
		// get stats about the current file
		const stats = fs.statSync(origFilePath);

		if (stats.isFile()) {
			const contents = fs.readFileSync(origFilePath, "utf8");

			// Rename
			if (file === ".npmignore") file = ".gitignore";

			const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
			fs.writeFileSync(writePath, contents, "utf8");
		} else if (stats.isDirectory() && file !== "node_modules" && file !== ".git") {
			fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

			// recursive call
			createTemplateRec(`${newProjectPath}/${file}`,`${templatePath}/${file}`);
		}
	}
};

export default createTemplate