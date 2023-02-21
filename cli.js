import chalk from "chalk";
import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import createTemplate from "./createTemplate.js";

const bold = chalk.bold;
const yellow = chalk.yellow;

const __dirname = dirname(fileURLToPath(import.meta.url));
const CURR_DIR = process.cwd();
const TEMPLATES = fs.readdirSync(`${__dirname}/project-templates`);

export const QUESTIONS = [
	{
		name: "project-choice",
		type: "list",
		message: "What project template would you like to generate?",
		choices: TEMPLATES,
	},
	{
		name: "project-name",
		type: "input",
		message: "Project name:",
		validate: (input) => {
			if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
			else return "Project name may only include letters, numbers, underscores and hashes.";
		},
	},
];

const printProjectCreated = (projectName) => {
	const createdMsg = `${chalk.green.bold("Project Created!")}`;
	console.clear();
	console.log(createdMsg);
	console.log(`${yellow('cd')} into ${chalk.blue(projectName)} and install dependencies`)
	console.log(`Take a look at ${yellow('package.json')} for start script`);
	console.log(`${bold("Happy")} ${yellow.bold("Coding!")}`);
	console.log(chalk.hidden(""));
};

export const handleUserChoice = (answers) => {
	const projectChoice = answers["project-choice"];
	const projectName = answers["project-name"];
	const templatePath = `${__dirname}/project-templates/${projectChoice}`;
	fs.mkdirSync(`${CURR_DIR}/${projectName}`);
	createTemplate(templatePath, projectName);
	printProjectCreated(projectName);
};
