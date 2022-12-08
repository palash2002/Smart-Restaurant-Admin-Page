import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {}

const quantitiesSlice = createSlice({
    name: 'quantities',
    initialState,
    reducers: {
        addFood: (state, action) => {
            const { id, name, price } = action.payload
            state[id] = { quantity: 1, name: name, price: price, referenceId: id }
        },
        incrementFood: (state, action) => {
            const { id } = action.payload
            state[id].quantity++
        },
        decrementFood: (state, action) => {
            const { id } = action.payload

            state[id].quantity--
        },
        removeFood: (state, action) => {
            const { id } = action.payload

            delete state[id]
        }
    }
})

export default quantitiesSlice.reducer
export const { addFood, incrementFood, decrementFood, removeFood } = quantitiesSlice.actions