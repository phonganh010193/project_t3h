import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, push, ref, remove, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '../../firebase';



export const fetchOrderProduct = createAsyncThunk(
  'cart/fetchProductDetail',
  async (params, thunkAPI) => {
    const orderList = await get(ref(database, "Cart")).then((snapshot) => {
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
    const product = await get(ref(database, "Product")).then((snapshot) => {
      if (snapshot.exists()) {
        const response = snapshot.val();
        const keys = Object.keys(response);
        return keys.map(key => {
          return {
            ...response[key],
            keyProduct: key,
          }
        })
      }
    }).catch((error) => {
      console.error(error);
    });
    const listCart = [];
    if (product && orderList) {
      product?.forEach(el => {
        orderList?.filter(event => event?.user?.email === params.email)?.forEach(item => {
          if (el.id === item.productId) {
            listCart.push(
              {
                ...el,
                ...item
              }
            );
          }
          return listCart;
        })
      })
    }
    return listCart;
  }

);

export const fetchAddOrderItem = createAsyncThunk(
  'cart/fetchAddOrderItem',
  async (params, thunkAPI) => {
    const orderList = await get(ref(database, "Cart")).then((snapshot) => {
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

    const findItem = orderList?.find(el => params.id === el.productId && params.user.email === el.user.email)

    if (findItem) {
      toast.warning('Sản phẩm này đã có trong giỏ hàng!')

    } else {
      const ob = {
        user: params.user,
        productId: params.id,
        orderNumber: params.orderNumber,
        isCheckBox: false,
      }
      await push(ref(database, 'Cart'), ob)
        .then(() => {
          toast.success('Thêm vào giỏ hàng thành công!')
        })
        .catch((error) => {
          toast.error('Thêm vào giỏ hàng thất bại!')
        });
    }
  }
);

export const fetchDeleteOrderItem = createAsyncThunk(
  'cart/fetchDeleteOrderItem',
  async (params, thunkAPI) => {
    const orderList = await get(ref(database, "Cart")).then((snapshot) => {
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
    const oderListByUser = orderList?.filter(el => el.user.email === params.email);
    if (oderListByUser) {
      oderListByUser?.forEach(el => {
        remove(ref(database, "/Cart/" + el.key))
      })
    }
  }
);

export const fetchUpdateOrderItem = createAsyncThunk(
  'cart/fetchUpdateOrderItem',
  async (listCart, thunkAPI) => {
    const listUpdate = [];
    if (listCart) {
      listCart?.forEach(el => {
        if (el.quantity === 0) {
          listUpdate.push(el);
          update(ref(database, "/Cart/" + el.key), {
            user: el.user,
            productId: el.productId,
            orderNumber: el.orderNumber,
            isCheckBox: false
          })
        }
        return listUpdate;
      })
    }
    return listUpdate;

  }
);

const initialState = {
  isLoading: false,
  orderProduct: [],
  isLoadingAdd: false,
  addOrderProduct: null,
  deleteOrderProduct: null,
  isLoadingDelete: false,
  listUpdate: null,
  isLoadingListUpdate: false,
}

export const orderProductSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateListCart: (state, action) => {
      state.orderProduct = state.orderProduct.map(el => {
        if (el.user.email === action.payload.item.user.email && el.productId === action.payload.item.productId) {
          return action.payload.item;
        }
        return el;
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrderProduct.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchOrderProduct.fulfilled, (state, action) => {
      state.orderProduct = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchOrderProduct.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchAddOrderItem.pending, (state, action) => {
      state.isLoadingAdd = true;
    })
    builder.addCase(fetchAddOrderItem.fulfilled, (state, action) => {
      state.addOrderProduct = action.payload;
      state.isLoadingAdd = false;
    })
    builder.addCase(fetchAddOrderItem.rejected, (state, action) => {
      state.isLoadingAdd = false;
    })
    builder.addCase(fetchDeleteOrderItem.pending, (state, action) => {
      state.isLoadingDelete = true;
    })
    builder.addCase(fetchDeleteOrderItem.fulfilled, (state, action) => {
      state.deleteOrderProduct = action.payload;
      state.isLoadingDelete = false;
    })
    builder.addCase(fetchDeleteOrderItem.rejected, (state, action) => {
      state.isLoadingDelete = false;
    })
    builder.addCase(fetchUpdateOrderItem.pending, (state, action) => {
      state.isLoadingListUpdate = true;
    })
    builder.addCase(fetchUpdateOrderItem.fulfilled, (state, action) => {
      state.listUpdate = action.payload;
      state.isLoadingListUpdate = false;
    })
    builder.addCase(fetchUpdateOrderItem.rejected, (state, action) => {
      state.isLoadingListUpdate = false;
    })
  },
})

export const { updateListCart } = orderProductSlice.actions

export default orderProductSlice.reducer;