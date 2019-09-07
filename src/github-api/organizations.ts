/* eslint-disable @typescript-eslint/no-inferrable-types */
import axios from "axios";

const apiUrl = "https://api.github.com";
const token = Buffer.from(
  `${process.env.GITHUB_USERNAME}:${process.env.GITHUB_PASSWORD}`
).toString("base64");
const authHeader = {
  headers: {
    Authorization: `Basic ${token}`
  }
};

export const getOrganizations: any = (since: number, entry: number) => {
  return axios.get(
    `${apiUrl}/organizations?since=${since}&per_page=${entry}`,
    authHeader
  );
};

export const getOrganization: any = (organization: string) => {
  return axios.get(`${apiUrl}/orgs/${organization}`, authHeader);
};

export const getMembers: any = (
  organization: string,
  page: number,
  entry: number
) => {
  return axios.get(
    `${apiUrl}/orgs/${organization}/members?page=${page}&per_page=${entry}`,
    authHeader
  );
};

export const getMember: any = (member: string) => {
  return axios
    .get(`${apiUrl}/users/${member}`, authHeader)
    .then((response: any) => {
      return response.data;
    });
};

export const mapMemberDetail: any = (data: any) => {
  return axios.all(
    data.map((result: any) => {
      return getMember(result.login);
    })
  );
};
