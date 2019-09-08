import * as request from "supertest";
import app from "../../src/app";

describe("GET /health - healthcheck api endpoint", () => {
  it("Health API Request", async () => {
    const result: any = await request(app).get("/health");
    expect(result.status).toEqual(200);
    expect(result.body.m).toEqual("Server Is Live");
  });
});
