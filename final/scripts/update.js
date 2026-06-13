
import { addItem } from "./storage.js";

const form = document.querySelector('#upc-form');
const input = document.querySelector('#upc-input');
const lookupResult = document.querySelector('#lookup-result');
const itemDetails = document.querySelector('.add-item-details');
const itemForm = document.getElementById('add-item-form');
const productName = document.querySelector('#product-name');
const productBrand = document.querySelector('#product-brand');
const productCategory = document.querySelector('#product-category');
const productExpiry = document.querySelector('#product-expiry');
const productQuantity = document.querySelector('#product-quantity');
const modal = document.querySelector('#confirm-modal');
const itemSummary = document.querySelector('#modal-item-summary');
const addItemBtn = document.querySelector('#add-another-item');

let currentProductImage = '';

itemDetails.style.display = 'none';

form.addEventListener('submit', (event) => {
    event.preventDefault();
    let data = input.value.trim();

    if (data === "") {
        lookupResult.innerHTML = "Please enter a UPC code.";
        return;
    }

    fetchProductData(data);
});

async function fetchProductData(value) {
    lookupResult.innerHTML = "Looking up product...";

    try {
        const url = `https://world.openfoodfacts.org/api/v0/product/${value}.json`;

        const response = await fetch(url);

        if (response.ok !== true) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === 0 || data.product === undefined) {
            throw new Error("Product not found");
        }

        const product = { name: data.product.product_name || "Unknown Product", brand: data.product.brands || "Unknown Brand", category: data.product.categories || "Uncategorized", image: data.product.image_url || "" }

        currentProductImage = product.image;

        displayLookupResult(product);
        populateAddForm(product);

        itemDetails.style.display = 'block';

    } catch (error) {
        lookupResult.innerHTML = `<p class="error">Could not find product. Please check the UPC and try again.</p>`;

        itemDetails.style.display = 'none';
    }
}

function displayLookupResult(product) {
    lookupResult.innerHTML = `<h3>Product Found!</h3>
    <p><strong>Name: </strong> ${product.name}</p>
    <p><strong>Brand: </strong> ${product.brand}</p>
    <p><strong>Category: </strong> ${product.category}</p>`;
};

function populateAddForm(product) {
    productName.value = product.name;
    productBrand.value = product.brand;
    productCategory.value = product.category;
};

itemForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newItem = {
        id: Date.now(),
        name: productName.value,
        brand: productBrand.value,
        category: productCategory.value,
        expiry: productExpiry.value,
        quantity: productQuantity.value,
        upc: input.value,
        image: currentProductImage,
        dateAdded: new Date().toISOString().split('T')[0]
    };

    addItem(newItem);

    itemSummary.textContent = `Added ${newItem.quantity} ${newItem.name} which expires ${newItem.expiry}`;

    modal.showModal();
});

addItemBtn.addEventListener('click', () => {
    modal.close();

    form.reset();
    itemForm.reset();

    lookupResult.innerHTML = "";

    itemDetails.style.display = 'none';
    currentProductImage = '';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.close();
    }
});