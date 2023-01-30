import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref } from 'firebase/database';
import { database } from '../../firebase';


export const fetchListAbate = createAsyncThunk(
  'order/fetchListAbate',
  async (productId, thunkAPI) => {
    return get(ref(database, "Abate")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(typeof snapshot.val());
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
  abateList: []
}

export const abateListSlice = createSlice({
  name: 'abate',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchListAbate.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchListAbate.fulfilled, (state, action) => {
      state.abateList = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchListAbate.rejected, (state, action) => {
      state.isLoading = false;
    })
  },
})

export const { updateListCart } = abateListSlice.actions

export default abateListSlice.reducer;