import * as request from "supertest";
import app from "../../src/app";
import * as migration from "../migration/migration";
import * as jwtUtils from "../../src/utils/jwt";

afterEach(async () => {
  await migration.downUsers();
});

describe("GET /user/accesstoken - user api endpoint", () => {
  it("Get User Access Token API Request, Valid", async () => {
    const email = "admin@system.com";
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        email: email,
        password: "root"
      });

    const payload = await jwtUtils.verifyJwt(result.body.token);

    expect(result.status).toEqual(200);
    expect(payload.email).toEqual(email);
  });

  it("Get User Access Token API Request, Invalid password", async () => {
    const email = "admin@system.com";
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        email: email,
        password: "r00t"
      });
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("invalid password");
  });

  it("Get User Access Token API Request, Invalid email", async () => {
    const email = "nonadmin@system.com";
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        email: email,
        password: "root"
      });
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("invalid email");
  });

  it("Get User Access Token API Request, No Password", async () => {
    const email = "nonadmin@system.com";
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        email: email
      });
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("only allowed using user password");
  });

  it("Get User Access Token API Request, No Email", async () => {
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        password: "root"
      });
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("only allowed using user email");
  });

  it("Get User Access Token API Request, Empty Password", async () => {
    const email = "nonadmin@system.com";
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        email: email,
        password: ""
      });
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("only allowed using user password");
  });

  it("Get User Access Token API Request, Empty Email", async () => {
    const result: any = await request(app)
      .post("/user/accesstoken")
      .send({
        email: "",
        password: "root"
      });
    expect(result.status).toEqual(401);
    expect(result.body.error).toEqual("only allowed using user email");
  });
});

describe("POST /user/admin/register - user api endpoint", () => {
  it("Register Admin User API Request, Valid", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "admin2",
        email: "azuresky2@gmail.com",
        password: "root"
      });

    expect(result.status).toEqual(200);
  });

  it("Register Admin User API Request, Invalid Duplicate", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "admin",
        email: "admin@system.com",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Admin User API Request, Invalid No name", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        email: "admin@system.com",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Admin User API Request, Invalid Empty name", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "",
        email: "admin@system.com",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Admin User API Request, Invalid No email", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "admin",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Admin User API Request, Invalid Empty email", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "admin",
        email: "",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Admin User API Request, Invalid No password", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "admin",
        email: "admin@system.com"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Admin User API Request, Invalid Empty password", async () => {
    const result: any = await request(app)
      .post("/user/admin/register")
      .send({
        name: "admin",
        email: "admin@system.com",
        password: ""
      });

    expect(result.status).toEqual(500);
  });
});

describe("POST /user/member/register - user api endpoint", () => {
  it("Register Member User API Request, Valid", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "admin2",
        email: "azuresky2@gmail.com",
        password: "root"
      });

    expect(result.status).toEqual(200);
  });

  it("Register Member User API Request, Invalid Duplicate", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "admin",
        email: "admin@system.com",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Member User API Request, Invalid No name", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        email: "admin@system.com",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Member User API Request, Invalid Empty name", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "",
        email: "admin@system.com",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Member User API Request, Invalid No email", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "admin",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Member User API Request, Invalid Empty email", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "admin",
        email: "",
        password: "root"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Member User API Request, Invalid No password", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "admin",
        email: "admin@system.com"
      });

    expect(result.status).toEqual(500);
  });

  it("Register Member User API Request, Invalid Empty password", async () => {
    const result: any = await request(app)
      .post("/user/member/register")
      .send({
        name: "admin",
        email: "admin@system.com",
        password: ""
      });

    expect(result.status).toEqual(500);
  });
});
