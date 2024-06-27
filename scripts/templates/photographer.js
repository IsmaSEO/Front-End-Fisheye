function photographerTemplate(photographer) {
  return {
    getPhotographerCardDOM: function () {
      // Création des éléments HTML pour la carte du photographe
      const { id, name, city, country, tagline, price, portrait } = photographer;

      const article = document.createElement("article");
      article.setAttribute('aria-label', `Profil de ${name}`);
      
      const link = document.createElement('a');
      link.href = `photographer.html?id=${id}`;
      link.setAttribute('aria-label', `En savoir plus sur ${name}`);
      link.addEventListener('focus', () => {
        link.setAttribute('aria-current', 'true');
      });
      link.addEventListener('blur', () => {
        link.removeAttribute('aria-current');
      });
      
      const img = document.createElement("img");
      img.src = `../assets/photographers/Photos/Photographers ID Photos/${portrait}`;
      img.alt = `Portrait de ${name}`;
      img.className = 'photographer_section_img';
      
      const nameElement = document.createElement("h2");
      nameElement.textContent = name;
      nameElement.className = 'photographer_section_name';
      
      const cityCountryElement = document.createElement("p");
      cityCountryElement.className = "photographer_section_city_country";
      cityCountryElement.textContent = `${city}, ${country}`;

      const taglineElement = document.createElement("p");
      taglineElement.className = "photographer_section_tagline";
      taglineElement.textContent = tagline;

      const priceElement = document.createElement("p");
      priceElement.className = "photographer_section_price_index";
      priceElement.textContent = `${price}€/jour`;

      link.appendChild(img);
      // Ajouter les éléments créés à l'article
      article.appendChild(link);
      article.appendChild(nameElement);
      article.appendChild(cityCountryElement);
      article.appendChild(taglineElement);
      article.appendChild(priceElement);

      return article;
    },

    getPhotographerDOM: function() {
      // Création des éléments HTML pour le header du photographe
      const { name, city, country, tagline, price, portrait } = photographer;

      const infoSection = document.createElement("div");
      const photoSection = document.createElement("div");
      const priceSection = document.createElement("div");

      // Remplis la section infos
      const nameElement = document.createElement("h1");
      nameElement.textContent = name;

      const cityCountryElement = document.createElement("p");
      cityCountryElement.className = "photographer_section_city_country";
      cityCountryElement.textContent = `${city}, ${country}`;

      const taglineElement = document.createElement("p");
      taglineElement.className = "photographer_section_tagline";
      taglineElement.textContent = tagline;

      infoSection.appendChild(nameElement);
      infoSection.appendChild(cityCountryElement);
      infoSection.appendChild(taglineElement);

      // Remplis la section photo
      const photoElement = document.createElement("img");
      photoElement.src = `../assets/photographers/Photos/Photographers ID Photos/${portrait}`;
      photoElement.alt = name;
      photoSection.appendChild(photoElement);

      // Remplis la section prix
      const priceElement = document.createElement("p");
      priceElement.className = "photographer_section_price";
      priceElement.textContent = `${price}€/jour`;
      priceSection.appendChild(priceElement);

      return {
        info: infoSection,
        photo: photoSection,
        price: priceSection
      };
    }
  };
}

export default photographerTemplate;
