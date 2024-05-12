import { storage } from '../storage.js';

export const stageThree = {
  exec({ from, message, client }) {

    const order =
      '\n-----------------------------------\n#️⃣ - *تأكيد الطلب* \n*️⃣ - *الغاء الطلب*';

    storage[from].address = message;
    // storage[from].stage = 0;
    
    let products = storage[from].itens;
    let cart = '';
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      cart += `${i+1} - ${product.name} <=> ${product.price} جنية \n`;
      totalPrice += product.price;
    }

    if (message === '*') {
      storage[from].stage = 0;
      storage[from].itens = [];

      return '*✅ تم إلغاء الطلب بنجاح*';
    }

    if (message === '#') {
      // Save Order To Database


      return '*✅ تم تأكيد الطلب بنجاح سيقوم المندوب بالتواصل معك لأستلام منتجاتك قريباً*';
    }

    //  else {
    //   if (!menu[message]) {
    //     return `*لقد إدخلت رقم خاطئ* \n\n ${order}`;
    //   }
    // }
    
    return (
      '*مراجعة الطلب* \n\n' + cart + '\n' + '\n ----------------------------------- \n' + 'العنوان : ' + storage[from].address + '\n ----------------------------------- \n' + 'الإجمالي : ' + totalPrice + ' جنية'
      + order
    );
    
  },
};
