
// directory.js
const directoryContainer = document.getElementById("directory");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

// Fetch member data
async function getMembers() {
    try {
        const response = await fetch("data/members.json");
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error fetching members:", error);
    }
}

// Convert membership level number to text
function getMembershipLevel(level) {
    switch (level) {
        case 3: return "Gold";
        case 2: return "Silver";
        case 1: return "Member";
        default: return "Member";
    }
}

// Get CSS class for membership badge
function getMembershipClass(level) {
    switch (level) {
        case 3: return "membership-gold";
        case 2: return "membership-silver";
        case 1: return "membership-member";
        default: return "membership-member";
    }
}

// Display member cards
function displayMembers(members) {
    directoryContainer.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement("div");
        let image = document.createElement("img");
        let name = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let badge = document.createElement("span");

        card.classList.add("member-card");

        image.setAttribute("src", member.image);
        image.setAttribute("alt", `${member.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");
        image.setAttribute("height", "200");

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;

        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener noreferrer");
        website.textContent = "Visit Site";

        badge.classList.add("membership-level", getMembershipClass(member.membershipLevel));
        badge.textContent = getMembershipLevel(member.membershipLevel);

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(badge);

        directoryContainer.appendChild(card);
    });
}

// Toggle between grid and list views
gridBtn.addEventListener("click", () => {
    directoryContainer.classList.add("grid-layout");
    directoryContainer.classList.remove("list-layout");
});

listBtn.addEventListener("click", () => {
    directoryContainer.classList.add("list-layout");
    directoryContainer.classList.remove("grid-layout");
});

// Initialize
getMembers();

