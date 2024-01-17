// JS Imports
import fetchData from "./src/api/apiMain.js";
import userInfo from "./src/scripts/userInfo.js";

// CSS
import "/src/styles/userInfo.css";
import "/src/styles/main.css";

// Main Component
const initializeApp = async () => {
    const root = document.querySelector("#root");
    const userData = await fetchData("johnpapa");

    root.appendChild(userInfo(userData));
}

window.onload = initializeApp();