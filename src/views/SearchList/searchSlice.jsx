import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref } from 'firebase/database';
import { database } from '../../firebase';


const dataProductRef = ref(database, "Product")
export const fetchSearchProduct = createAsyncThunk(
    'search/fetchSearchProduct',
    async (params, thunkAPI) => {
        const product = await get(dataProductRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(typeof snapshot.val());
                return Object.values(snapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
        const searchList = [];
        if (product && params) {
            product.forEach(el => {
                if (el.productName.toLowerCase().split(" ").join('').indexOf(params.toLowerCase().split(" ").join('')) !== -1) {
                    searchList.push(el)
                }
            });
        }
        return searchList;
    }
)
const initialState = {
    isLoading: false,
    searchList: [],
}

export const searchProductSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchProduct.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchSearchProduct.fulfilled, (state, action) => {
            state.searchList = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchSearchProduct.rejected, (state, action) => {
            state.isLoading = false;
        })
    },
})

export const { } = searchProductSlice.actions

export default searchProductSlice.reducer;