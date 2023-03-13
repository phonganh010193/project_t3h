import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, ref, remove, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '../../firebase';


const dataProductRef = ref(database, "Product")
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (userId, thunkAPI) => {
    return get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        // return Object.values(snapshot.val());
        const response = snapshot.val();
        const keys = Object.keys(response);
        return keys.map(key => {
          return {
            ...response[key],
            key,
          }
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  }
);
export const fetchProductMen = createAsyncThunk(
  'product/fetchProductMen',
  async (userId, thunkAPI) => {
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        // return Object.values(snapshot.val());
        const response = snapshot.val();
        const keys = Object.keys(response);
        return keys.map(key => {
          return {
            ...response[key],
            key,
          }
        });
      }
    }).catch((error) => {
      console.error(error);
    });
    return product.filter(el => el.gender === "1");
  }
);
export const fetchProductWommen = createAsyncThunk(
  'product/fetchProductWommen',
  async (userId, thunkAPI) => {
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        // return Object.values(snapshot.val());
        const response = snapshot.val();
        const keys = Object.keys(response);
        return keys.map(key => {
          return {
            ...response[key],
            key,
          }
        });
      }
    }).catch((error) => {
      console.error(error);
    });
    return product.filter(el => el.gender === "2");
  }
);
export const fetchNewAddProduct = createAsyncThunk(
  'product/fetchNewAddProduct',
  async (userId, thunkAPI) => {
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
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
      }
    }).catch((error) => {
      console.error(error);
    });
    return product.sort(function (a, b) {
      return b.bestsellers - a.bestsellers;
    });
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
      }
    }).catch((error) => {
      console.error(error);
    });
    return productUpdate.find(el => el.id === productId);
  }
);

export const updateQuantityProductByBuy = createAsyncThunk(
  'product/updateQuantityProduct',
  async (abateId, thunkAPI) => {
    const abateList = await get(ref(database, "Abate")).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()[abateId];
      }
    }).catch((error) => {
      console.error(error);
    });
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
    }).catch((error) => {
      console.error(error);
    });
    if (abateList && product) {
      product?.forEach(el => {
        abateList?.products?.forEach(item => {
          if (el.id === item.id) {
            const nextQuantity = el.quantity - item.orderNumber;
            update(ref(database, "/Product/" + item.keyProduct), {
              ...el,
              quantity: nextQuantity > 0 ? nextQuantity : 0,
              bestsellers: el.bestsellers + 1
            })
              .then((res) => {
                return res;
              })
              .catch((error) => {
                console.log(error)
              })
            remove(ref(database, "/Cart/" + item.key))
          }
        })
      })
    }
  }
);
export const updateQuantityProductByCancel = createAsyncThunk(
  'product/updateQuantityProductByCancel',
  async (params, thunkAPI) => {
    const product = await get(dataProductRef).then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val());
      }
    }).catch((error) => {
      console.error(error);
    });
    if (params && product) {
      product?.forEach(el => {
        params?.products?.forEach(item => {
          if (el.id === item.id) {
            update(ref(database, "/Product/" + item.keyProduct), {
              ...el,
              quantity: el.quantity + Number(item.orderNumber),
              bestsellers: el.bestsellers - 1
            })
              .then((res) => {
                return res;
              })
              .catch((error) => {
                console.log(error)
              })
          }
        })
      })
    }
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
  productMen: null,
  isLoadingMen: false,
  productWommen: null,
  isLoadingWommen: false,
  newAdd: [],
  bestSellers: [],
  productAfterUpdate: null,
  isLoadingAfterUpdate: false
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
    builder.addCase(fetchProductMen.pending, (state, action) => {
      state.isLoadingMen = true;
    })
    builder.addCase(fetchProductMen.fulfilled, (state, action) => {
      state.productMen = action.payload;
      state.isLoadingMen = false;
    })
    builder.addCase(fetchProductMen.rejected, (state, action) => {
      state.isLoadingMen = false;
    })
    builder.addCase(fetchProductWommen.pending, (state, action) => {
      state.isLoadingWommen = true;
    })
    builder.addCase(fetchProductWommen.fulfilled, (state, action) => {
      state.productWommen = action.payload;
      state.isLoadingWommen = false;
    })
    builder.addCase(fetchProductWommen.rejected, (state, action) => {
      state.isLoadingWommen = false;
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
    builder.addCase(updateQuantityProductByBuy.pending, (state, action) => {
      state.isLoadingAfterUpdate = true;
    })
    builder.addCase(updateQuantityProductByBuy.fulfilled, (state, action) => {
      state.productAfterUpdate = action.payload;
      state.isLoadingAfterUpdate = false;
    })
    builder.addCase(updateQuantityProductByBuy.rejected, (state, action) => {
      state.isLoadingAfterUpdate = false;
    })
  },
})

export const { } = productSlice.actions

export default productSlice.reducer;