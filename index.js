#!/usr/bin/env node

import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import yargs from 'yargs/yargs'
import {hideBin} from 'yargs/helpers'
import createTemplate from "./cli/create.js";
import parsed from "./cli/parse.js";

// project-name --template=[solid | react] --mono
const argv = yargs(hideBin(process.argv)).argv
const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${__dirname}/templates`;

if (argv._[0] === undefined) {
  console.log('No commands given!');
  const TEMPLATES = fs.readdirSync(`${TEMPLATE_PATH}`);
  inquirer.prompt([
    {
        name: "project-choice",
        type: "list",
        message: "What project template would you like to generate?",
        choices:TEMPLATES,
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
]).then((answers) => {
  createTemplate(answers["project-name"],`${TEMPLATE_PATH}/${answers["project-choice"]}`);
})
  // should run inquirer to create template
} else {
  const args = parsed(argv);
  createTemplate(args.name, `${TEMPLATE_PATH}/${args.template}`,args.options);
}