const params = new URLSearchParams(window.location.search);

const display = document.querySelector('#form-data');

for (const [key, value] of params) {
    const p = document.createElement('p');
    p.innerHTML = `<strong>${key}:</strong> ${value}`;
    display.appendChild(p);
}
