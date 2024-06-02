function photographerTemplate(photographer) {
  return {
    getUserCardDOM: function () {
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
    }
  };
}
export default photographerTemplate;