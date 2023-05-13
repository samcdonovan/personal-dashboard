
/**
 * Retrieves an item with the specified name from the localStorage,
 * parses it into JSON and returns the result.
 * @param itemName The name of the item in localStorage
 */
export function parseLocalStorage(itemName: string) {
    return JSON.parse(localStorage.getItem(itemName) || '{}');
}

/**
 * Retrieves item from localStorage and updates its value
 * 
 * @param itemName The name of the item to be updated
 * @param newValue The new value to update the item with
 * @param field (optional) The field to be updated in the item
 * @param id (optional) The ID of the item to be updated
 */
export function updateLocalStorage(itemName: string,
    newValue: Task | boolean | string, id?: number, field?: string) {

    let itemJson = parseLocalStorage(itemName);

    if (id !== undefined && field !== undefined) {
        itemJson[id][field] = newValue;
    } else if (id !== undefined && field === undefined) {
        itemJson[id] = newValue;
    } else {
        itemJson[Object.keys(itemJson).length] = newValue;
    }

    localStorage.setItem(itemName, JSON.stringify(itemJson));

    return itemJson;
}
