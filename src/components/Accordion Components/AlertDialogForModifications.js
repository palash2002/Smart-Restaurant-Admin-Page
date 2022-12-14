import React from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";

export const AlertDialogForModifications = ({isOpen, onOpen, onClose, cancelRef, message, alertFunction, type}) => {

    return (
        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {message}
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                            onClose();
                            alertFunction()
                        }} ml={3}>
                            {type}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}