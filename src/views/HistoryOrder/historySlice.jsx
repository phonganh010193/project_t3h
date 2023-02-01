import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref } from 'firebase/database';
import { System } from '../../constants/system.constants';
import { database } from '../../firebase';



export const fetchHistoryOrder = createAsyncThunk(
    'history/fetchHistoryOrder',
    async (orderId, thunkAPI) => {
        const listAbate = await get(ref(database, "Abate")).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(typeof snapshot.val());
                //   return snapshot.val();
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
                if (item.status === System.STATUS.ORDERED) {
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