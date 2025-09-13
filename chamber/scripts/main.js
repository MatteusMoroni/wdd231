// Script para alternar a visibilidade do menu mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
mobileMenu.classList.toggle('show');
});

// --- Footer Dates ---
const currentYearSpan = document.getElementById('current-year');
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById('last-modified');
lastModifiedSpan.textContent = document.lastModified;