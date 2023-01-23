import { push, ref, remove, set } from "firebase/database";
import { doc, deleteDoc } from "firebase/firestore";
import { database } from "../firebase";
import CategoryData from './category.json';
import ProductMenData from './product.json';
import OrderData from './order.json';
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

   
}

export default RunMockData;
