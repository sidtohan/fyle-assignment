// API TOKEN with no permissions
const getUser = async (name) => {
  let user = await fetch(`https://fyle-assignment-proxy.vercel.app/user?name=${name}`, {
    method: "GET",
    mode: "cors",
  });
  user = await user.json();
  return user;
}
const fetchData = async (name) => {
    return await getUser(name);
}


export default fetchData;