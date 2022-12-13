import React, {useState} from 'react'
import "./AddItems.css"
import {
    Button,
    Center,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import {AddIcon} from '@chakra-ui/icons'

export default function AddItems({types}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    // const types = useSelector(selectTypes())
    const [newFoodDetails, setNewFoodDetails] = useState(() => {
    })
    const [newType, setNewType] = useState(() => '')
    console.log(newFoodDetails)
    const handleChange = (index, value) => {
        if (index === 1) {
            setNewFoodDetails(oldDetails => ({
                ...oldDetails,
                name: value
            }))
        } else if (index === 2) {
            setNewFoodDetails(oldDetails => ({
                ...oldDetails,
                price: value
            }))
        } else if (index === 3) {
            setNewFoodDetails(oldDetails => ({
                ...oldDetails,
                type: value
            }))
        }
    }

    return (
        <div className='additems-outer'>
            <Button rightIcon={<AddIcon/>} colorScheme='teal' variant='outline' onClick={onOpen}>
                Add Item
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Center>Add Item</Center>
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Stack direction="row" display="flex" justifyContent="center" width="100%">
                            {/* <input type="file" /> */}
                            <Stack direction="column">
                                <Stack direction="row" display="flex" alignItems="center">
                                    <Text width="30%">Name : </Text>
                                    <Input width="70%" onChange={({target}) => handleChange(1, target.value)}/>
                                </Stack>
                                <Stack direction="row" display="flex" alignItems="center">
                                    <Text width="30%">Price : </Text>
                                    <Input width="70%" onChange={({target}) => handleChange(2, target.value)}/>
                                </Stack>
                                <Stack direction="row" display="flex" alignItems="center" onChange={({target}) => {
                                    handleChange(3, target.value)
                                }}>
                                    <Text width="30%">Type : </Text>
                                    <Select placeholder='Select option' width="70%">
                                        {
                                            types.map(type =>
                                                <option value={type}>{type.toUpperCase()}</option>
                                            )
                                        }
                                        <option value='new'>New Type</option>
                                    </Select>
                                </Stack>
                                {
                                    newFoodDetails && newFoodDetails.type === 'new' &&
                                    <Stack direction="row" display="flex" alignItems="center">
                                        <Text width="30%">New Type : </Text>
                                        <Input width="70%" onChange={({target}) => setNewType(target.value)}/>
                                    </Stack>
                                }
                            </Stack>


                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            <Center>
                                Add Item
                            </Center>
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </div>
    )
}
