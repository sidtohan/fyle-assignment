// JS Imports
import fetchData from "./src/api/apiMain.js";
import userInfo from "./src/scripts/userInfo.js";
import userRepos from "./src/scripts/userRepos.js";

// CSS
import "/src/styles/userInfo.css";
import "/src/styles/main.css";
import "/src/styles/userRepos.css"

// Main Component
const initializeApp = async () => {
    const root = document.querySelector(".root");
    const userData = await fetchData("johnpapa");
    const totalRepos = userData.data.public_repos;
    
    userInfo(userData);
    root.classList.remove("loading")
    
    await userRepos("johnpapa", totalRepos);
}

window.onload = initializeApp();