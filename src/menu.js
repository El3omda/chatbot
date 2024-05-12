export let menu = {
  1: {
    name: 'زيت حلوة 700 مل',
    description: 'زيت خليط من شركة حلوة بوزن 700 مل تقريباً',
    price: 52.5,
  },
  2: {
    name: 'زيت حلوة 4.5 لتر',
    description: 'زيت عباد الشمس من شركة حلوة بزن 4.5 لتر',
    price: 279.5,
  },
};

fetch('https://viva.alwaysdata.net/api.php?search=')
  .then(response => response.json())
  .then(data => {
    data.forEach((item, index) => {
      menu[index + 1] = { 
        name: item.name,
        description: item.description,
        price: item.price,
      };
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
