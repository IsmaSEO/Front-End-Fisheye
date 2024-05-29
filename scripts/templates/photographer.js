function photographerTemplate(photographer) {
  return {
    getUserCardDOM: function () {
      // Création des éléments HTML pour la carte du photographe
      const { name, city, country, tagline, price, portrait } = photographer;

      const article = document.createElement("article");
      article.setAttribute('aria-label', `Profile de ${name}`);

      const img = document.createElement("img");
      img.src = `assets/photographers/Photos/Photographers ID Photos/${portrait}`;
      img.alt = `Portrait de ${name}`;

      const nameElement = document.createElement("h2");
      nameElement.textContent = name;

      const cityCountryElement = document.createElement("p");
      cityCountryElement.className = "photographer_section_city_country";
      cityCountryElement.textContent = `${city}, ${country}`;

      const taglineElement = document.createElement("p");
      taglineElement.className = "photographer_section_tagline";
      taglineElement.textContent = tagline;

      const priceElement = document.createElement("p");
      priceElement.className = "photographer_section_price";
      priceElement.textContent = `${price}€/jour`;

      // Ajouter les éléments créés à l'article
      article.appendChild(img);
      article.appendChild(nameElement);
      article.appendChild(cityCountryElement);
      article.appendChild(taglineElement);
      article.appendChild(priceElement);

      return article;
    },
  };
}

export default photographerTemplate;
