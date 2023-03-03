import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, remove, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { System } from '../../constants/system.constants';
import { database } from '../../firebase';

export const fetchHistoryOrder = createAsyncThunk(
    'history/fetchHistoryOrder',
    async (params, thunkAPI) => {
        const listAbate = await get(ref(database, "Abate")).then((snapshot) => {
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
        const listHistoryOrder = [];
        if (listAbate) {
            listAbate.forEach(item => {
                if (item.status === System.STATUS.ORDERED && item.products[0].user.email === params.email) {
                    listHistoryOrder.push(
                        {
                            ...item,
                        }
                    );
                }
            })
        }
        return listHistoryOrder;
    }
);

export const fetchCancelOrderById = createAsyncThunk(
    'history/fetchCancelOrderById',
    async (params, thunkAPI) => {
        return await remove(ref(database, "/Abate/" + params.key))
            .then((snapshot) => {
                if (snapshot) {
                    return snapshot.val();
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
    }
);

const initialState = {
    isLoading: false,
    historyList: [],
    historyCancelItem: null,
    isCancelLoading: false
}

export const historyOrderSlice = createSlice({
    name: 'history',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchHistoryOrder.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchHistoryOrder.fulfilled, (state, action) => {
            state.historyList = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchHistoryOrder.rejected, (state, action) => {
            state.isLoading = false;
        })
        builder.addCase(fetchCancelOrderById.pending, (state, action) => {
            state.isCancelLoading = true;
        })
        builder.addCase(fetchCancelOrderById.fulfilled, (state, action) => {
            state.historyCancelItem = action.payload;
            state.isCancelLoading = false;
        })
        builder.addCase(fetchCancelOrderById.rejected, (state, action) => {
            state.isCancelLoading = false;
        })
    },
})

export const { } = historyOrderSlice.actions

export default historyOrderSlice.reducer;