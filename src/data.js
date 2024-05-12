import fetch from 'node-fetch';

async function fetchData() {
    try {
        const response = await fetch('https://viva.alwaysdata.net/api.php?search=');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default fetchData;