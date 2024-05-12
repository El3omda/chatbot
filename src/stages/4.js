import { storage } from '../storage.js';
import axios from 'axios';
import searchData from '../search.js';

function numberToEmoji(number) {
  const digitEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];
  const digits = number.toString().split('').map(digit => digitEmojis[digit]);

  if (number > 9) {
    return digits.reverse().join('');
  } else {
    return digits.reverse();
  }
}


let searchResult;
async function main(globalMessage) {
  try {
    searchResult = await searchData(globalMessage);
  } catch (error) {
      console.error('Error:', error);
  }
}

let globalMessage;
main(globalMessage)

export const stageFour = {
  exec({ from, message }) {
    globalMessage = message;

    let msg = '```قم بكتابة الرقم الخاص بالمنتج ليتم إضافتة لطلبك```\n\n';
    console.log(searchResult);
    Object.keys(searchResult).map((value, index) => {
      const element = searchResult[value];
      msg += `${numberToEmoji(index + 1)} - *_${element.name}_ | _${element.price}_ جنية*\n\n`;
    });
    

    return msg;
    
  },
};
