import { storage } from '../storage.js';
import fetchData from '../data.js';

let apiData = undefined;
async function main() {
  try {
      apiData = await fetchData();
  } catch (error) {
      console.error('Error:', error);
  }
}
main();

export const stageTwo = {
  exec({ from, message, client }) {
    const order =
      '\n-----------------------------------\n#️⃣ - *إكمال الطلب* \n*️⃣ - *الغاء الطلب*';
    if (message === '*') {
      storage[from].stage = 0;
      storage[from].itens = [];

      return '*✅ تم إلغاء الطلب بنجاح*';
    } else if (message === '#') {
      storage[from].stage = 3;

      return (
        '*قم بكتابة عنوانك*: \n ``` (المنطقة - الشارع - رقم المنزل / علامة مميزة) ``` \n' +
        '\n-----------------------------------\n*️⃣ - *الغاء الطلب*'
      );
    } else {
      if (!apiData[message]) {
        return `*لقد إدخلت رقم خاطئ* \n\n ${order}`;
      }
    }


    storage[from].itens.push(apiData[message]);
    // console.log(Object.values(storage)[0].itens);

    let products = storage[from].itens;
    let cart = '';
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      cart += `${i+1} - ${product.name} <=> ${product.price} جنية \n`;
      totalPrice += product.price;
    }

    return (
      `✅ *${apiData[message].name} تم الإضافة بنجاح*\n\n *${apiData[message].description}* \n *السعر : ${apiData[message].price} جنية* \n` +
      '\n```يمكنك إضافة منتجات اخري```: \n' +
      cart + '\n ----------------------------------- \n' + 'الإجمالي : ' + totalPrice + ' جنية' +
      order
    );
  },
};
