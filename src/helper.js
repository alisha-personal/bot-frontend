/**
 * Writes a JavaScript object to a file in the browser and triggers a download.
 * @param {Object} obj - The JavaScript object to save.
 * @param {string} fileName - The name of the file to save.
 */
export function writeObjectToFileBrowser(obj, fileName) {
    // Convert the object to a JSON string.
    const jsonString = JSON.stringify(obj, null, 2);

    // Create a Blob with the JSON string.
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create a temporary <a> element to trigger the download.
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;

    // Append the link to the body, click it, and then remove it.
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

