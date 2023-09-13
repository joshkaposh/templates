#!/usr/bin/env node

import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import inquirer from "inquirer";
import createTemplate from "./create.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${__dirname}/templates`;

const TEMPLATES = fs.readdirSync(`${TEMPLATE_PATH}`);
const QUESTIONS = [
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
]
  inquirer.prompt(QUESTIONS).then((project) => {
  createTemplate(project["project-name"],`${TEMPLATE_PATH}/${project["project-choice"]}`);
})