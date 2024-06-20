import { parseBlueprint } from "../src/blueprint";
import { readFile, writeFile } from "fs/promises";
import inputPlutusJson from "./fixtures/plutus-vesting.json";
import expectedResult from "./fixtures/plutus-vesting.ts.txt";
import { jest, test, expect, mock } from "bun:test";

mock.module("fs/promises", () => ({
  writeFile: jest.fn().mockResolvedValue(0),
  readFile: jest.fn().mockResolvedValue(JSON.stringify(inputPlutusJson)),
}));

test("should successfully parse any plutus.json", async () => {
  const TARGET_FILENAME = "plutus.ts";

  await parseBlueprint("/whatever.json", TARGET_FILENAME);

  const writeMock = writeFile as jest.Mock<typeof writeFile>;

  expect(writeMock).toHaveBeenCalled();

  const [writePath, writeData] = writeMock.mock.calls[0];

  expect(writePath).toContain(TARGET_FILENAME);
  expect(writeData).toEqual(expectedResult);
});
