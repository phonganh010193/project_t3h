import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { collection, getDoc } from 'firebase/firestore'
// import { database } from '../../../firebase'
import { child, get, getDatabase, ref } from "firebase/database";
import { database } from '../../firebase';


const dataProductDetailRef = ref(database, "Product")
export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (productId, thunkAPI) => {
    return get(dataProductDetailRef).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(typeof snapshot.val());
        //   return snapshot.val();
        return Object.values(snapshot.val()).find(el => el.id === productId);
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
  productListDetail: {},
}

export const productDetailSlice = createSlice({
  name: 'product_detail',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProductDetail.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
    })
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      // Add user to the state array
      state.productListDetail = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      // Add user to the state array
      //   state.productList = action.payload;
      state.isLoading = false;
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = productDetailSlice.actions

export default productDetailSlice.reducer;