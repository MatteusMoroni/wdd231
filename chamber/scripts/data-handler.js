/**
 * Fetches member data from the specified URL.
 * @param {string} url - The URL of the JSON data file.
 * @returns {Promise<Array | null>} A promise that resolves to an array of member objects or null if an error occurs.
 */
export const getMembers = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching member data:', error);
        return null; // Return null to indicate failure
    }
};
