import { Octokit } from "@octokit/core";
const API_TOKEN = (process.env.API_TOKEN);
const apiAgent = new Octokit({ auth: API_TOKEN });

const getPageData = async (name, page, limit) => {
  const data = await apiAgent.request(`GET /users/${name}/repos`, {
    username: name,
    page: page,
    per_page: limit,
    sort: "created",
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
  });
  return data;
}

export default getPageData;