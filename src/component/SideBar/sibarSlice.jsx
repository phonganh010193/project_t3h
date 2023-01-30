import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { collection, getDoc } from 'firebase/firestore'
import { database } from '../../firebase'
import { child, get, ref } from "firebase/database";

const dataCategoryRef = ref(database, "Category")
export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (userId, thunkAPI) => {
    return get(dataCategoryRef).then((snapshot) => {
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
  categoryList: [],
  isLoading: false
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.categoryList = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoading = false
    })
  },
})

export const { } = categorySlice.actions

export default categorySlice.reducer;