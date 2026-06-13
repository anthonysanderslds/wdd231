export function getInventory() {
    const data = localStorage.getItem('inventory');
    if (data === null) {
        return [];
    } else {
        return JSON.parse(data);
    }
}

export function saveInventory(inventoryArray) {
    const data = JSON.stringify(inventoryArray);
    localStorage.setItem('inventory', data);
}

export function addItem(newItem) {
    const data = getInventory();
    data.push(newItem);
    saveInventory(data);
}

export function deleteItem(itemId) {
    const data = getInventory();
    const filtered = data.filter(item => item.id !== itemId);
    saveInventory(filtered);
}

export function getFamilyConfig() {
    const data = localStorage.getItem('familyConfig');
    if (data === null) {
        return { 'adults': 0, 'children': 0 };
    } else {
        return JSON.parse(data);
    }
}
export function saveFamilyConfig(config) {
    const data = JSON.stringify(config);
    localStorage.setItem('familyConfig', data);
}

export function getDurationGoal() {
    const data = localStorage.getItem('durationGoal');
    if (data === null) {
        return 1;
    } else {
        return JSON.parse(data);
    }
}

export function saveDurationGoal(months) {
    localStorage.setItem('durationGoal', months);
}