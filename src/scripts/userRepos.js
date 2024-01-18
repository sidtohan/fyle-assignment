// Pagination related
let page = 1;
let limit = 10;

// API Calls
import getPageData from "../api/pagination";

const repoCard = (repo) => {
    const repoCardDiv = document.createElement("div");
    repoCardDiv.classList.add("repo-card");

    const repoHeading = document.createElement("h3");
    repoHeading.classList.add("repo-heading")
    repoHeading.textContent = repo.name;

    const repoDesc = document.createElement("p");
    repoDesc.classList.add("repo-description");
    repoDesc.textContent = repo.description;
    
    const repoTopicHolder = document.createElement("div");
    repoTopicHolder.classList.add("repo-topic-holder");
    repo.topics.forEach(topic => {
        const topicDiv = document.createElement("div");
        topicDiv.classList.add("repo-topic");
        topicDiv.textContent = topic;
        repoTopicHolder.appendChild(topicDiv);
    });

    repoCardDiv.appendChild(repoHeading);
    repoCardDiv.appendChild(repoDesc);
    repoCardDiv.appendChild(repoTopicHolder);

    return repoCardDiv;
}

const pageNavigation = (totalPages, setNewData) => {
    let currentButton = null;
    const navigationDiv = document.createElement("nav");
    navigationDiv.classList.add("repo-navigator");

    const leftButton = document.createElement("button");
    const leftArrowIcon = document.createElement("img");
    leftArrowIcon.src = "src/assets/leftArrowIcon.png";
    leftArrowIcon.classList.add("icon");
    leftButton.classList.add("repo-navigation-button");
    leftButton.classList.add("left-nav");
    leftButton.onclick = async (e) => {
        e.preventDefault();
        if(currentButton === leftButton)
            return;
        await setNewData(1);
    }
    leftButton.appendChild(leftArrowIcon);

    const rightButton = document.createElement("button");
    const rightArrowIcon = document.createElement("img");
    rightArrowIcon.src = "src/assets/rightArrowIcon.png";
    rightArrowIcon.classList.add("icon");
    rightButton.classList.add("repo-navigation-button");
    rightButton.appendChild(rightArrowIcon);
    rightButton.classList.add("right-nav");
    rightButton.onclick = async (e) => {
        e.preventDefault();
        if(currentButton === leftButton)
            return;
        await setNewData(totalPages);
    }
    rightButton.classList.add("repo-navigation-button");

    navigationDiv.appendChild(leftButton);

    let startingPage = Math.max(1, page - 4);
    let endingPage = Math.min(totalPages, page + 8 - (page - startingPage + 1));
    if(endingPage === totalPages){
        // decrease the starting amount some
        startingPage = Math.max(1, page - 7 + totalPages - page);
    }
    for(let pg = startingPage; pg <= endingPage; ++pg){
        const pageButton = document.createElement("button");
        pageButton.classList.add("repo-navigation-button");
        if(pg == page){
            pageButton.classList.add("active");
            currentButton = pageButton;
        }
        pageButton.textContent = pg;
        pageButton.onclick = async (e) => {
            e.preventDefault();
            if(currentButton == pageButton)
                return;
            await setNewData(pg);
        }
        navigationDiv.appendChild(pageButton);
    }
    navigationDiv.appendChild(rightButton);

    return navigationDiv;
}

const populateRepos = (repoDisplay, repos, totalPages, setNewData) => {
    repos.forEach(repo => {
        repoDisplay.appendChild(repoCard(repo));
    })

    repoDisplay.appendChild(pageNavigation(totalPages, setNewData));
}
const userRepos = async (name, totalRepos) => {
    // Init
    let data = await getPageData(name, page, limit);
    let repos = data.data;
    let totalPages = Math.ceil(totalRepos / limit);

    // Repo Div
    const repoDisplay = document.createElement("div");
    repoDisplay.classList.add("user-repos");

    // Update data
    const setNewData = async (newPage) => {
        const newData = await getPageData(name, newPage, limit);
        const newRepos = newData.data;
        repoDisplay.innerHTML = ``;
        page = newPage;
        populateRepos(repoDisplay, newRepos, totalPages, setNewData);
    }

    populateRepos(repoDisplay, repos, totalPages, setNewData);
    return repoDisplay;
}

export default userRepos;