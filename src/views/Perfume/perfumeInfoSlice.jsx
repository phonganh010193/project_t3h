import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref } from 'firebase/database';
import { database } from '../../firebase';


const dataProductRef = ref(database, "Product")
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (userId, thunkAPI) => {
    return get(dataProductRef).then((snapshot) => {
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
  productList: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchProduct.pending, (state, action) => {
      // Add user to the state array
      state.isLoading = true;
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      // Add user to the state array
      state.productList = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      // Add user to the state array
      //   state.productList = action.payload;
      state.isLoading = false;
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = productSlice.actions

export default productSlice.reducer;