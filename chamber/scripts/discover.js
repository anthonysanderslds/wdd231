import discoverItems from "../data/discover-items.mjs";

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

function DisplayDiscoverItems(items) {

    const dCards = document.getElementById('discover-cards');

    items.forEach((item) => {

        const card = document.createElement('div');
        const h2 = document.createElement('h2');
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const address = document.createElement('address');
        const description = document.createElement('p');
        const learnMore = document.createElement('button')

        card.classList.add('discover-items');

        h2.textContent = item.name;
        figure.classList.add('discover-figure');
        image.setAttribute('src', item.image);
        image.setAttribute('alt', item.name);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '300');
        image.setAttribute('height', '200')
        address.textContent = item.address;
        description.textContent = item.description;
        learnMore.textContent = "Learn More";

        card.appendChild(h2);
        figure.appendChild(image);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(learnMore);

        dCards.append(card);

    });
}

DisplayDiscoverItems(discoverItems);

function DisplayLastVisit() {

    const today = Date.now();
    const lastVisit = localStorage.getItem('lastVisit');
    const message = document.getElementById('visitMessage');

    if (lastVisit === null) {
        message.innerHTML = "Welcome! Let us know if you have questions!";
    } else {
        const updatedVisit = (today - lastVisit) / (1000 * 60 * 60 * 24);
        if (updatedVisit < 1) {
            message.innerHTML = "Back so soon! Awesome!";
        } else {
            message.innerHTML = `You last visited ${Math.round(updatedVisit)} days ago`;
        }
    }
    localStorage.setItem('lastVisit', today);
}

DisplayLastVisit();