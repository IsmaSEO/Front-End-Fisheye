import photographerTemplate from '../templates/photographer.js';

async function getPhotographers() {
  try {
    // Utilisation de fetch pour récupérer les données depuis le fichier JSON
    const response = await fetch("data/photographers.json");

    // Vérification si la requête a réussi
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Conversion de la réponse en JSON
    const data = await response.json();

    // Affichage des données dans la console pour vérification
    console.log(data);

    // Retourne uniquement le tableau des photographes
    return data.photographers;
  } catch (error) {
    console.error("Erreur lors de la récupération des photographes :", error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer); // Utilisation du modèle de photographe
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupération des datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}

init();
