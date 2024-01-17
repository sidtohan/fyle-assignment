const repoCard = (repo) => {
    const repoCardDiv = document.createElement("div");

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

const userRepos = (repos) => {
    const repoDisplay = document.createElement("div");
    repoDisplay.classList.add("repo-display");

    repos.forEach(repo => {
        repoDisplay.appendChild(repoCard(repo));
    })

    return repoDisplay;
}

export default userRepos;