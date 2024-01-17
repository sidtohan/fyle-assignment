import fetchData from "../src/api/apiMain.js";
import userInfo from "../src/scripts/userInfo.js";

// Main Component
const initializeApp = async () => {
    const root = document.querySelector("#root");
    const userData = await fetchData("sidtohan");

    root.appendChild(userInfo(userData));
}

window.onload = initializeApp();