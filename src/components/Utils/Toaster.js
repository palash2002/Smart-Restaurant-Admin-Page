import React, {useEffect} from 'react'
import {useSelector} from "react-redux";
import {
    selectFoodAdditionStatus,
    selectFoodUnderUpdation,
    selectTypeUnderDeletion,
    selectTypeUnderUpdation
} from "../../features/menu/menuSlice";
import {useToast} from "@chakra-ui/react";

const Toaster = () => {
    const currentTypeUnderDeletion = useSelector(selectTypeUnderDeletion)
    const currentTypeUnderUpdation = useSelector(selectTypeUnderUpdation)
    const foodAdded = useSelector(selectFoodAdditionStatus)
    const foodUpdated = useSelector(selectFoodUnderUpdation)

    const toast = useToast()

    useEffect(() => {
        if (currentTypeUnderDeletion !== 'idle' && currentTypeUnderDeletion !== 'loading') {
            toast({
                title: `Deleted ${currentTypeUnderDeletion}.`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [currentTypeUnderDeletion, toast])

    useEffect(() => {
        if (currentTypeUnderUpdation !== 'idle' && currentTypeUnderUpdation !== 'loading') {
            toast({
                title: `Updated ${currentTypeUnderUpdation}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [currentTypeUnderUpdation, toast])

    useEffect(() => {
        if (foodAdded !== 'idle' && foodAdded !== 'loading') {
            toast({
                title: `Added ${foodAdded}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [foodAdded, toast])

    useEffect(() => {
        if (foodUpdated !== 'idle' && foodUpdated !== 'loading') {
            toast({
                title: `Updated ${foodUpdated}`,
                status: 'success',
                duration: 2000,
                isClosable: true,
            })
        }
    }, [foodUpdated, toast])
    
    return (
        <div></div>
    )
}

export default Toaster