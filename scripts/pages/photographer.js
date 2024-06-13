//Code JS lié à la page photographer.html
import photographerTemplate from "../templates/photographer.js";
import { mediaFactory, initializeTotalLikes } from "../templates/media.js";
import photographerPriceFactory from "../templates/photographerPriceFactory.js";
import lightboxFactory from '../utils/lightboxFactory.js';

const photographerFolderMap = {
  930: "Ellie Rose",
  195: "Marcel",
  243: "Mimi",
  527: "Nabeel",
  925: "Rhode",
  82: "Tracy",
};

const getPhotographerById = async (id) => {
  try {
    const response = await fetch("/data/photographers.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const { photographers } = await response.json();
    console.log("Photographes récupérés:", photographers);
    return photographers.find((photographer) => photographer.id == id);
  } catch (error) {
    console.error("Erreur lors de la récupération du photographe :", error);
    return null;
  }
};

const getMediaByPhotographerId = async (id) => {
  try {
    const response = await fetch("/data/photographers.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const { media } = await response.json();
    console.log("Médias récupérés:", media);
    return media.filter((item) => item.photographerId == id);
  } catch (error) {
    console.error("Erreur lors de la récupération des médias :", error);
    return [];
  }
};

const displayPhotographerData = (photographer) => {
  if (!photographer) {
    console.error("Photographe non trouvé");
    return;
  }

  const infoSection = document.querySelector(".photograph-header .info");
  const photoSection = document.querySelector(".photograph-header .photo");

  // Remplis la section info
  const nameElement = document.createElement("h1");
  nameElement.textContent = photographer.name;

  const cityCountryElement = document.createElement("p");
  cityCountryElement.className = "photographer_section_city_country";
  cityCountryElement.textContent = `${photographer.city}, ${photographer.country}`;

  const taglineElement = document.createElement("p");
  taglineElement.className = "photographer_section_tagline";
  taglineElement.textContent = photographer.tagline;

  infoSection.appendChild(nameElement);
  infoSection.appendChild(cityCountryElement);
  infoSection.appendChild(taglineElement);

  // Remplis la section photo
  const photoElement = document.createElement("img");
  photoElement.src = `../assets/photographers/Photos/Photographers ID Photos/${photographer.portrait}`;
  photoElement.alt = photographer.name;

  photoSection.appendChild(photoElement);

  console.log("Données du photographe affichées:", photographer);
};

// Remplis la section prix du photographe
const displayPricePhotographer = (photographer, idUrl) => {
  const priceSection = document.querySelector(".photographer_section_price");
  const photographerFactory = photographerPriceFactory(photographer);
  const priceElement = photographerFactory.getPhotographerPriceDOM(parseInt(idUrl));
  if (priceElement) {
    priceSection.appendChild(priceElement);
  }
};

const displayMediaData = (media, photographerId) => {
  const mediaSection = document.querySelector(".media_section");

  const photographerFolder = photographerFolderMap[photographerId];
  if (!photographerFolder) {
    console.error(
      "Dossier de photographe non trouvé pour l'ID :",
      photographerId
    );
    return;
  }


  const lightbox = lightboxFactory();
  lightbox.initLightbox(media, photographerFolder);
  lightbox.addMediaEventListeners();

  media.forEach((item, index) => {
    const mediaModel = mediaFactory(item, photographerFolder, index, lightbox.openLightbox);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  console.log("Médias affichés:", media);
  initializeTotalLikes(media);
};

const init = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idUrl = urlParams.get("id");

  if (!idUrl) {
    console.error("ID du photographe manquant dans l'URL");
    return;
  }

  const photographer = await getPhotographerById(idUrl);
  displayPhotographerData(photographer);

  const media = await getMediaByPhotographerId(idUrl);
  displayMediaData(media, idUrl);

  displayPricePhotographer(photographer, idUrl);
};

init();
