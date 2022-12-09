import React, { useState } from 'react'
import "./AddItems.css"
import { Button, ButtonGroup, Input } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure, Text, Center, Stack
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

export default function AddItems() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [newType, setNewType] = useState(0);
    return (
        <div className='additems-outer'>
            <Button rightIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={onOpen}>
                Add Item
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Center>Add Item</Center>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack direction="row" display="flex" justifyContent="space-between" padding="5%" width="100%">
                            {/* <input type="file" /> */}
                            <Text width="50%">Name dcdc: </Text>
                            <Stack direction="column">
                                <Stack direction="row" display="flex" alignItems="center">
                                    <Text width="30%">Name : </Text>
                                    <Input width="70%" />
                                </Stack>
                                <Stack direction="row" display="flex" alignItems="center">
                                    <Text width="30%">Price : </Text>
                                    <Input width="70%" />
                                </Stack>
                                <Stack direction="row" display="flex" alignItems="center">
                                    <Text width="30%">Type : </Text>
                                    <Select placeholder='Select option' width="70%">
                                        <option value='option1' onChange={(e) => setNewType(1)}>New Type</option>
                                        <option value='option2'>Indian</option>
                                        <option value='option3'>Chinese</option>
                                        <option value='option4'>Italian</option>
                                    </Select>
                                </Stack>
                                {
                                    //     newType===1?<Stack direction="row" display="flex" alignItems="center">
                                    //     <Text width="30%">New Type : </Text>
                                    //     <Input width="70%" />
                                    // </Stack>:<label></label>
                                    newType === 1 ? console.log("yes ") : console.log("No")
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
