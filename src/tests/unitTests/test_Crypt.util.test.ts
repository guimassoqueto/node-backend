import Crypt from "../../utils/Crypt.util";

describe("basic Hashing test", () => {
  test("", async () => {
    const plainString = "someStrongPassword123!@";

    const hashedPlainString = await Crypt.hashString(plainString);
    const matchPlainAndHash = await Crypt.checkHash(plainString, hashedPlainString);

    expect(matchPlainAndHash).toBeTruthy();
  });
});