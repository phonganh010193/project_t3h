import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '../../firebase';


const dataProductRef = ref(database, "Product")
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (userId, thunkAPI) => {
    return get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
);
export const fetchNewAddProduct = createAsyncThunk(
  'product/fetchNewAddProduct',
  async (userId, thunkAPI) => {
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return product.sort(function (a, b) {
      return new Date(b.dateAdd).getTime() - new Date(a.dateAdd).getTime();
    })
  }
);
export const fetchBestSellersProduct = createAsyncThunk(
  'product/fetchBestSellersProduct',
  async (userId, thunkAPI) => {
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    return product.filter(el => el.bestsellers === "1");
  }
)
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (productId, thunkAPI) => {
    const productUpdate = await get(dataProductRef).then((snapshot) => {
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
    return productUpdate.find(el => el.id === productId);
  }
);

export const fetchUpdateProductById = createAsyncThunk(
  'product/fetchUpdateProductById',
  async (params, thunkAPI) => {
    return update(ref(database, "/Product/" + params.key), params.item)
      .then((res) => {
        toast.success('Cập nhật thành công')
      }).catch((error) => {
        console.error(error);
        toast.error('Cập nhật không thành công')
      });
  }
);
const initialState = {
  isLoading: false,
  productList: [],
  productUpdate: null,
  newAdd: [],
  bestSellers: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.productList = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchProductById.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchProductById.fulfilled, (state, action) => {
      state.productUpdate = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchProductById.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchNewAddProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchNewAddProduct.fulfilled, (state, action) => {
      state.newAdd = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchNewAddProduct.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchBestSellersProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchBestSellersProduct.fulfilled, (state, action) => {
      state.bestSellers = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchBestSellersProduct.rejected, (state, action) => {
      state.isLoading = false;
    })
  },
})

export const { } = productSlice.actions

export default productSlice.reducer;