import { getFamilyConfig, saveFamilyConfig, getDurationGoal, saveDurationGoal, getInventory } from "./storage.js";

const familyForm = document.querySelector('#family-form');
const adultInput = document.querySelector('#adults');
const childrenInput = document.querySelector('#children');
const formOutput = document.querySelector('#form-output');
const durationForm = document.querySelector('#duration-form');
const inventoryProgress = document.querySelector('#inventory-progress');

function displayFamilyConfig() {
    const config = getFamilyConfig();
    if (config.adults === 0 && config.children === 0) {
        formOutput.textContent = '';
    } else {
        formOutput.textContent = `Household: ${config.adults} adults, ${config.children} children`
    }
};

familyForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const adults = Number(adultInput.value);
    const children = Number(childrenInput.value);
    const config = { 'adults': adults, 'children': children }

    saveFamilyConfig(config);
    displayFamilyConfig();
    displayProgress();
});

durationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const selected = durationForm.querySelector('input[name="duration"]:checked');

    if (selected !== null) {
        const months = Number(selected.value);
        saveDurationGoal(months);
        displayProgress();
    } else {
        formOutput.textContent = "Please select a duration goal."
    }
});

function displayProgress() {
    const inventory = getInventory();
    const config = getFamilyConfig();
    const goal = getDurationGoal();

    if (inventory.length === 0) {
        inventoryProgress.innerHTML = `<p>You haven't added any items yet. Once you configure your family and start adding items, your progress toward your goal will appear here.</p>
        <a href="inventory-update.html">Start Adding Items</a>`;
        return;
    }

    const totalItems = inventory.reduce((sum, item) => {
        return sum + Number(item.quantity);
    }, 0);

    const totalPeople = config.adults + config.children;
    inventoryProgress.innerHTML = `<p>You have ${totalItems} items in storage.</p>
    <p>Goal: ${goal} month(s) for ${totalPeople} people.</p>
    <a href="inventory-tracker.html">View Full Inventory</a>`;
};

displayFamilyConfig();
displayProgress();