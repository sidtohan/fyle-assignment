import { Octokit } from "@octokit/core";

// API TOKEN with no permissions
const API_TOKEN = (process.env.API_TOKEN)
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