import * as jwtUtils from "../../../src/utils/jwt";

describe("JWT Utilities", () => {
  it("generate JWT", async () => {
    const hashedPayload: jwtUtils.Payload = {
      uuid: "a5678438-38d6-11e9-b1ca-7d1685deabce",
      email: "admin@system.com"
    };
    const token = await jwtUtils.createJwt(hashedPayload);

    const parsedPayload = await jwtUtils.verifyJwt(token);

    expect(parsedPayload).toMatchObject(hashedPayload);
  });
});
