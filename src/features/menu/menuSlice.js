import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import foodCard from "../../components/Accordion Components/FoodCard";

const serverUrl = process.env.REACT_APP_SERVER_URL

const initialState = {
    menu: {},
    menuTypes: [],
    status: 'idle',
    error: null,
    typeUnderDeletion: 'idle',
    typeUnderUpdation: 'idle',
    foodUnderAddition: 'idle',
    foodUnderDeletion: 'idle',
    foodUnderUpdation: 'idle'
}

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    try {
        const res = await fetch(`${serverUrl}/admin/get-all-foods`)
        return res.json()
    } catch (err) {
        return err
    }
})

export const deleteType = createAsyncThunk('menu/deleteType', async (type, {dispatch}) => {
    try {
        await fetch(`${serverUrl}/admin/remove-type`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({type: type})
        })

        return type
    } catch (err) {
        return err
    }
})

export const deleteFoodItem = createAsyncThunk('menu/deleteFoodItem', async ({type, id}) => {
    try {
        await fetch(`${serverUrl}/admin/remove-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        return {type, id}
    } catch (err) {
        return err
    }
})

export const addFoodItem = createAsyncThunk('menu/addFoodItem', async (foodItem) => {
    try {
        const rawResponse = await fetch(`${serverUrl}/admin/add-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem)
        })
        const {id} = await rawResponse.json()
        return {
            ...foodItem,
            id
        }
    } catch (err) {
        return err
    }
})

export const updateFoodItem = createAsyncThunk('menu/updateFoodItem', async ({foodItem, oldType}) => {
    try {
        await fetch(`${serverUrl}/admin/update-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem)
        })

        return {foodItem, oldType}
    } catch (err) {
        return err
    }
})

export const updateType = createAsyncThunk('menu/updateType', async ({oldType, newType}) => {
    try {
        await fetch(`${serverUrl}/admin/update-type`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldType,
                newType
            })
        })

        return {oldType, newType}
    } catch (err) {
        return err
    }
})

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        // removeType:
        // setTypeUnderDeletion: (state, action) => {
        //     state.typeUnderDeletion = action.payload.type
        // }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchMenu.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = 'succeeded'

                state.menu = action.payload.menu
                state.menuTypes = Object.keys(action.payload)
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })


            .addCase(deleteType.pending, (state, action) => {
                state.typeUnderDeletion = 'loading'
            })
            .addCase(deleteType.fulfilled, (state, action) => {
                const type = action.payload
                delete state.menu[type]
                state.typeUnderDeletion = type
                // state.typeUnderDeletion = 'idle'
            })
            .addCase(deleteType.rejected, (state, action) => {

            })


            .addCase(deleteFoodItem.pending, (state, action) => {
                state.deletingStatus = 'loading'
            })
            .addCase(deleteFoodItem.fulfilled, (state, action) => {
                const {type, id} = action.payload
                const foodIndex = state.menu[type].findIndex(item => item.id === id)
                state.menu[type].splice(foodIndex, 1)
            })
            .addCase(deleteFoodItem.rejected, (state, action) => {

            })


            .addCase(addFoodItem.pending, (state, action) => {
                state.foodUnderAddition = 'loading'
            })
            .addCase(addFoodItem.fulfilled, (state, action) => {
                const foodItem = action.payload
                const {type} = foodItem

                if (!state.menu[type]) {
                    state.menu[type] = [foodItem]
                } else {
                    state.menu[type].push(foodItem)
                }

                state.foodUnderAddition = foodItem.name
            })
            .addCase(addFoodItem.rejected, (state, action) => {

            })

            .addCase(updateFoodItem.pending, (state, action) => {
                state.foodUnderUpdation = 'loading'
            })
            .addCase(updateFoodItem.fulfilled, (state, action) => {
                const {oldType, foodItem} = action.payload
                const {id, type} = foodItem

                const foodIndexInOldType = state.menu[oldType].findIndex(food => food.id === id)
                state.menu[oldType].splice(foodIndexInOldType, 1)

                if (state.menu[oldType].length === 0) {
                    delete state.menu[oldType]
                    state.typeUnderDeletion = oldType
                }
                if (!state.menu[type]) {
                    state.menu[type] = [foodItem]
                } else {
                    state.menu[type].push(foodItem)
                }

                state.foodUnderUpdation = foodItem.name
            })
            .addCase(updateFoodItem.rejected, (state, action) => {

            })

            .addCase(updateType.pending, (state, action) => {
                state.typeUnderUpdation = 'loading'
            })
            .addCase(updateType.fulfilled, (state, action) => {
                const {oldType, newType} = action.payload
                state.menu[newType] = state.menu[oldType]
                delete state.menu[oldType]
                state.typeUnderUpdation = oldType
            })
            .addCase(updateType.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

    }
})

export default menuSlice.reducer

export const selectMenu = state => state.menu.menu
export const selectTypes = state => Object.keys(state.menu.menu)
export const selectStatus = state => state.menu.status
export const selectTypeUnderDeletion = state => state.menu.typeUnderDeletion
export const selectTypeUnderUpdation = state => state.menu.typeUnderUpdation
export const selectFoodAdditionStatus = state => state.menu.foodUnderAddition
export const selectFoodUnderUpdation = state => state.menu.foodUnderUpdation
