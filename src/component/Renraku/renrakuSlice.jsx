import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, remove } from 'firebase/database';
import { database } from '../../firebase';


export const fetchRenraku = createAsyncThunk(
    'renraku/fetchRenraku',
    async (params, thunkAPI) => {
        return await get(ref(database, "Renraku")).then((snapshot) => {
            if (snapshot.exists()) {
                const response = snapshot.val();
                const keys = Object.keys(response);
                return keys.map(key => {
                    return {
                        ...response[key],
                        key,
                    }
                })
            }
        }).catch((error) => {
            console.error(error);
        });
    }
);
export const fetchDeleteRenrakuByKey = createAsyncThunk(
    'renraku/fetchDeleteRenrakuByKey',
    async (key, thunkAPI) => {
        return await remove(ref(database, "/Renraku/" + key))
            .then((snapshot) => {
                return snapshot;
            }).catch((error) => {
                console.error(error);
            });
    }
)



const initialState = {
    isLoading: false,
    renrakuList: null,
    deleteRenraku: null,
    isLoadingDelete: false,
}

export const renrakuSlice = createSlice({
    name: 'renraku',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchRenraku.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchRenraku.fulfilled, (state, action) => {
            state.renrakuList = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchRenraku.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchDeleteRenrakuByKey.pending, (state, action) => {
            state.isLoadingDelete = true;
        })
        builder.addCase(fetchDeleteRenrakuByKey.fulfilled, (state, action) => {
            state.deleteRenraku = action.payload;
            state.isLoadingDelete = false;
        })
        builder.addCase(fetchDeleteRenrakuByKey.rejected, (state, action) => {
            state.isLoadingDelete = false;
        })

    },
})

export const { } = renrakuSlice.actions

export default renrakuSlice.reducer;