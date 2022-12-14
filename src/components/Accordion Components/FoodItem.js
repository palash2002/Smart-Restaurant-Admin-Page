import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {Spinner, useDisclosure} from '@chakra-ui/react';
import {AlertDialogForModifications} from "./AlertDialogForModifications";
import {deleteFoodItem} from "../../features/menu/menuSlice";
import FoodCard from "./FoodCard";

const FoodItem = ({id, name, description, price, veg, type, image, deleteType}) => {

    const dispatch = useDispatch()

    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = React.useRef()

    const [underDeletion, setUnderDeletion] = useState(() => false)

    const deleteFood = () => {
        setUnderDeletion(true)
        if (deleteType) {
            deleteType()
        } else {
            dispatch(deleteFoodItem({
                type,
                id
            }))
        }
    }

    return (
        <div>
            {underDeletion ? <Spinner/> :
                <>
                    <FoodCard
                        id={id}
                        name={name}
                        description={description}
                        price={price}
                        veg={veg}
                        type={type}
                        image={image}
                        alertAction={onOpen}
                    />

                    <AlertDialogForModifications
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        cancelRef={cancelRef}
                        message={`Delete ${name}`}
                        alertFunction={deleteFood}
                        type={'Delete'}
                    />
                </>
            }
        </div>
    )
}

export default FoodItem