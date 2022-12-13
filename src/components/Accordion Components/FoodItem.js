import React, {useState} from 'react'
import {DeleteIcon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {Spinner, useDisclosure} from '@chakra-ui/react';
import {AlertDialogForDeletion} from "./AlertDialogForDeletion";
import {deleteFoodItem} from "../../features/menu/menuSlice";
import FoodCard from "./FoodCard";

const FoodItem = ({id, name, description, price, veg, type, imgUrl, deleteType}) => {

    const dispatch = useDispatch()

    const {isOpen, onOpen, onClose} = useDisclosure()
    const cancelRef = React.useRef()

    const [underDeletion, setUnderDeletion] = useState(() => false)

    const deleteFood = () => {
        setUnderDeletion(true)
        if (deleteType) {
            console.log('deleting type')
            deleteType()
        } else {
            console.log('deleting food')
            dispatch(deleteFoodItem({
                type,
                referenceId: id
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
                        imgUrl={imgUrl}
                        alertAction={onOpen}
                    />

                    <AlertDialogForDeletion
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        cancelRef={cancelRef}
                        alertFor={name}
                        remove={deleteFood}
                    />
                </>
            }
        </div>
    )
}

export default FoodItem