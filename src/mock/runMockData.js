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
        let colRef = ref(database, "/Product");
        await remove(colRef);
        const productListRef = ref(database, 'Product');
        ProductMenData.forEach(el => {
            const newProductRef = push(productListRef);
            set(newProductRef, el);
        });
    }

    static async runMockCart() {
        console.log('===================1===========')
        let colRef = ref(database, "/Cart");
        await remove(colRef);
        const orderListRef = ref(database, 'Cart');
        console.log('===================2===========')
        OrderData.forEach(el => {
            const newOrderRef = push(orderListRef);
            set(newOrderRef, el);
        });
        console.log('===================3===========')
    }

    static async runMockUser() {
        console.log('===================4===========')
        // let colRef = ref(database, "/Cart");
        // await remove(colRef);
        const userListRef = ref(database, 'User');
        console.log('===================5===========')
        UserData.forEach(el => {
            const newUserRef = push(userListRef);
            set(newUserRef, el);
        });
        console.log('===================6===========')
    }


}

export default RunMockData;
