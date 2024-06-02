const photographerPriceFactory = (data) => {
    const { id, price } = data;

    const getPhotographerPriceDOM = (idUrl) => {
        if (id === idUrl) { 
            const span = document.createElement('span');
            span.classList.add('photographer_section_price_photographer');
    
            const priceHTML = `
                ${price}€/jour
            `;
            span.innerHTML = priceHTML;
    
            return span;
        } else {
            console.error("prix non trouvé pour l'ID", id);
            return null;
        }
    };

    return { getPhotographerPriceDOM };
};

export default photographerPriceFactory;
