
import { getInventory, deleteItem, getFamilyConfig, getDurationGoal } from './storage.js';

const totalOfItems = document.querySelector('#total-items');
const daysSupply = document.querySelector('#days-supply');
const expirySoon = document.querySelector('#expiring-soon');
const filterCategory = document.querySelector('#filter-category');
const sortBy = document.querySelector('#sort-by');
const searchInput = document.querySelector('#search-input');
const itemCount = document.querySelector('#item-count');
const inventoryContainer = document.querySelector('#inventory-container');
const modalItemDetail = document.querySelector('#modal-item-detail');
const detailTitle = document.querySelector('#detail-title');
const detailContent = document.querySelector('#detail-content');
const deleteItemBtn = document.querySelector('#delete-item-btn');
const closeDetailBtn = document.querySelector('#close-detail-btn');

let allItems = getInventory();
let filteredItems = [...allItems];
let currentItemId = null;

updateSummaryStats();
renderInventory(filteredItems);

function updateSummaryStats() {
    const totalItems = allItems.reduce((sum, item) => {
        return sum + Number(item.quantity);
    }, 0);

    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const expiringSoon = allItems.filter((item) => {
        const expiryDate = new Date(item.expiry);
        return expiryDate >= today && expiryDate <= thirtyDaysFromNow;
    });

    const config = getFamilyConfig();
    const totalPeople = config.adults + config.children;
    let daysOfSupply = 0;

    if (totalPeople > 0) {
        daysOfSupply = Math.round(totalItems / totalPeople);
    }

    totalOfItems.textContent = totalItems;
    expirySoon.textContent = expiringSoon.length;
    daysSupply.textContent = daysOfSupply;
}

function renderInventory(items) {
    if (items.length === 0) {
        inventoryContainer.innerHTML = `<p>Your inventory is empty.</p>
        <p>Start adding items to track your food storage.</p>
        <a href="inventory-update.html">Add Your First Item →</a>`;

        itemCount.textContent = "Showing 0 items";

        return;
    }

    const cardsHTML = items.map((item) => {
        return `<article class="inventory-card">
                   <img src="${item.image}" alt="${item.name}" width="100" height="100" loading="lazy">
                   <h3>${item.name}</h3>
                   <p><strong>Expires:</strong> ${item.expiry}</p>
                   <button class="detail-btn" data-id="${item.id}">View Details</button>
               </article>`;
    });

    inventoryContainer.innerHTML = cardsHTML.join('');

    itemCount.textContent = `Showing ${items.length} of ${allItems.length} items`;

    const detailButtons = inventoryContainer.querySelectorAll('.detail-btn');

    detailButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const itemId = Number(button.dataset.id);
            showItemDetail(itemId);
        });
    });
}

function showItemDetail(itemId) {
    const item = allItems.find((item) => item.id === itemId);

    currentItemId = itemId;

    const today = new Date();
    const expiryDate = new Date(item.expiry);
    const timeDiff = expiryDate - today;
    const daysUntilExpiry = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    detailTitle.textContent = item.name;
    detailContent.innerHTML = `
        <img src="${item.image}" alt="${item.name}" width="200" loading="lazy">
        <p><strong>UPC:</strong> <span class="upc">${item.upc}</span></p>
        <p><strong>Brand:</strong> ${item.brand}</p>
        <p><strong>Category:</strong> ${item.category}</p>
        <p><strong>Expiration:</strong> ${item.expiry}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Days Until Expiry:</strong> ${daysUntilExpiry}</p>
        <p><strong>Date Added:</strong> ${item.dateAdded}</p>`;

    modalItemDetail.showModal();
}

filterCategory.addEventListener('change', () => {
    const selectedValue = filterCategory.value;

    if (selectedValue === "all-categories") {
        filteredItems = [...allItems];
    } else {
        filteredItems = allItems.filter((item) => {
            return item.category.toLowerCase().includes(selectedValue);
        });
    }

    renderInventory(filteredItems);
});

sortBy.addEventListener('change', () => {
    const selectedValue = sortBy.value;
    const sorted = [...filteredItems];

    if (selectedValue === 'name-az') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedValue === 'name-za') {
        sorted.sort((a, b) => b.name.localeCompare(a.name));
    } else if (selectedValue === 'expire-soon') {
        sorted.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
    } else if (selectedValue === 'expire-last') {
        sorted.sort((a, b) => new Date(b.expiry) - new Date(a.expiry));
    } else if (selectedValue === 'quantity') {
        sorted.sort((a, b) => Number(b.quantity) - Number(a.quantity));
    }

    renderInventory(sorted);
});

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (searchTerm === "") {
        renderInventory(filteredItems);
        return;
    }

    const results = filteredItems.filter((item) => {
        return item.name.toLowerCase().includes(searchTerm);
    });

    renderInventory(results);
});

deleteItemBtn.addEventListener('click', () => {
    if (currentItemId !== null) {
        deleteItem(currentItemId);

        allItems = getInventory();
        filteredItems = [...allItems];

        modalItemDetail.close();

        updateSummaryStats();
        renderInventory(filteredItems);

        currentItemId = null;
    }
});

closeDetailBtn.addEventListener('click', () => {
    modalItemDetail.close();
});

modalItemDetail.addEventListener('click', (event) => {
    if (event.target === modalItemDetail) {
        modalItemDetail.close();
    }
});