import { parseBlueprint } from ".";

const args = Bun.argv.slice(2);

parseBlueprint(args[0], args[1]);
