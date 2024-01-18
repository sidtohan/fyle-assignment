import { Octokit } from "@octokit/core";

const getPageData = async (name, page, limit) => {
  const data = await fetch(
    `https://fyle-assignment-proxy.vercel.app/repos?name=${name}&&page=${page}&&limit=${limit}`,
    {
      method: "GET",
      mode: "cors",
    }
  );
  return await data.json();
};

export default getPageData;
