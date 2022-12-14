import React, {useState} from 'react';
import {
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Spinner,
    useDisclosure
} from '@chakra-ui/react';
import {DeleteIcon} from '@chakra-ui/icons';
import {deleteType, selectMenu} from "../../features/menu/menuSlice";
import {useDispatch, useSelector} from "react-redux";
import FoodItem from "./FoodItem";
import {AlertDialogForModifications} from "./AlertDialogForModifications";
import EditableType from "./EditableType";


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

    return (
        <>
            {deleting ? <Spinner/> :
                <AccordionItem className='accordion-Item' id={type}>
                    <div className='type-heading'>

                        <Box margin={2}>
                            <AccordionButton>
                                <EditableType type={type}/>
                                <AccordionIcon/>
                            </AccordionButton>
                            <DeleteIcon onClick={onOpen}/>

                            <AlertDialogForModifications
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                                cancelRef={cancelRef}
                                message={`Delete ${type}`}
                                alertFunction={removeType}
                                type={'Delete'}
                            />
                        </Box>
                    </div>


                    <AccordionPanel pb={4}>
                        {foodItems.map(food => (
                            <FoodItem
                                id={food.id}
                                name={food.name}
                                description={food.description}
                                price={food.price}
                                veg={food.veg}
                                type={type}
                                key={food.id}
                                image={food.image}
                                deleteType={foodItems.length === 1 ? removeType : null}
                            />
                        ))}
                    </AccordionPanel>
                </AccordionItem>
            }
        </>
    )
}

export default AccordionType