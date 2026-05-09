const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');
const title = document.querySelector('#nav-tab');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navLinks.classList.toggle('show');
});

