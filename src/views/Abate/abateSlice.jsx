import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '../../firebase';


export const fetchAbateById = createAsyncThunk(
  'abate/fetchAbateById',
  async (abateId, thunkAPI) => {
    return get(ref(database, "Abate")).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()[abateId];
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
);

export const fetchRemoveAbatebyId = createAsyncThunk(
  'abate/fetchAbateById',
  async (abateId, thunkAPI) => {
    return remove(ref(database, "/Abate/" + abateId))
      .then((data) => {
        toast.warning('Thanh toán chưa hoàn thành!')
      }).catch((error) => {
        console.error(error);
      });
  }
);

const initialState = {
  isLoading: false,
  abateDetail: null,
}

export const abateListSlice = createSlice({
  name: 'abate',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAbateById.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAbateById.fulfilled, (state, action) => {
      state.abateDetail = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchAbateById.rejected, (state, action) => {
      state.isLoading = false;
    })
  },
})

export const { updateListCart } = abateListSlice.actions

export default abateListSlice.reducer;