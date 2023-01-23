import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { collection, getDoc } from 'firebase/firestore'
// import { database } from '../../../firebase'
import { child, get, getDatabase, ref } from "firebase/database";
import { database } from '../../firebase';


const dataOrderProductRef = ref(database, "Cart")
export const fetchOrderProduct = createAsyncThunk(
    'cart/fetchProductDetail',
    async (productId, thunkAPI) => {
      return get(dataOrderProductRef).then((snapshot) => {
        if (snapshot.exists()) {
          console.log(typeof snapshot.val());
        //   return snapshot.val();
          return Object.values(snapshot.val());
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
)
const initialState = {
    isLoading: false,
    orderProduct: [],
}

export const orderProductSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchOrderProduct.pending, (state, action) => {
        console.log('action', action);
      // Add user to the state array
      state.isLoading = true;
    })
    builder.addCase(fetchOrderProduct.fulfilled, (state, action) => {
        console.log('actionasddd', action.payload);
      // Add user to the state array
      state.orderProduct = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchOrderProduct.rejected, (state, action) => {
        console.log('action', action);
      // Add user to the state array
    //   state.productList = action.payload;
      state.isLoading = false;
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = orderProductSlice.actions

export default orderProductSlice.reducer;