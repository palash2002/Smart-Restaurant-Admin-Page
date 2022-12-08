import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    IconButton,
    ButtonGroup,
    Input
} from '@chakra-ui/react';
import { EditIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Editable,
    EditableInput,
    EditableTextarea,
    EditablePreview,
    useEditableControls
    } from '@chakra-ui/react'



const AccordionType = ({ type, index, setTypeList }) => {

    // const menu = useSelector(state => state.menu.menu)
    // const [currentlySelected, setCurrentlySelected] = React.useState('')
    // const dispatch = useDispatch()
    // // const [isActive, setIsActive] = useState(false);

    // const handleTypeClick = (type) => {
    //     if (!menu[type]) {
    //         setCurrentlySelected(type)
    //     }
    //     // setIsActive(current => !current);
    // }

    // useEffect(() => {
    //     currentlySelected && dispatch(addMenuItems(currentlySelected))
    // }, [currentlySelected])
    // console.log(type);
    
    const [currentType, setCurrentType] = React.useState(()=>type)

    const confirmChange = () => {
        console.log(currentType)
        setTypeList(oldList=>(
            [
                ...oldList.slice(0, index),
                currentType,
                ...oldList.slice(index+1)
            ]
        ))
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
                <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
            </ButtonGroup>
            
        ) : (
            
            <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />

        )
    }


    const handleChange = ({target}) =>{

        setCurrentType(target.value)
    }

    return (
        <>
            <AccordionItem className='accordion-Item' id={type} >
                <h2 className='type-heading'>
                    {/* <IconButton aria-label='Search database' icon={<DeleteIcon />} onClick={deleteType}/> */}
                    {/* <button className="deleteType" onClick={deleteType}><DeleteIcon/></button> */}
                    <Box margin={2}>
                        <AccordionButton>
                            <Box className='type-title' flex='1' textAlign='left' fontSize={"larger"} fontWeight={"bold"}>
                            <Editable
                                textAlign='center'
                                // defaultValue={type}
                                fontSize='2xl'
                                isPreviewFocusable={false}
                                className='editableInput'
                                onClick={(e) => {e.stopPropagation()}}
                                value={isEditingInput ? currentType : type}
                            >
                                <EditablePreview />
                                {/* Here is the custom input */}
                                <Input
                                    as={EditableInput} 
                                    onChange={handleChange}
                                />
                                <EditableControls />
                            </Editable>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </Box>
                </h2>


                <AccordionPanel pb={4}>
                    <div>
                        Dummy
                    </div>
                    <div>
                        Dummy
                    </div>
                    <div>
                        Dummy
                    </div>
                    <div>
                        Dummy
                    </div>
                </AccordionPanel>
            </AccordionItem>
        </>
    )
}

export default AccordionType