#!/usr/bin/env node

import { parseBlueprint } from "./blueprint.js";

const args = process.argv.slice(2);

parseBlueprint(args[0], args[1]);
