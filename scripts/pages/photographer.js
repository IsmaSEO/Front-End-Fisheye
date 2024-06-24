//Code JS lié à la page photographer.html
import { mediaFactory, initializeTotalLikes } from "../templates/media.js";
import photographerPriceFactory from "../templates/photographerPriceFactory.js";
import lightboxFactory from "../utils/lightboxFactory.js";

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

  infoSection.append(nameElement, cityCountryElement, taglineElement);

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
  const priceElement = photographerFactory.getPhotographerPriceDOM(
    parseInt(idUrl, 10)
  );
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
    const mediaModel = mediaFactory(
      item,
      photographerFolder,
      index,
      lightbox.openLightbox
    );
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    mediaSection.appendChild(mediaCardDOM);
  });

  console.log("Médias affichés:", media);
  initializeTotalLikes(media);
};

// Fonction de tri des médias
const sortMedia = (criteria) => {
  const mediaSection = document.querySelector(".media_section");
  if (!mediaSection) {
    console.error("Section media pas trouvé dans le DOM");
    return;
  }

  const mediaCards = Array.from(mediaSection.children);

  let sortedMediaCards;
  switch (criteria) {
    case "date":
      sortedMediaCards = mediaCards.sort(
        (a, b) => new Date(b.dataset.date) - new Date(a.dataset.date)
      );
      break;
    case "title":
      sortedMediaCards = mediaCards.sort((a, b) =>
        (a.dataset.title || "").localeCompare(b.dataset.title || "")
      );
      break;
    case "popularity":
    default:
      sortedMediaCards = mediaCards.sort(
        (a, b) => parseInt(b.dataset.likes, 10) - parseInt(a.dataset.likes, 10)
      );
      break;
  }

  // Mise à jour de l'ordre des médias dans le DOM
  mediaSection.innerHTML = "";
  sortedMediaCards.forEach((card) => mediaSection.appendChild(card));

  console.log("Média triés par critères:", criteria);
};

// Initialisation et gestion du focus et de l'accessibilité
// Assure l'accessibilité de la liste de tri
document.addEventListener("DOMContentLoaded", () => {
  const toggleArrow = document.querySelector(".listbox-toggle");
  const listBoxItems = document.querySelector(".listbox-items");
  const options = document.querySelectorAll(".listbox-option input");

  if (toggleArrow && listBoxItems) {
    toggleArrow.addEventListener("click", () => {
      const isExpanded = listBoxItems.classList.toggle("active");
      toggleArrow.classList.toggle("open", isExpanded);
      toggleArrow.setAttribute("aria-expanded", isExpanded);
      console.log(
        "Flèche cliquée pour voir les éléments de la zone de liste:",
        listBoxItems.classList
      );
    });

    toggleArrow.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const isExpanded = listBoxItems.classList.toggle("active");
        toggleArrow.classList.toggle("open", isExpanded);
        toggleArrow.setAttribute("aria-expanded", isExpanded);
      }
    });
  } else {
    console.error(
      "flèche ou éléments de zone de liste introuvable dans le DOM"
    );
  }

  if (options) {
    options.forEach((option) => {
      option.addEventListener("change", () => {
        listBoxItems.classList.remove("active");
        toggleArrow.classList.remove("open");
        toggleArrow.setAttribute("aria-expanded", "false");
        console.log("Option modifiée, valeur sélectionnée:", option.value);
        sortMedia(option.value);
      });

      option.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
          const nextOption =
            option.parentElement.nextElementSibling?.querySelector("input");
          if (nextOption) nextOption.focus();
        } else if (event.key === "ArrowUp") {
          const prevOption =
            option.parentElement.previousElementSibling?.querySelector("input");
          if (prevOption) prevOption.focus();
        } else if (event.key === "Escape") {
          listBoxItems.classList.remove("active");
          toggleArrow.classList.remove("open");
          toggleArrow.setAttribute("aria-expanded", "false");
        }
      });
    });
  } else {
    console.error("Options pas trouvé dans le DOM");
  }

  // Tri initial par popularité
  sortMedia("popularity");
});

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
