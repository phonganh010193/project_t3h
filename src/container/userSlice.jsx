import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, push, ref, update } from 'firebase/database';
import { database } from '../firebase';


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (params, thunkAPI) => {
        return await get(ref(database, "User")).then((snapshot) => {
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
    }
)
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
    'user/fetchUpdateUserItem',
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
        const findItem = userList?.find(el => el.email === params.email)
        if (findItem) {
            await update(ref(database, "/User/" + findItem.key), params)
                .then((res) => {
                    return res;
                })
                .catch((error) => {
                    console.log(error)
                })

        } else {
            await push(ref(database, "User"), params)
                .then((res) => {
                    return res
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }
);




const initialState = {
    isLoading: false,
    userCurrent: {},
    userList: null
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
        builder.addCase(fetchUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.userList = action.payload;
            state.isLoading = false;
        })
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.isLoading = false;
        })
    },
})

export const { } = userSlice.actions

export default userSlice.reducer;