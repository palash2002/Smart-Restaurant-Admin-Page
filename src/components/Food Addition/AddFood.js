import React, {useState} from 'react'
import {
    Button,
    Center,
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
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'
import {useDispatch, useSelector} from "react-redux";
import {addFoodItem, selectFoodAdditionStatus, selectTypes} from "../../features/menu/menuSlice";
import {FoodIcon, ImageIcon, PriceIcon} from "../Icons/Icons";

const AddFood = () => {

    const dispatch = useDispatch()

    const existingTypes = useSelector(selectTypes)
    const foodAdditonStatus = useSelector(selectFoodAdditionStatus)

    const [newFoodDetails, setNewFoodDetails] = useState(() => ({
        name: '',
        price: '',
        type: '-3',
        veg: '-1',
        description: '',
        image: ''
    }))
    const [newType, setNewType] = useState(() => '')


    const addFood = () => {
        const foodItem = {
            ...newFoodDetails,
            type: existingTypes[newFoodDetails.type],
            veg: newFoodDetails.veg === '1'
        }
        const {type} = newFoodDetails
        if (type === '-1') {
            foodItem.type = newType
        }
        setNewFoodDetails({
            name: '',
            price: '',
            type: '-3',
            veg: '-1',
            description: '',
            image: ''
        })
        setNewType('')
        dispatch(addFoodItem(foodItem))
        onClose()
    }

    const setFoodName = ({target}) => {
        setNewFoodDetails(oldDetails => ({
            ...oldDetails,
            name: target.value
        }))
    }
    const setFoodPrice = ({target}) => {
        setNewFoodDetails(oldDetails => ({
            ...oldDetails,
            price: target.value
        }))
    }

    const setFoodType = ({target}) => {
        setNewFoodDetails(oldDetails => ({
            ...oldDetails,
            type: target.value
        }))
    }

    const setFoodVeg = ({target}) => {
        setNewFoodDetails(oldDetails => ({
            ...oldDetails,
            veg: target.value
        }))
    }

    const setFoodDescription = ({target}) => {
        setNewFoodDetails(oldDetails => ({
            ...oldDetails,
            description: target.value
        }))
    }

    const changeNewType = ({target}) => {
        setNewType(target.value)
    }

    const setFoodUrl = ({target}) => {
        setNewFoodDetails(oldDetails => ({
            ...oldDetails,
            image: target.value
        }))
    }

    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <div>
            <Button rightIcon={<AddIcon/>} colorScheme='teal' variant='outline' onClick={onOpen}>
                Add a New Food Item
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Center>Add a New Food Item</Center>
                    </ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody display={'flex'} flexDirection={'column'} gap={'10px'}>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={FoodIcon}
                            />
                            <Input placeholder='Food Name' onChange={setFoodName} value={newFoodDetails.name}/>
                        </InputGroup>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={PriceIcon}
                            />
                            <Input placeholder='Price (in INR)' onChange={setFoodPrice}
                                   value={newFoodDetails.price}/>
                        </InputGroup>

                        <Select onChange={setFoodType} value={newFoodDetails.type}>
                            <option value={-3}>Select a type</option>
                            {existingTypes.map((type, index) => (
                                <option value={index} key={index}>{type}</option>
                            ))}
                            <option value={-1}>Create a new type</option>
                        </Select>
                        <Input
                            value={newType}
                            disabled={newFoodDetails.type === '-1' ? '' : 'disabled'}
                            onChange={changeNewType}
                            placeholder={'New type\'s name'}
                        />
                        <Select value={newFoodDetails.veg} onChange={setFoodVeg}>
                            <option value={-1}>Vegetarian?</option>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </Select>

                        <Textarea placeholder={'About the food item...'} value={newFoodDetails.description}
                                  onChange={setFoodDescription}/>

                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={ImageIcon}
                            />
                            <Input placeholder='Image URL' onChange={setFoodUrl}
                                   value={newFoodDetails.image}/>
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter justifyContent={'center'}>
                        <Button colorScheme='blue' onClick={addFood}>
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </div>
    )
}

export default AddFood