import * as request from "supertest";
import app from "../../src/app";
import * as migration from "../migration/migration";
import * as jwtUtils from "../../src/utils/jwt";

beforeEach(async () => {
  await migration.upComments();
});

afterEach(async () => {
  await migration.downComments();
});

describe("GET /orgs/{organization}/comments - organization api endpoint", () => {
  it("Get All Comments API Request", async () => {
    const result: any = await request(app).get("/orgs/vuejs/comments");
    const expected = [
      {
        email: "anonymous",
        organization: "vuejs",
        comment: "good job"
      },
      {
        email: "admin@system.com",
        organization: "vuejs",
        comment: "thank you for your support"
      }
    ];
    expect(result.status).toEqual(200);
    expect(result.body.data).toMatchObject(expected);
  });

  it("Get Empty Comments API Request", async () => {
    const result: any = await request(app).get("/orgs/google/comments");
    expect(result.status).toEqual(200);
    expect(result.body.data.length).toEqual(0);
  });
});

describe("POST /orgs/{organization}/comments - organization api endpoint", () => {
  it("Comments API Request, Valid Post Member", async () => {
    const hashedPayload: jwtUtils.Payload = {
      uuid: "a5678438-38d6-11e9-b1ca-7d1685deabce",
      email: "admin@system.com"
    };
    const token = await jwtUtils.createJwt(hashedPayload);
    const result: any = await request(app)
      .post("/orgs/vuejs/comments")
      .set("Authorization", `Bearer ${token}`)
      .send({ comment: "test" });
    expect(result.status).toEqual(200);
    expect(result.body.id).toEqual(3);
  });

  it("Comments API Request, Valid Post Anonymous", async () => {
    const result: any = await request(app)
      .post("/orgs/vuejs/comments")
      .send({ comment: "test" });
    expect(result.status).toEqual(200);
    expect(result.body.id).toEqual(3);
  });

  it("Comments API Request, Post No Comment", async () => {
    const result: any = await request(app).post("/orgs/vuejs/comments");
    expect(result.status).toEqual(500);
    expect(result.body.error).toEqual("only allowed using comment");
  });

  it("Comments API Request, Post Empty Comment", async () => {
    const result: any = await request(app)
      .post("/orgs/vuejs/comments")
      .send({ comment: "" });
    expect(result.status).toEqual(500);
    expect(result.body.error).toEqual("only allowed using comment");
  });

  it("Comments API Request, Invalid Orgazation", async () => {
    const result: any = await request(app).post("/orgs/123/comments");
    expect(result.status).toEqual(500);
    expect(result.body.error).toEqual("invalid organization");
  });
});

describe("DELETE /orgs/{organization}/comments - organization api endpoint", () => {
  it("Delete Comments API Request, Authorized Delete", async () => {
    const hashedPayload: jwtUtils.Payload = {
      uuid: "a5678438-38d6-11e9-b1ca-7d1685deabce",
      email: "admin@system.com"
    };
    const token = await jwtUtils.createJwt(hashedPayload);
    const result: any = await request(app)
      .delete("/orgs/vuejs/comments")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toEqual(200);
    expect(result.body.affected_rows).toEqual(2);
  });

  it("Delete Comments API Request, Unauthorized Delete", async () => {
    const result: any = await request(app).delete("/orgs/vuejs/comments");
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("unauthorized access");
  });
});

describe("GET /orgs/list - organization api endpoint", () => {
  it("Get Organization List API request, Default", async () => {
    const result: any = await request(app).get("/orgs/list");
    expect(result.status).toEqual(200);
    expect(result.body.data.length).toEqual(10);
  });

  it("Get Organization List API request, 2 Entry", async () => {
    const result: any = await request(app).get(
      "/orgs/list?since=100&per_page=2"
    );
    expect(result.status).toEqual(200);
    expect(result.body.data.length).toEqual(2);
  });
});

describe("GET /orgs/{organization}/members - organization api endpoint", () => {
  it("Get Organization Member List API request, Default", async () => {
    const result: any = await request(app).get("/orgs/vuejs/members");
    expect(result.status).toEqual(200);
    expect(result.body.data.length).toEqual(10);
    expect(Object.keys(result.body.data[0])).toEqual(
      expect.arrayContaining(["login", "avatar_url", "followers", "following"])
    );
  });

  it("Get Organization Member List API request, 2 Entry", async () => {
    const result: any = await request(app).get(
      "/orgs/vuejs/members?page=1&per_page=2"
    );
    expect(result.status).toEqual(200);
    expect(result.body.data.length).toEqual(2);
  });

  it("Get Organization Member List API request, Invalid Entry", async () => {
    const result: any = await request(app).get(
      "/orgs/123/members?page=1&per_page=2"
    );
    expect(result.status).toEqual(500);
  });
});
