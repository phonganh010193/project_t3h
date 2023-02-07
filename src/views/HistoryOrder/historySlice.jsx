import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, remove } from 'firebase/database';
import { System } from '../../constants/system.constants';
import { database } from '../../firebase';

export const fetchHistoryOrder = createAsyncThunk(
    'history/fetchHistoryOrder',
    async (params, thunkAPI) => {
        const listAbate = await get(ref(database, "Abate")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(typeof snapshot.val());
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
        console.log('llistAbate=====================', listAbate);
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
    async (orderId, thunkAPI) => {
        return await remove(ref(database, "/Abate/" + orderId)).then((snapshot) => {
            return snapshot;
        }).catch((error) => {
            console.error(error);
        });
    }
);

const initialState = {
    isLoading: false,
    historyList: [],
}

export const historyOrdertSlice = createSlice({
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
    },
})

export const { } = historyOrdertSlice.actions

export default historyOrdertSlice.reducer;