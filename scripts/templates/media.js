const mediaFactory = (media, photographerFolder) => {
    const { title, image, video, likes } = media;

    const getMediaCardDOM = () => {
        const article = document.createElement("article");

        const mediaElement = document.createElement(image ? 'img' : 'video');
        mediaElement.src = image ? `../assets/photographers/Photos/${photographerFolder}/${image}` : `../assets/photographers/Photos/${photographerFolder}/${video}`;
        mediaElement.alt = title;
        if (video) {
            mediaElement.controls = true;
        }

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;
        
        article.appendChild(mediaElement);
        article.appendChild(titleElement);

        return article;
    };

    return { getMediaCardDOM };
};

export default mediaFactory;
