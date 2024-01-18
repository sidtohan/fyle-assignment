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
    // Repo Div
    const repoDisplay = document.querySelector(".user-repos");
    const loader = document.createElement("div");
    loader.classList.add('loading');
    repoDisplay.appendChild(loader);

    // Init
    let data = await getPageData(name, page, limit);
    let repos = data.data;
    let totalPages = Math.ceil(totalRepos / limit);

    // Remove loading
    repoDisplay.classList.remove("loading");
    repoDisplay.removeChild(loader);

    // For per page repositories setting
    const perPageHolder = document.createElement("div");
    perPageHolder.classList.add("per-page-holder");

    const perPage = document.createElement("select");
    perPage.classList.add("per-page");
    perPage.id = "per-page";

    const perPageLabel = document.createElement("label");
    perPageLabel.htmlFor = "per-page";
    perPageLabel.textContent = "Number of repos per page";

    perPageHolder.appendChild(perPageLabel);
    perPageHolder.appendChild(perPage);

    // Update data
    const setNewData = async (newPage) => {
        repoDisplay.innerHTML = ``;
        repoDisplay.appendChild(loader);
        const newData = await getPageData(name, newPage, limit);
        const newRepos = newData.data;
        page = newPage;
        repoDisplay.removeChild(loader);
        repoDisplay.appendChild(perPageHolder);
        populateRepos(repoDisplay, newRepos, totalPages, setNewData);
    }

    // Set new limit
    const modifyLimit = async (newLimit) => {
        limit = newLimit;
        totalPages = Math.ceil(totalRepos / newLimit);
        await setNewData(1);
    }

    // Add option to per page element
    for(let pp = 10; pp <= 100; pp += 10){
        const opt = document.createElement("option");
        opt.classList.add("per-page-option");
        opt.textContent = pp;
        opt.value = pp;
        perPage.appendChild(opt);
    }

    perPage.onchange = (async (e) => {
        e.preventDefault();
        let value = e.target.value;
        await modifyLimit(value);
    })

    // Append all elements
    repoDisplay.appendChild(perPageHolder);
    populateRepos(repoDisplay, repos, totalPages, setNewData);
}

export default userRepos;