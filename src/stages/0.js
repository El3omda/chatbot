import { storage } from "../storage.js";

export const initialStage = {
  exec({ from }) {
    storage[from].stage = 1;

    return "👋 *مرحباً بك كيف يمكنني مساعدتك ؟* : \n\n1️⃣ - *عرض المنتجات / التسوق*\n\n2️⃣ - *بحث المنتجات*\n\n3️⃣ - *تواصل معنا*\n";
  },
};
