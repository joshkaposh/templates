import * as fs from "fs";

const CURR_DIR = process.cwd();
function stringify(json) {
	return JSON.stringify(json,null,2)
}
function writeJson(path,json) {

	fs.writeFileSync(path,stringify(json),{encoding:'utf8'})
}

function createTemplate(projectName, templatePath,options) {
	fs.mkdirSync(`${CURR_DIR}/${projectName}`);
	
	writeJson(`${CURR_DIR}/${projectName}/consts.json`,{
		root: `${CURR_DIR}/${projectName}`
	})
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
			let contents = fs.readFileSync(origFilePath, {encoding:"utf8"});

			// Rename
			if (file === ".npmignore") file = ".gitignore";
			if (file === 'package.json') {
				const json = JSON.parse(contents);
				json.name = newProjectPath;
				contents = stringify(json)
			}
			const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
			fs.writeFileSync(writePath, contents, {encoding:"utf8"});
		} else if (stats.isDirectory() && file !== "node_modules" && file !== ".git") {
			fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

			// recursive call
			createTemplateRec(`${newProjectPath}/${file}`,`${templatePath}/${file}`);
		}
	}
};

export default createTemplate