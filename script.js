document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // 1. Quitar la clase active del botón anterior
      document.querySelector('.filter-btn.active').classList.remove('active');
      // 2. Agregar la clase active al botón presionado
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // 3. Mostrar u ocultar tarjetas según la categoría
      projectCards.forEach(card => {
        const cardTechs = card.getAttribute('data-tech');

        if (filterValue === 'all' || cardTechs.includes(filterValue)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
          // Lógica de Modo Oscuro
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
  });
});
