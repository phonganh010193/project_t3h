import { configureStore } from '@reduxjs/toolkit'
import category from "../component/SideBar/sibarSlice";
import product from "../views/Perfume/perfumeInfoSlice";
import detail from "../views/Detail/perfumeDetailSlice";
import order from "../views/Cart/orderSlice";
import search from "../views/SearchList/searchSlice";
import abate from "../views/Abate/abateSlice";
import history from "../views/HistoryOrder/historySlice";

export const store = configureStore({
  reducer: {
    category,
    product,
    detail,
    order,
    search,
    abate,
    history
  },
})