import { configureStore } from '@reduxjs/toolkit'
import category from "../component/SideBar/sibarSlice";
import product from "../component/MainInfo/PerfumeInfo/perfumeInfoSlice";
import detail from "../component/DetailInfo/perfumeDetailSlice";
import order from "../component/CartInfo/orderSlice";

export const store = configureStore({
  reducer: {
    category,
    product,
    detail,
    order
  },
})