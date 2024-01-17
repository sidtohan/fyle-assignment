// JS Imports
import fetchData from "./src/api/apiMain.js";
import userInfo from "./src/scripts/userInfo.js";
import userRepos from "./src/scripts/userRepos.js";
import list from "./src/scripts/temp.js";

// CSS
import "/src/styles/userInfo.css";
import "/src/styles/main.css";
import "/src/styles/userRepos.css"

// Main Component
const initializeApp = async () => {
    const root = document.querySelector("#root");
    const userData = await fetchData("johnpapa");

    root.appendChild(userInfo(userData));
    root.appendChild(userRepos(list))
}

window.onload = initializeApp();