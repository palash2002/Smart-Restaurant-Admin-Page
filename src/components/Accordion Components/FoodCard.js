import React, {useState} from 'react'
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Textarea,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import {FoodIcon, ImageIcon, PriceIcon} from "../Icons/Icons";
import {useDispatch, useSelector} from "react-redux";
import {selectTypes, updateFoodItem} from "../../features/menu/menuSlice";


const FoodCard = ({id, name, description, price, veg, type, image, alertAction}) => {

    const toast = useToast()

    const existingTypes = useSelector(selectTypes)
    const dispatch = useDispatch()

    const initialState = {id, name, description, price, veg, type, image}

    const [toUpdate, setUpdate] = useState(() => ({
        ...initialState,
        veg: veg ? 1 : 0,
        type: existingTypes.findIndex(item => item === type),
    }))
    const [newType, setNewType] = useState(() => '')

    const {isOpen, onOpen, onClose} = useDisclosure()

    const setFoodName = ({target}) => {
        setUpdate(oldDetails => ({
            ...oldDetails,
            name: target.value
        }))
    }
    const setFoodPrice = ({target}) => {
        setUpdate(oldDetails => ({
            ...oldDetails,
            price: target.value
        }))
    }

    const setFoodType = ({target}) => {
        setUpdate(oldDetails => ({
            ...oldDetails,
            type: target.value
        }))
    }

    const setFoodVeg = ({target}) => {
        setUpdate(oldDetails => ({
            ...oldDetails,
            veg: target.value
        }))
    }

    const setFoodDescription = ({target}) => {
        setUpdate(oldDetails => ({
            ...oldDetails,
            description: target.value
        }))
    }

    const changeNewType = ({target}) => {
        setNewType(target.value)
    }

    const setFoodUrl = ({target}) => {
        setUpdate(oldDetails => ({
            ...oldDetails,
            image: target.value
        }))
    }

    const updateItem = () => {
        const foodItem = {
            ...toUpdate,
            type: existingTypes[toUpdate.type],
            veg: toUpdate.veg === '1'
        }

        if (toUpdate.type === '-1') {
            foodItem.type = newType
        }

        const didUpdate = JSON.stringify(initialState) !== JSON.stringify(foodItem)
        if (didUpdate) {
            dispatch(updateFoodItem({
                foodItem: foodItem,
                oldType: type
            }))
            onClose()
        } else {
            toast({
                title: 'Please Update the food item first.',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }
    }

    const UpdateElement = (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update {name}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={FoodIcon}
                        />
                        <Input placeholder='Food Name' onChange={setFoodName} value={toUpdate.name}/>
                    </InputGroup>

                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={PriceIcon}
                        />
                        <Input placeholder='Price (in INR)' onChange={setFoodPrice}
                               value={toUpdate.price}/>
                    </InputGroup>

                    <Select value={toUpdate.type} onChange={setFoodType}>
                        <option value={-3}>Select a type</option>
                        {existingTypes.map((type, index) => (
                            <option value={index} key={index}>{type}</option>
                        ))}
                        <option value={-1}>Create a new type</option>
                    </Select>
                    <Input
                        value={newType}
                        disabled={toUpdate.type === '-1' ? '' : 'disabled'}
                        onChange={changeNewType}
                        placeholder={'New type\'s name'}
                    />
                    <Select value={toUpdate.veg} onChange={setFoodVeg}>
                        <option value={-1}>Vegetarian?</option>
                        <option value={1}>Yes</option>
                        <option value={0}>No</option>
                    </Select>

                    <Textarea placeholder={'About the food item...'} value={toUpdate.description}
                              onChange={setFoodDescription}/>

                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={ImageIcon}
                        />
                        <Input placeholder='Image URL' onChange={setFoodUrl} value={toUpdate.image}/>
                    </InputGroup>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant='ghost' onClick={updateItem}>Update</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )

    return (
        <div className='card'>
            <div className="card-left">
                {/* <img className="veg-or-non-veg" /> */}
                <div className={veg ? "veg" : "non-veg"}>
                    <div className={veg ? "circle-v" : "circle-nv"}></div>
                </div>
                <div className="food-item-name">
                    {name}
                </div>
                <div className="food-item-description">
                    {description}
                </div>
                <div className="food-item-price">
                    {`₹ ${price}`}
                </div>

            </div>
            <div className="card-right">
                <Box alignSelf={"flex-end"} display={'flex'} gap={'30px'}>
                    <EditIcon onClick={onOpen}/>
                    <DeleteIcon onClick={alertAction}/>
                </Box>
                <div className='food-item-image-wrapper' alignSelf={"flex-end"}>
                    <img className='food-item-image' src={image} alt={`${name}'s image`}/>
                </div>
            </div>
            {UpdateElement}

        </div>
    )
}

export default FoodCard