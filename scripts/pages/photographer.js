//Code JS lié à la page photographer.html

const getPhotographerById = async (id) => {
    try {
        const response = await fetch(`/data/photographers.json`);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const { photographers } = await response.json();
        return photographers.find((photographer) => photographer.id == id);
    } catch (error) {
        console.error("Erreur lors de la récupération du photographe :", error);
        return null;
    }
};

const displayPhotographerData = (photographer) => {
    if (!photographer) {
        console.error("Photographe non trouvé");
        return;
    }
}

const init = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (!id) {
        console.error("ID de photographe manquant dans l'URL");
        return;
    }

    const photographer = await getPhotographerById(id);
    displayPhotographerData(photographer);
};

init();