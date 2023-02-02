import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, remove } from 'firebase/database';
import { toast } from 'react-toastify';
import { System } from '../../constants/system.constants';
import { database } from '../../firebase';


export const fetchAbateById = createAsyncThunk(
  'abate/fetchAbateById',
  async (abateId, thunkAPI) => {
    return await get(ref(database, "Abate")).then((snapshot) => {
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

export const fetchAbateList = createAsyncThunk(
  'abate/fetchAbateList',
  async (params, thunkAPI) => {
    const abateList = await get(ref(database, "Abate")).then((snapshot) => {
      if (snapshot.exists()) {
        const response = snapshot.val();
        const keys = Object.keys(response);
        return keys.map(key => {
          return {
            ...response[key],
            key,
          }
        })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return abateList.find(el => el.status === System.STATUS.ORDERING)
  }
);

export const fetchRemoveAbatebyId = createAsyncThunk(
  'abate/fetchAbateById',
  async (abateId, thunkAPI) => {
    return await remove(ref(database, "/Abate/" + abateId))
      .then((data) => {
        return data;
      }).catch((error) => {
        console.error(error);
      });
  }
);

const initialState = {
  isLoading: false,
  abateDetail: null,
  abateList: null,
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
    builder.addCase(fetchAbateList.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAbateList.fulfilled, (state, action) => {
      state.abateList = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchAbateList.rejected, (state, action) => {
      state.isLoading = false;
    })
  },
})

export const { updateListCart } = abateListSlice.actions

export default abateListSlice.reducer;