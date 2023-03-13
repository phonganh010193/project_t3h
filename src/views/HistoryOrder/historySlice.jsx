import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, update } from 'firebase/database';
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
            }
        }).catch((error) => {
            console.log(error);
        });
        const listHistoryOrder = [];
        if (listAbate) {
            listAbate.forEach(item => {
                if (item.status !== System.STATUS.ORDERING && item.status !== System.STATUS.CANCELED && item.products[0].user.email === params.email) {
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

export const fetchUpdateStatusOrdered = createAsyncThunk(
    'history/fetchUpdateStatusOrdered',
    async (params, thunkAPI) => {
        const updateStatusList = [];
        params.listOrdered.forEach(el => {
            if (el.key === params.value.item.key) {
                updateStatusList.push(el)
                update(ref(database, "/Abate/" + el.key), {
                    ...el,
                    status: params.value.values
                })
            }
        })
        return updateStatusList;

    }
);

export const fetchUpdateStatusCancelOrdered = createAsyncThunk(
    'history/fetchUpdateStatusCancelOrdered',
    async (params, thunkAPI) => {
        const findItem = params.listOrdered?.find(el => el.key === params.cancelKeyOrder);
        if(findItem) {
            await update(ref(database, "/Abate/" + params.cancelKeyOrder), {
                ...findItem,
                status: System.STATUS.CANCELED
            })
            .then(() => {
                toast.success("Hủy đơn hàng thành công!");
            })
            .catch((error) => {
                console.log(error);
            })
        } else {
            toast.error('Hủy đơn hàng không thành công!')
        }
        return findItem;

    }
);

export const fetchOrdered = createAsyncThunk(
    'history/fetchOrdered',
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
            }
        }).catch((error) => {
            console.log(error);
        });
        const listOrdered = [];
        if (listAbate) {
            listAbate.forEach(item => {
                if (item.status !== System.STATUS.ORDERING) {
                    listOrdered.push(
                        {
                            ...item,
                        }
                    );
                }
            })
        }
        return listOrdered;
    }
);
export const fetchCancelOrderById = createAsyncThunk(
    'history/fetchCancelOrderById',
    async (params, thunkAPI) => {
        return await update(ref(database, "/Abate/" + params.key), {
            ...params,
            status: "Canceled"
        })
            .then((snapshot) => {
                if (snapshot) {
                    return snapshot.val();
                }
            }).catch((error) => {
                console.error(error);
            });
    }
);

const initialState = {
    isLoading: false,
    historyList: null,
    historyCancelItem: null,
    isCancelLoading: false,
    listOrdered: null,
    isLoadingOrdered: false,
    updateStatusList: null,
    isLoadingUpdateStatus: false,
    cancelOrderedByKey: null,
    isLoadingCancelOrderByKey: false,
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
        builder.addCase(fetchOrdered.pending, (state, action) => {
            state.isLoadingOrdered = true;
        })
        builder.addCase(fetchOrdered.fulfilled, (state, action) => {
            state.listOrdered = action.payload;
            state.isLoadingOrdered = false;
        })
        builder.addCase(fetchOrdered.rejected, (state, action) => {
            state.isLoadingOrdered = false;
        })
        builder.addCase(fetchUpdateStatusOrdered.pending, (state, action) => {
            state.isLoadingUpdateStatus = true;
        })
        builder.addCase(fetchUpdateStatusOrdered.fulfilled, (state, action) => {
            state.updateStatusList = action.payload;
            state.isLoadingUpdateStatus = false;
        })
        builder.addCase(fetchUpdateStatusOrdered.rejected, (state, action) => {
            state.isLoadingUpdateStatus = false;
        })
        builder.addCase(fetchUpdateStatusCancelOrdered.pending, (state, action) => {
            state.isLoadingCancelOrderByKey = true;
        })
        builder.addCase(fetchUpdateStatusCancelOrdered.fulfilled, (state, action) => {
            state.cancelOrderedByKey = action.payload;
            state.isLoadingCancelOrderByKey = false;
        })
        builder.addCase(fetchUpdateStatusCancelOrdered.rejected, (state, action) => {
            state.isLoadingCancelOrderByKey = false;
        })
    },
})

export const { } = historyOrderSlice.actions

export default historyOrderSlice.reducer;