let totalLikes = 0;

// Fonction pour mettre à jour les likes totaux
function updateTotalLikes(change) {
  totalLikes += change;
  document.getElementById('total_likes').textContent = totalLikes;
}

// Fonction pour Initialiser les likes totaux à partir des médias existants
function initializeTotalLikes(media) {
  totalLikes = media.reduce((sum, item) => sum + item.likes, 0);
  document.getElementById('total_likes').textContent = totalLikes;
}

const mediaFactory = (data, folder, index, openLightbox) => {
  const { image, video, title, likes } = data;
  let userLiked = false;

  const getMediaCardDOM = () => {
    const article = document.createElement("article");

    const mediaElement = document.createElement(image ? "img" : "video");
    mediaElement.src = `../assets/photographers/Photos/${folder}/${image || video}`;
    mediaElement.alt = title;
    mediaElement.tabIndex = 0;
    mediaElement.setAttribute('aria-label', title);
    mediaElement.onclick = () => openLightbox(index);

    article.appendChild(mediaElement);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("media-info");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("media-title");
    titleElement.textContent = title;

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("media-likes-container");

    const likesElement = document.createElement("p");
    likesElement.classList.add("media-likes");
    likesElement.textContent = likes;

    const likeButton = document.createElement("button");
    likeButton.classList.add("like-button");
    likeButton.setAttribute('aria-label', `like ${title}`);
    likeButton.innerHTML = `<img src="../assets/icons/heart_media.svg" alt="like">`;
    likeButton.addEventListener('click', () => {
      if (!userLiked) {
        userLiked = true;
        likesElement.textContent = parseInt(likesElement.textContent) + 1;
        updateTotalLikes(1);
      }
    });

    likesContainer.appendChild(likesElement);
    likesContainer.appendChild(likeButton);

    infoDiv.appendChild(titleElement);
    infoDiv.appendChild(likesContainer);

    article.appendChild(infoDiv);

    return article;
  };

  return { getMediaCardDOM };
};

export { mediaFactory, initializeTotalLikes };
