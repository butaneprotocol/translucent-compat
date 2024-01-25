import { parseBlueprint } from "../src/blueprint";
import path from "path";
import expectedResult from "./fixtures/plutus-vesting.ts.txt";

jest.spyOn(Bun, "write").mockImplementation((path, data) => {
  return Promise.resolve(data.toString().length);
});

it("should successfully parse any plutus.json", async () => {
  const TARGET_FILENAME = "plutus.ts";

  const plutusLocation = path.join(
    import.meta.dir,
    "./fixtures/plutus-vesting.json",
  );
  await parseBlueprint(plutusLocation, TARGET_FILENAME);

  const writeMock = Bun.write as jest.MockedFunction<typeof Bun.write>;

  expect(writeMock).toHaveBeenCalled();

  const [writePath, writeData] = writeMock.mock.calls[0];

  expect(writePath).toContain(TARGET_FILENAME);
  expect(writeData).toEqual(expectedResult);
});
