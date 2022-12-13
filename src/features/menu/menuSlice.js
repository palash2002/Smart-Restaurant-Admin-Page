import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import foodCard from "../../components/Accordion Components/FoodCard";

const server_url = process.env.REACT_APP_SERVER_URL

const initialState = {
    menu: {},
    menuTypes: [],
    status: 'idle',
    error: null,
    foodUnderAddition: 'idle',
    foodUnderUpdation: 'idle'
}

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    try {
        const res = await fetch(`${server_url}/admin/get-all-foods`)
        return res.json()
    } catch (err) {
        return err
    }
})

export const deleteType = createAsyncThunk('menu/deleteType', async (type, {dispatch}) => {
    try {
        await fetch(`${server_url}/admin/remove-type`, {
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

export const deleteFoodItem = createAsyncThunk('menu/deleteFoodItem', async ({type, referenceId}) => {
    try {
        console.log(type, referenceId)
        await fetch(`${server_url}/admin/remove-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({referenceId})
        })
        return [type, referenceId]
    } catch (err) {
        return err
    }
})

export const addFoodItem = createAsyncThunk('menu/addFoodItem', async (foodItem) => {
    try {
        const rawResponse = await fetch(`${server_url}/admin/add-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem)
        })
        const {_id} = await rawResponse.json()
        return {
            ...foodItem,
            _id
        }
    } catch (err) {
        return err
    }
})

export const updateFoodItem = createAsyncThunk('menu/updateFoodItem', async ({foodItem, oldType}) => {
    try {
        console.log(foodItem)
        await fetch(`${server_url}/admin/update-item`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(foodItem)
        })
        console.log(oldType)
        const {imgUrl, id} = foodItem
        delete foodItem.imgUrl
        delete foodItem.id

        foodItem.image = imgUrl
        foodItem._id = id

        return {newType: foodItem.type, id: foodItem._id, oldType, foodItem}
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.menu = action.payload
                state.menuTypes = Object.keys(action.payload)
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })

            .addCase(deleteType.pending, (state, action) => {
                state.deletingStatus = 'loading'
            })
            .addCase(deleteType.fulfilled, (state, action) => {
                const type = action.payload
                const typeIndex = state.menuTypes.indexOf(type)
                delete state.menu[type]
                state.menuTypes.splice(typeIndex, 1)
            })
            .addCase(deleteType.rejected, (state, action) => {

            })


            .addCase(deleteFoodItem.pending, (state, action) => {
                state.deletingStatus = 'loading'
            })
            .addCase(deleteFoodItem.fulfilled, (state, action) => {
                const [type, id] = action.payload
                const foodIndex = state.menu[type].findIndex(item => item._id === id)
                state.menu[type].splice(foodIndex, 1)
            })
            .addCase(deleteFoodItem.rejected, (state, action) => {

            })


            .addCase(addFoodItem.pending, (state, action) => {
                state.foodUnderAddition = 'loading'
            })
            .addCase(addFoodItem.fulfilled, (state, action) => {
                const foodItem = action.payload
                console.log(foodItem)
                const {type} = foodItem

                if (!state.menu[type]) {
                    state.menu[type] = [foodItem]
                    state.menuTypes.push(type)
                } else {
                    state.menu[type].push(foodItem)
                }

                state.foodUnderAddition = 'added'
                state.foodUnderAddition = 'idle'
            })
            .addCase(addFoodItem.rejected, (state, action) => {

            })

            .addCase(updateFoodItem.pending, (state, action) => {
                state.foodUnderUpdation = 'loading'
            })
            .addCase(updateFoodItem.fulfilled, (state, action) => {
                const {newType, oldType, id, foodItem} = action.payload
                console.log(newType, oldType, id)
                const foodIndexInOldType = state.menu[oldType].findIndex(food => food._id === id)

                state.menu[oldType].splice(foodIndexInOldType, 1)
                if (state.menu[oldType].length === 0) {
                    const oldIndex = state.menuTypes.findIndex(type => type === oldType)
                    state.menuTypes.splice(oldIndex, 1)
                    delete state.menu[oldType]
                }
                if (!state.menu[newType]) {
                    state.menuTypes.push(newType)
                    state.menu[newType] = [foodItem]
                } else {
                    state.menu[newType].push(foodItem)
                }

                state.foodUnderUpdation = 'updated'
                state.foodUnderUpdation = 'idle'
            })
            .addCase(updateFoodItem.rejected, (state, action) => {

            })
    }
})

export default menuSlice.reducer

export const selectMenu = state => state.menu.menu
export const selectTypes = state => state.menu.menuTypes
export const selectTypeUnderDeletion = state => state.menu.typeUnderDeletion
export const selectFoodAdditionStatus = state => state.menu.foodUnderAddition
