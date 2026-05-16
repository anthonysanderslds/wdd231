const today = new Date();
const currentYearElement = document.getElementById("currentYear");
currentYearElement.textContent = today.getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;

const navButton = document.querySelector('#ham-btn');
const navLinks = document.querySelector('#nav-bar');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('open');
    navLinks.classList.toggle('open');
});