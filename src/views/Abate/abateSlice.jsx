import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, push, ref, remove, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { System } from '../../constants/system.constants';
import { database } from '../../firebase';


export const fetchAbateById = createAsyncThunk(
  'abate/fetchAbateById',
  async (abateId, thunkAPI) => {
    return await get(ref(database, "Abate")).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()[abateId];
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
);

export const fetchAddAbate = createAsyncThunk(
  'abate/fetchAddAbate',
  async (object, thunkAPI) => {
    return await push(ref(database, 'Abate'), object)
      .then((data) => {
        return data.key;
      })
      .catch((error) => {
        console.log(error)
      });
  }
);

export const fetchUpdateAbateById = createAsyncThunk(
  'abate/fetchUpdateAbateById',
  async (params, thunkAPI) => {
    const product = await get(ref(database, "Product")).then((snapshot) => {
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
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    const list = [];
    if(product) {
      product.forEach(el => {
        params.value.products.forEach(item => {
          if (el.id === item.productId) {
            list.push(
              {
                ...el,
                orderNumber: item.orderNumber
              }
            );
            return list
          }
        })
      })
      const confirmList = list?.filter(el => el.quantity < el.orderNumber);
      if(confirmList.length === 0) {
        update(ref(database, "/Abate/" + params.orderId), params.value).then((snapshot) => {
          toast.success('Order thành công!');
        }).catch((error) => {
          toast.error('order không thành công')
          console.error(error);
        });
      } else {
        alert('Đặt hàng không thành công do só lượng sản phẩm trong kho hiện tại không đủ. Xin chọn sản phẩm khác hoặc liên hệ với shop để được tư vấn. Xin cảm ơn!')
      }
    }
  }
);

export const fetchAbateList = createAsyncThunk(
  'abate/fetchAbateList',
  async (params, thunkAPI) => {
    const abateList = await get(ref(database, "Abate")).then((snapshot) => {
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
    return abateList.find(el => el.status === System.STATUS.ORDERING)
  }
);


// export const fetchRemoveAbateById = createAsyncThunk(
//   'abate/fetchAbateById',
//   async (abateId, thunkAPI) => {
//     return await remove(ref(database, "/Abate/" + abateId))
//       .then((data) => {
//         return data;
//       }).catch((error) => {
//         console.error(error);
//       });
//   }
// );
export const fetchRemoveAbateById = createAsyncThunk(
  'history/fetchCancelOrderById',
  async (params, thunkAPI) => {
    return await remove(ref(database, "/Abate/" + params))
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
  abateDetail: null,
  abateList: null,
  abateUpdate: null,
  isLoadingUpdate: false,
  deleteAbateByKey: null,
  isLoadingDeleteAbateByKey: false,
  keyAddAbate: null,
  isLoadingAddAbate: false
}

export const abateListSlice = createSlice({
  name: 'abate',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAbateById.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAbateById.fulfilled, (state, action) => {
      state.abateDetail = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchAbateById.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchAbateList.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchAbateList.fulfilled, (state, action) => {
      state.abateList = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchAbateList.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchUpdateAbateById.pending, (state, action) => {
      state.isLoadingUpdate = true;
    })
    builder.addCase(fetchUpdateAbateById.fulfilled, (state, action) => {
      state.abateUpdate = action.payload;
      state.isLoadingUpdate = false;
    })
    builder.addCase(fetchUpdateAbateById.rejected, (state, action) => {
      state.isLoadingUpdate = false;
    })
    builder.addCase(fetchRemoveAbateById.pending, (state, action) => {
      state.isLoadingDeleteAbateByKey = true;
    })
    builder.addCase(fetchRemoveAbateById.fulfilled, (state, action) => {
      state.deleteAbateByKey = action.payload;
      state.isLoadingDeleteAbateByKey = false;
    })
    builder.addCase(fetchRemoveAbateById.rejected, (state, action) => {
      state.isLoadingDeleteAbateByKey = false;
    })
    builder.addCase(fetchAddAbate.pending, (state, action) => {
      state.isLoadingAddAbate = true;
    })
    builder.addCase(fetchAddAbate.fulfilled, (state, action) => {
      state.keyAddAbate = action.payload;
      state.isLoadingAddAbate = false;
    })
    builder.addCase(fetchAddAbate.rejected, (state, action) => {
      state.isLoadingAddAbate = false;
    })
  },
})

export const { updateListCart } = abateListSlice.actions

export default abateListSlice.reducer;