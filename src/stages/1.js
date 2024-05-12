import { storage } from '../storage.js';
import { neighborhoods } from './neighborhoods.js';
import fetchData from '../data.js';

function numberToEmoji(number) {
  const digitEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  const digits = number.toString().split('').map(digit => digitEmojis[digit]);

  if (number > 9) {
    return digits.reverse().join('');
  } else {
    return digits.reverse();
  }
}

// Get Data From API
let apiData = undefined;

async function main() {
  try {
      apiData = await fetchData();
  } catch (error) {
      console.error('Error:', error);
  }
}

setInterval(main, 1000);

export const stageOne = {
  exec({ from, message, client }) {
    
    if (message === '1') {
    
      let msg = '*المنتجات المتوفرة*\n```قم بكتابة الرقم الخاص بالمنتج ليتم إضافتة لطلبك```\n\n';

      Object.keys(apiData).map((value, index) => {
        const element = apiData[value];

        msg += `${numberToEmoji(index + 1)} - *_${element.name}_ | _${element.price}_ جنية*\n\n`;
      });
      
      storage[from].stage = 2;

      msg += '\n\n*️⃣ *لإلغاء الطلب*';
      return msg;
    } else if (message === '2') {
      let msg = '*بحث المنتجات*\n```قم بكتابة أسم المنتج و سيتم البحث عنة```\n\n';
      storage[from].stage = 4;
      return msg;
    } else if (message === '3') {
      client.markUnseenMessage(from);

      storage[from].stage = 5;

      return '*من فضلك إنتظر سيتم التواصل معك قريباً*';
    }

    return '❌ *لقد ادخلت رقم خاطئ*\n```قم بإختيار خيار واحد فقط```';
  },
};
