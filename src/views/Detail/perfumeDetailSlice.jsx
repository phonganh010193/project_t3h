import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, push, ref } from "firebase/database";
import { database } from '../../firebase';


const dataProductDetailRef = ref(database, "Product")
export const fetchProductDetail = createAsyncThunk(
  'product/fetchProductDetail',
  async (productId, thunkAPI) => {
    return await get(dataProductDetailRef).then((snapshot) => {
      if (snapshot.exists()) {
        //   return snapshot.val();
        return Object.values(snapshot.val()).find(el => el.id === productId);
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
);

export const fetchCommentListByUser = createAsyncThunk(
  'product/fetchCommentListByUser',
  async (productId, thunkAPI) => {
    const commentList = await get(ref(database, "Comment")).then((snapshot) => {
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
    return commentList?.filter(el => el.productId === productId);
  }

);

export const fetchAddCommentDetail = createAsyncThunk(
  'product/fetchCommentDetail',
  async (params, thunkAPI) => {
    return await push(ref(database, "Comment"), params)
      .then((snapshot) => {
        console.log(snapshot)
      }).catch((error) => {
        console.error(error);
      });
  }
);


const initialState = {
  isLoading: false,
  productListDetail: {},
  commentList: null,
  isLoadingComment: false
}

export const productDetailSlice = createSlice({
  name: 'product_detail',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductDetail.pending, (state, action) => {
      state.isLoading = true;
    })
    builder.addCase(fetchProductDetail.fulfilled, (state, action) => {
      state.productListDetail = action.payload;
      state.isLoading = false;
    })
    builder.addCase(fetchProductDetail.rejected, (state, action) => {
      state.isLoading = false;
    })
    builder.addCase(fetchCommentListByUser.pending, (state, action) => {
      state.isLoadingComment = true;
    })
    builder.addCase(fetchCommentListByUser.fulfilled, (state, action) => {
      state.commentList = action.payload;
      state.isLoadingComment = false;
    })
    builder.addCase(fetchCommentListByUser.rejected, (state, action) => {
      state.isLoadingComment = false;
    })
  },
})

// Action creators are generated for each case reducer function
export const { } = productDetailSlice.actions

export default productDetailSlice.reducer;