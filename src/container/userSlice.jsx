import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, push, ref, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { database } from '../firebase';




export const fetchUserItem = createAsyncThunk(
    'user/fetchUserItem',
    async (params, thunkAPI) => {
        const userList = await get(ref(database, "User")).then((snapshot) => {
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
        return userList?.find(el => el.email === params.email)

    }
);

export const fetchUpdateUserItem = createAsyncThunk(
    'user/fetchAddUserItem',
    async (params, thunkAPI) => {
        console.log('param from login', params)
        const userList = await get(ref(database, "User")).then((snapshot) => {
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
        const findItem = userList?.find(el => el.email === params.email)
        if (findItem) {
            await update(ref(database, "/User/" + findItem.key), params)
                .then(() => {
                    toast.success('Cập nhật thông tin người dùng thành công')
                })
                .catch(() => {
                    console.log('Cập nhật thông tin người dùng thất bại')
                })
            console.log('finditem', findItem);
        } else {
            await push(ref(database, "User"), params)
                .then(() => {
                    toast.success('Cập nhật thông tin người dùng thành công')
                })
                .catch(() => {
                    console.log('Cập nhật thông tin người dùng thất bại')
                })
        }
    }
);




const initialState = {
    isLoading: false,
    userCurrent: {},
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserItem.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUserItem.fulfilled, (state, action) => {
            state.userCurrent = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchUserItem.rejected, (state, action) => {
            state.isLoading = false;
        })
    },
})

export const { } = userSlice.actions

export default userSlice.reducer;