const today = new Date();
const currentYearElement = document.getElementById("currentYear");
currentYearElement.textContent = today.getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modified: ${document.lastModified}`;