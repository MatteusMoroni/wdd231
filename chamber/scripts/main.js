
document.addEventListener('DOMContentLoaded', function () {
   
    const menuBtn = document.getElementById('menu-btn');
  
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('show');
    });

  
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('show');
        });
    });
})
// --- Footer Dates ---
const currentYearSpan = document.getElementById('current-year');
currentYearSpan.textContent = new Date().getFullYear();

const lastModifiedSpan = document.getElementById('last-modified');
lastModifiedSpan.textContent = document.lastModified;