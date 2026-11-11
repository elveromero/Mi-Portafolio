document.addEventListener('DOMContentLoaded', () => {
  // 1. Lógica de Filtro de Proyectos
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Quitar la clase active del botón anterior
      document.querySelector('.filter-btn.active').classList.remove('active');
      // Agregar la clase active al botón presionado
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Mostrar u ocultar tarjetas según la categoría
      projectCards.forEach(card => {
        const cardTechs = card.getAttribute('data-tech');

        if (filterValue === 'all' || cardTechs.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 2. Lógica de Modo Oscuro
  const themeToggleBtn = document.getElementById('theme-toggle');
  const userTheme = localStorage.getItem('theme');

  // Comprobar si el usuario ya tenía una preferencia guardada
  if (userTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
      themeToggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  });
});

// 3. Lógica de Validación del Formulario de Contacto
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('form-success');

    const showError = (input, message) => {
      input.classList.add('error');
      const errorSpan = document.getElementById(`${input.id}-error`);
      errorSpan.textContent = message;
    };

    const clearError = (input) => {
      input.classList.remove('error');
      const errorSpan = document.getElementById(`${input.id}-error`);
      errorSpan.textContent = '';
    };

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validar Nombre
      if (nameInput.value.trim() === '') {
        showError(nameInput, 'Por favor, ingresa tu nombre.');
        isValid = false;
      } else {
        clearError(nameInput);
      }

      // Validar Correo
      if (emailInput.value.trim() === '') {
        showError(emailInput, 'Por favor, ingresa tu correo electrónico.');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Ingresa un correo electrónico válido.');
        isValid = false;
      } else {
        clearError(emailInput);
      }

      // Validar Mensaje
      if (messageInput.value.trim() === '') {
        showError(messageInput, 'El mensaje no puede estar vacío.');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showError(messageInput, 'El mensaje debe tener al menos 10 caracteres.');
        isValid = false;
      } else {
        clearError(messageInput);
      }

      // Si todo es válido
      if (isValid) {
        successMessage.classList.remove('hidden');
        contactForm.reset();
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }
