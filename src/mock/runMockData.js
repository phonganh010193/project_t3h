import { push, ref, remove, set } from "firebase/database";
import { database } from "../firebase";
import CategoryData from './category.json';
import ProductMenData from './product.json';
import OrderData from './order.json';
import UserData from './user.json';
class RunMockData {
    static async runMockCategory() {
        let colRef = ref(database, "/Category");
        await remove(colRef);
        const categoryListRef = ref(database, 'Category');
        CategoryData.forEach(el => {
            const newCategoryRef = push(categoryListRef);
            set(newCategoryRef, el);
        });
    }

    static async runMockProduct() {
        // let colRef = ref(database, "/Product");
        // await remove(colRef);
        const productListRef = ref(database, 'Product');
        ProductMenData.forEach(el => {
            const newProductRef = push(productListRef);
            set(newProductRef, el);
        });
    }

    static async runMockCart(user) {
        let colRef = ref(database, "/Cart");
        if (!user) {
            await remove(colRef);
        }
        const orderListRef = ref(database, 'Cart');
        OrderData.forEach(el => {
            const newOrderRef = push(orderListRef);
            set(newOrderRef, el);
        });
    }

    static async runMockUser() {
        // let colRef = ref(database, "/Cart");
        // await remove(colRef);
        const userListRef = ref(database, 'User');
        UserData.forEach(el => {
            const newUserRef = push(userListRef);
            set(newUserRef, el);
        });
    }


}

export default RunMockData;
