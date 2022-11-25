#!/usr/bin/env node

import inquirer from "inquirer";
import { QUESTIONS, handleUserChoice } from "./cli.js";

inquirer.prompt(QUESTIONS).then(handleUserChoice);
