import * as orgs from "../../../src/github-api/organizations";

describe("Get Organizations", () => {
  it("Get Organizations, valid", async () => {
    const organizations = await orgs.getOrganizations(1, 10);
    expect(organizations.data.length).toEqual(10);
  });
  it("Get Organizations, invalid", async () => {
    const organizations = await orgs.getOrganizations();
    expect(organizations).toThrowError;
  });
});

describe("Get Organization", () => {
  it("Get Organization, valid", async () => {
    const organization = await orgs.getOrganization("vuejs");
    expect(organization).not.toThrowError;
  });
  it("Get Organization, invalid empty param", async () => {
    try {
      await orgs.getOrganization();
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });
  it("Get Organization, invalid organization", async () => {
    try {
      await orgs.getOrganization("123");
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });
});

describe("Get Members", () => {
  it("Get Members, valid", async () => {
    const organizations = await orgs.getMembers("vuejs", 1, 10);
    expect(organizations.data.length).toEqual(10);
  });
  it("Get Members, invalid empty param", async () => {
    try {
      await orgs.getMembers();
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });

  it("Get Members, invalid param", async () => {
    try {
      await orgs.getMembers("12", 1, 1);
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });
});

describe("Get Member", () => {
  it("Get Member, valid", async () => {
    const handle = "ministrycentered";
    const member = await orgs.getMember(handle);
    expect(member.login).toEqual(handle);
  });

  it("Get Member, invalid empty param", async () => {
    try {
      await orgs.getMember();
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });

  it("Get Member, invalid param", async () => {
    try {
      await orgs.getMember("0123");
    } catch (error) {
      expect(error.message).toEqual("Request failed with status code 404");
    }
  });
});
