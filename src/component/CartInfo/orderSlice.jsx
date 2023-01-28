import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { collection, getDoc } from 'firebase/firestore'
// import { database } from '../../../firebase'
import { child, get, getDatabase, ref } from "firebase/database";
import { connectFirestoreEmulator } from 'firebase/firestore';
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
      if(product && orderList) {
          product.forEach(el => {
              orderList.forEach(item => {
                  if(el.id === item.productId) {
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

export const fetchListAbate = createAsyncThunk(
  'order/fetchListAbate',
  async (productId, thunkAPI) => {
    return get(ref(database, "Abate")).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(typeof snapshot.val());
      //   return snapshot.val();
        return Object.values(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
)
const initialState = {
    isLoading: false,
    orderProduct: [],
    abateList:[]
}

export const orderProductSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    updateListCart: (state, action) => {
      console.log('action.payload', action.payload);
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
        console.log('action', action);
      state.isLoading = true;
    })
    builder.addCase(fetchOrderProduct.fulfilled, (state, action) => {
        console.log('actionasddd', action.payload);
      state.orderProduct = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchOrderProduct.rejected, (state, action) => {
        console.log('action', action);
      state.isLoading = false;
    })
    builder.addCase(fetchListAbate.pending, (state, action) => {
      console.log('action', action);
      state.isLoading = true;
    })
    builder.addCase(fetchListAbate.fulfilled, (state, action) => {
        console.log('actionasddd', action.payload);
        state.abateList = action.payload;
        state.isLoading = false;
    })
    builder.addCase(fetchListAbate.rejected, (state, action) => {
        console.log('action', action);
        state.isLoading = false;
    })
  },
})

export const { updateListCart } = orderProductSlice.actions

export default orderProductSlice.reducer;