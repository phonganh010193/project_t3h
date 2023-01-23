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
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
        console.log('action', action);
      // Add user to the state array
      state.categoryList = action.payload
    })
  },
})

// Action creators are generated for each case reducer function
export const {} = categorySlice.actions

export default categorySlice.reducer;