const mediaFactory = (data, folder, index, openLightbox) => {
  const { image, video, title, likes } = data;

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

      infoDiv.appendChild(titleElement);

      article.appendChild(infoDiv);

      return article;
  };

  return { getMediaCardDOM };
};

export default mediaFactory;
