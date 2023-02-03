import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, push, ref, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '../../firebase';



export const fetchOrderProduct = createAsyncThunk(
  'cart/fetchProductDetail',
  async (productId, thunkAPI) => {
    const orderList = await get(ref(database, "Cart")).then((snapshot) => {
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

    const product = await get(ref(database, "Product")).then((snapshot) => {
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
    const listCart = [];
    if (product && orderList) {
      product.forEach(el => {
        orderList.forEach(item => {
          if (el.id === item.productId) {
            listCart.push(
              {
                ...el,
                ...item
              }
            );
          }
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

    const product = await get(ref(database, "Product")).then((snapshot) => {
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
    const listCart = [];
    if (product && orderList) {
      product.forEach(el => {
        orderList.forEach(item => {
          if (el.id === item.productId) {
            listCart.push(
              {
                ...el,
                ...item
              }
            );
          }
        })
      })
    }
    const findItem = listCart.find(el => params.id === el.productId)

    if (findItem) {
      await update(ref(database, "Cart/" + findItem.key), {
        orderNumber: parseFloat(findItem.orderNumber) + parseFloat(params.orderNumber),
        productId: findItem.productId,
        user: findItem.user,
        isCheckBox: false,
      })
        .then(() => {
          toast.success('Thêm vào giỏ hàng thành công!')
        })
        .catch(() => {
          toast.error('Thêm vào giỏ hàng thất bại!')
        })
    } else {
      const ob = {
        user: params.user.email,
        productId: params.id,
        orderNumber: 1,
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

const initialState = {
  isLoading: false,
  orderProduct: [],
}

export const orderProductSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateListCart: (state, action) => {
      state.orderProduct = state.orderProduct.map(el => {
        if (el.user === action.payload.item.user && el.productId === action.payload.item.productId) {
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
  },
})

export const { updateListCart } = orderProductSlice.actions

export default orderProductSlice.reducer;