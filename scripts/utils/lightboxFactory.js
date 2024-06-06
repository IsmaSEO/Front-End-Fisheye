const lightboxFactory = () => {
    let currentIndex = 0;
    let mediaItems = [];
    let photographerFolder = '';
    let lastFocusedElement;

    const initLightbox = (mediaData, photographerFolderName) => {
        mediaItems = mediaData;
        photographerFolder = photographerFolderName;
    };

    const openLightbox = (index) => {
        lastFocusedElement = document.activeElement;
        currentIndex = index;
        updateLightboxContent();
        const lightbox = document.getElementById("lightbox_modal");
        lightbox.style.display = "block";
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = "hidden"; // Empêche le défilement
        document.getElementById('close_lightbox').focus(); // Déplace le focus vers le bouton de fermeture
    };

    const closeLightbox = () => {
        const lightbox = document.getElementById("lightbox_modal");
        lightbox.style.display = "none";
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = "auto"; // Réactive le défilement
        if (lastFocusedElement) {
            lastFocusedElement.focus(); // Remise du focus sur le dernier élément focalisé
        }
    };

    const updateLightboxContent = () => {
        const lightboxMedia = document.getElementById('lightbox_media');
        const lightboxTitle = document.getElementById('lightbox_title');
        lightboxMedia.innerHTML = ''; // Efface les médias actuels

        if (mediaItems.length === 0 || !mediaItems[currentIndex]) {
            console.error("Aucun contenu multimédia disponible");
            return;
        }

        const currentMedia = mediaItems[currentIndex];
        let mediaElement;

        if (currentMedia.image) {
            mediaElement = document.createElement("img");
            mediaElement.src = `../assets/photographers/Photos/${photographerFolder}/${currentMedia.image}`;
            mediaElement.alt = currentMedia.title;
        } else if (currentMedia.video) {
            mediaElement = document.createElement("video");
            mediaElement.src = `../assets/photographers/Photos/${photographerFolder}/${currentMedia.video}`;
            mediaElement.controls = true;
            mediaElement.alt = currentMedia.title;
        } else {
            console.error("Format de média non pris en charge");
            return;
        }

        if (mediaElement) {
            lightboxMedia.appendChild(mediaElement);
            lightboxTitle.textContent = currentMedia.title;
        } else {
            console.error("Élément multimédia non créé");
        }
    };

    const prevMedia = () => {
        currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        updateLightboxContent();
    };

    const nextMedia = () => {
        currentIndex = (currentIndex + 1) % mediaItems.length;
        updateLightboxContent();
    };

    document.addEventListener('keydown', function (event) {
        const lightbox = document.getElementById("lightbox_modal");
        if (lightbox.style.display === "block") {
            if (event.key === "Escape") {
                closeLightbox();
            } else if (event.key === "ArrowLeft") {
                prevMedia();
            } else if (event.key === "ArrowRight") {
                nextMedia();
            } else if (event.key === "Tab") {
                const focusableElements = lightbox.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (event.shiftKey) { // Avec touche clavier Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        event.preventDefault();
                    }
                } else { // Avec touche clavier Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        event.preventDefault();
                    }
                }
            }
        }
    });

    const addMediaEventListeners = () => {
        const prevButton = document.getElementById('prevMedia');
        const nextButton = document.getElementById('nextMedia');
        const closeButton = document.getElementById('close_lightbox');

        if (prevButton && nextButton && closeButton) {
            prevButton.onclick = prevMedia;
            nextButton.onclick = nextMedia;
            closeButton.onclick = closeLightbox;
        } else {
            console.error("Impossible d'initialiser les événements de la Lightbox");
        }
    };

    return {
        initLightbox,
        openLightbox,
        closeLightbox,
        prevMedia,
        nextMedia,
        addMediaEventListeners
    };
};

export default lightboxFactory;
