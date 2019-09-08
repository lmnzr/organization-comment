import * as comments from "../../../src/models/comments";
import * as migration from "../../migration/migration";

beforeEach(async () => {
  await migration.upComments();
});

afterEach(async () => {
  await migration.downComments();
});

describe("List Comments", () => {
  it("List Comments, valid test", async () => {
    const result = await comments.listComment("vuejs");
    expect(result.length).toEqual(2);
  });

  it("List Comments, valid test no exist", async () => {
    const result = await comments.listComment("google");
    expect(result.length).toEqual(0);
  });

  it("List Comments, valid test empty", async () => {
    const result = await comments.listComment("");
    expect(result.length).toEqual(0);
  });
});

describe("Delete Comments", () => {
  it("Delete Comments, valid deletion", async () => {
    const result = await comments.deleteComments(
      "vuejs",
      "a5678438-38d6-11e9-b1ca-7d1685deabce"
    );
    expect(result.affected_rows).toEqual(2);
  });

  it("Delete Comments, valid no deletion", async () => {
    const result = await comments.deleteComments(
      "google",
      "a5678438-38d6-11e9-b1ca-7d1685deabce"
    );
    expect(result.affected_rows).toEqual(0);
  });

  it("Delete Comments, invalid uuid", async () => {
    try {
      await comments.deleteComments("", "");
    } catch (error) {
      expect(true);
    }
  });
});

describe("Insert Comments", () => {
  it("Insert Comments, valid test", async () => {
    const result = await comments.insertComment(
      "anonymous",
      "google",
      "amazing"
    );
    expect(result.id).toEqual(3);
  });

  it("Insert Comments, valid test empty param", async () => {
    const result = await comments.insertComment("", "", "");
    expect(result.id).toEqual(3);
  });
});
