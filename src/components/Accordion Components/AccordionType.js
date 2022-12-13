import React, {useState} from 'react';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    IconButton,
    Input,
    Spinner,
    useDisclosure,
    useEditableControls
} from '@chakra-ui/react';
import {CheckIcon, CloseIcon, DeleteIcon, EditIcon} from '@chakra-ui/icons';
import {deleteType, selectMenu} from "../../features/menu/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import FoodItem from "./FoodItem";
import {AlertDialogForDeletion} from "./AlertDialogForDeletion";


const AccordionType = ({type, index}) => {
    const [currentType, setCurrentType] = useState(() => type)
    const [deleting, setDeleting] = useState(() => false)
    const foodItems = useSelector(state => selectMenu(state)[type])
    const dispatch = useDispatch()
    const removeType = () => {
        setDeleting(true)
        dispatch(deleteType(type))
    }


    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = React.useRef()

    // const alertDialog = (
    //     <>
    //         <AlertDialog
    //             isOpen={isOpen}
    //             leastDestructiveRef={cancelRef}
    //             onClose={onClose}
    //         >
    //             <AlertDialogOverlay>
    //                 <AlertDialogContent>
    //                     <AlertDialogHeader fontSize='lg' fontWeight='bold'>
    //                         Delete {type}
    //                     </AlertDialogHeader>
    //
    //                     <AlertDialogBody>
    //                         Are you sure? You can't undo this action afterwards.
    //                     </AlertDialogBody>
    //
    //                     <AlertDialogFooter>
    //                         <Button ref={cancelRef} onClick={onClose}>
    //                             Cancel
    //                         </Button>
    //                         <Button colorScheme='red' onClick={() => {
    //                             onClose();
    //                             removeType()
    //                         }} ml={3}>
    //                             Delete
    //                         </Button>
    //                     </AlertDialogFooter>
    //                 </AlertDialogContent>
    //             </AlertDialogOverlay>
    //         </AlertDialog>
    //     </>
    // )


    const handleChange = ({target}) => setCurrentType(target.value)
    const confirmChange = ({target}) => {
        console.log(currentType)
        // setTypeList(oldList => (
        //     [
        //         ...oldList.slice(0, index),
        //         currentType,
        //         ...oldList.slice(index + 1)
        //     ]
        // ))
    }

    const [isEditingInput, setIsEditingInput] = useState(false)

    function EditableControls() {

        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        setIsEditingInput(isEditing)

        return isEditing ? (
            <ButtonGroup justifyContent='center' size='sm'>
                <IconButton icon={<CheckIcon onClick={confirmChange}/>} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon/>} {...getCancelButtonProps()} />
            </ButtonGroup>

        ) : (

            <IconButton size='sm' icon={<EditIcon/>} {...getEditButtonProps()} />

        )
    }


    return (
        <>
            {deleting ? <Spinner/> :
                <AccordionItem className='accordion-Item' id={type}>
                    <div className='type-heading'>

                        <Box margin={2}>
                            <AccordionButton>

                                <Box className='type-title' flex='1' textAlign='left' fontSize='larger'
                                     fontWeight='bold'
                                     display='flex' justifyContent='center'>
                                    <Editable
                                        textAlign='center'
                                        defaultValue={type}
                                        fontSize='2xl'
                                        isPreviewFocusable={false}
                                        className='editableInput'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                        }}
                                        value={isEditingInput ? currentType : type}
                                    >
                                        <EditablePreview/>

                                        <Input
                                            as={EditableInput}
                                            onChange={handleChange}
                                        />
                                        <EditableControls/>
                                    </Editable>
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                            <DeleteIcon onClick={onOpen}/>

                            <AlertDialogForDeletion
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                                cancelRef={cancelRef}
                                alertFor={type}
                                remove={removeType}
                            />
                            {/*{alertDialog}*/}
                        </Box>
                    </div>


                    <AccordionPanel pb={4}>
                        {foodItems.map(food => (
                            <FoodItem
                                id={food._id}
                                name={food.name}
                                description={food.description}
                                price={food.price}
                                veg={food.veg}
                                type={type} key={food._id}
                                imgUrl={food.image}
                                deleteType={foodItems.length === 1 ? removeType : null}
                            />
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            }

            {/*<addItems/>*/}

        </>
    )
}

export default AccordionType