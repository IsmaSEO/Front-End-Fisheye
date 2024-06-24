let lastFocusedElement;

function displayModal() {
  const modal = document.getElementById("contact_modal");
  lastFocusedElement = document.activeElement;
  modal.style.display = "block";
  modal.setAttribute('aria-hidden', 'false');
  const firstInput = modal.querySelector('input, textarea');
  if (firstInput) {
    firstInput.focus();
  }
  getNameModaleContact();
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute('aria-hidden', 'true');
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function getNameModaleContact() {
  const nameElement = document.querySelector('.photograph-header .info h1');
  if (nameElement) {
    const name = nameElement.textContent;
    const namePhotographerElement = document.querySelector('#contact_modal .modal_header h2');
    if (namePhotographerElement) {
      namePhotographerElement.innerHTML = `Contactez-moi<br>${name}`;
    }
    console.log('name', name);
  } else {
    console.error('Nom du photographe non trouvé');
  }
}

const initModal = () => {
  const contactButton = document.getElementById("contactButton");
  const closeModalButton = document.getElementById("close_modal");

  contactButton.addEventListener("click", displayModal);
  closeModalButton.addEventListener("click", closeModal);

  const form = document.getElementById("contact_form");
  form.addEventListener("submit", handleFormSubmit);
};

function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;

  // Vérifie la validité du formulaire avant de fermer la modale
  if (form.checkValidity()) {
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log('Form data:', data);
    closeModal();
  } else {
    form.reportValidity(); 
    // Affiche les erreurs de validité
  }
}

// Ferme la modale en cliquant à l'extérieur
window.onclick = function(event) {
  const modal = document.getElementById("contact_modal");
  if (event.target === modal) {
    closeModal();
  }
};

// Ferme la modale en appuyant sur la touche Échap
document.addEventListener('keydown', function(event) {
  const modal = document.getElementById("contact_modal");
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

// Ferme la modale en appuyant sur la touche Entrée
const closeModalBtn = document.getElementById('close_modal');
if (closeModalBtn) {
  closeModalBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      closeModal();
    }
  });
}

// Gére la navigation au clavier dans la modale
document.addEventListener('keydown', function(event) {
  const modal = document.getElementById("contact_modal");
  if (modal.style.display === "block") {
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) { // Shift + Tab
        if (document.activeElement === firstElement) {
          lastElement.focus();
          event.preventDefault();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          firstElement.focus();
          event.preventDefault();
        }
      }
    }
  }
});

// Attache les écouteurs d'événements pour ouvrir et fermer la modale
initModal();
