import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const SERVER_URL = process.env.REACT_APP_SERVER_URL
const GET_URL = `${SERVER_URL}/diner/get-types`

const initialState = {
    types: [],

    status: 'idle',
    error: null
}

export const fetchType = createAsyncThunk('types/addTypes', async () => {
    try {
        const res = await fetch(GET_URL)
        const data = await res.json()
        return data
    }
    catch (err) {
        return err
    }
})

const typeSlice = createSlice({
    name: 'type',
    initialState,
    reducers: {
        check: (state, action) => {
            console.log(action)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchType.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchType.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.types.push(...action.payload)
            })
            .addCase(fetchType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

export default typeSlice.reducer

export const typeSelector = state => state.types.types 
