import { Octokit } from "@octokit/core";

// API TOKEN with no permissions
const API_TOKEN = "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";
const apiAgent = new Octokit({ auth: API_TOKEN });

const getUser = async (name) => {
  const user = await apiAgent.request(`GET /users/${name}`, {
    username: name,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return user;
};

const fetchData = async (name) => {
    return await getUser(name);
}


export default fetchData;