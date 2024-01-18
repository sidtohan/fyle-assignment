// Element for Image
const imageElement = (image, url) => {
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("user-image-div");

    const imgBorder = document.createElement("div");
    imgBorder.classList.add("user-image-border");

    const newImg = document.createElement("img");
    newImg.src = image;
    newImg.classList.add("user-image");
    imgBorder.appendChild(newImg);

    // Link
    const github = document.createElement("div");
    github.classList.add("user-github-url");
    
    const linkImg = document.createElement("img");
    linkImg.src = "src/assets/linkIcon.png";
    linkImg.classList.add("icon");

    const linkText = document.createElement("span");
    linkText.innerHTML = `<a href="${url}"}>${url}</a>`;
    
    github.appendChild(linkImg);
    github.appendChild(linkText);

    // Main
    imgDiv.appendChild(imgBorder);
    imgDiv.appendChild(github);
    return imgDiv;
}

// Element for User Data
const userData = (data) => {
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("user-data");

    // Name
    const name = document.createElement("div");
    name.classList.add("user-name");
    name.textContent = data.name;

    // Bio
    const bio = document.createElement("div");
    bio.classList.add("user-bio");
    bio.textContent = data.bio;

    // Location
    const location = document.createElement("div");
    location.classList.add("user-location");
    
    const locImg = document.createElement("img");
    locImg.src = "src/assets/locationIcon.png";
    locImg.classList.add("icon");

    const locTxt = document.createElement("span");
    locTxt.textContent = data.location;
    
    location.appendChild(locImg);
    location.appendChild(locTxt);

    // Twitter URL
    const twitterDiv = document.createElement("div");
    twitterDiv.innerHTML = `Twitter: <a href="https://twitter.com/${data.twitter_username}"}>https://twitter.com/${data.twitter_username}</a>`
    twitterDiv.classList.add("user-twitter");

    // Main
    dataDiv.appendChild(name);
    dataDiv.appendChild(bio);
    dataDiv.appendChild(location);
    dataDiv.appendChild(twitterDiv);

    return dataDiv;
}
const userInfo = ({data}) => {
    const userInfoDiv = document.querySelector(".user-info");
    userInfoDiv.appendChild(imageElement(data.avatar_url, data.html_url));
    userInfoDiv.appendChild(userData(data));
}

export default userInfo;