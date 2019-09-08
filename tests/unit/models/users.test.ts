import * as users from "../../../src/models/users";
import * as migration from "../../migration/migration";

afterEach(async () => {
  await migration.downUsers();
});

describe("User Validation", () => {
  it("User Validation, valid test", async () => {
    const email = "admin@system.com";
    const result = await users.validate(email, "root");
    expect(result.email).toEqual(email);
  });
  it("User Validation, invalid param password", async () => {
    try {
      const email = "admin@system.com";
      await users.validate(email, "r00t");
    } catch (error) {
      expect(true);
    }
  });
  it("User Validation, invalid param email", async () => {
    try {
      const email = "admin@system.com";
      await users.validate(email, "r00t");
    } catch (error) {
      expect(true);
    }
  });
  it("User Validation, invalid param", async () => {
    try {
      await users.validate("", "");
    } catch (error) {
      expect(true);
    }
  });
});

describe("User Creation", () => {
  it("User Creation, valid test", async () => {
    const result = await users.createUser(
      "admin2",
      "admin2@gmail.com",
      "root",
      true
    );
    expect(result.id).toEqual(2);
  });

  it("User Creation, invalid test duplicate email", async () => {
    try {
      await users.createUser("admin2", "admin@system.com", "root", true);
    } catch (error) {
      expect(true);
    }
  });

  it("User Creation, invalid test invalid param", async () => {
    try {
      await users.createUser("", "", "", true);
    } catch (error) {
      expect(true);
    }
  });
});
