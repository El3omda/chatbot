import fetch from 'node-fetch';

async function searchData(search) {
    try {
        const response = await fetch('https://viva.alwaysdata.net/api.php?search=' + search);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export default searchData;