import React, {useRef, useState} from 'react'
import {
    Box,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    IconButton,
    Input,
    useDisclosure,
    useEditableControls,
    useToast
} from "@chakra-ui/react";
import {CheckIcon, CloseIcon, EditIcon} from "@chakra-ui/icons";
import {AlertDialogForModifications} from "./AlertDialogForModifications";
import {updateType} from "../../features/menu/menuSlice";
import {useDispatch} from "react-redux";

const EditableType = ({type}) => {

    const [currentType, setCurrentType] = useState(() => type)
    const [isEditingInput, setIsEditingInput] = useState(false)

    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = useRef()

    const toast = useToast()
    const dispatch = useDispatch()
    const handleChange = ({target}) => setCurrentType(target.value)

    const confirmChange = () => {
        if (type === currentType) {
            toast({
                title: 'Please change the name first',
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        } else {
            dispatch(updateType({
                oldType: type,
                newType: currentType
            }))
        }
    }

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
                <IconButton icon={<CheckIcon onClick={onOpen}/>} {...getSubmitButtonProps()} />
                <IconButton icon={<CloseIcon/>} {...getCancelButtonProps()} />
            </ButtonGroup>

        ) : (

            <IconButton size='sm' icon={<EditIcon/>} {...getEditButtonProps()} />

        )
    }

    return (
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
            <AlertDialogForModifications
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                cancelRef={cancelRef}
                message={`Update ${type}`}
                alertFunction={confirmChange}
                type={'Update'}
            />
        </Box>
    )
}

export default EditableType