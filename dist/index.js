import userInfo from "../src/scripts/userInfo";

// Main Component
const initializeApp = () => {
    const root = document.querySelector("#root");
    root.appendChild(userInfo);
}

window.onload = initializeApp();