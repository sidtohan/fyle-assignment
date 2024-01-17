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

const pageNavigation = (totalPages) => {
    let currentButton = null;
    const navigationDiv = document.createElement("nav");
    navigationDiv.classList.add("repo-navigator");

    const leftButton = document.createElement("button");
    const leftArrowIcon = document.createElement("img");
    leftArrowIcon.src = "src/assets/leftArrowIcon.png";
    leftArrowIcon.classList.add("icon");
    leftButton.classList.add("repo-navigation-button");
    leftButton.classList.add("left-nav");
    leftButton.appendChild(leftArrowIcon);

    const rightButton = document.createElement("button");
    const rightArrowIcon = document.createElement("img");
    rightArrowIcon.src = "src/assets/rightArrowIcon.png";
    rightArrowIcon.classList.add("icon");
    rightButton.classList.add("repo-navigation-button");
    rightButton.appendChild(rightArrowIcon);
    rightButton.classList.add("right-nav");
    rightButton.classList.add("repo-navigation-button");

    navigationDiv.appendChild(leftButton);

    for(let pg = 1; pg <= totalPages; ++pg){
        const pageButton = document.createElement("button");
        pageButton.classList.add("repo-navigation-button");
        if(pg == page){
            pageButton.classList.add("active");
            currentButton = pageButton;
        }
        pageButton.textContent = pg;
        pageButton.onclick = (e) => {
            e.preventDefault();
            if(currentButton == pageButton)
                return;
            currentButton.classList.remove("active");
            currentButton = pageButton;
            currentButton.classList.add("active");
            page = pg;
        }
        navigationDiv.appendChild(pageButton);
    }
    navigationDiv.appendChild(rightButton);

    return navigationDiv;
}

const userRepos = async (name, totalRepos) => {
    const data = await getPageData(name, page, limit);
    const repos = data.data;
    const totalPages = Math.ceil(totalRepos / limit);
    const repoDisplay = document.createElement("div");
    repoDisplay.classList.add("user-repos");

    repos.forEach(repo => {
        repoDisplay.appendChild(repoCard(repo));
    })

    repoDisplay.appendChild(pageNavigation(totalPages));
    return repoDisplay;
}

export default userRepos;