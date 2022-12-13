import React from 'react';
import {Accordion} from '@chakra-ui/react'

import AccordionType from './AccordionType';
import {useSelector} from "react-redux";
import {selectTypes, selectTypeUnderDeletion} from "../../features/menu/menuSlice";
import {nanoid} from "nanoid";


export default function AccordionMenu() {


    const types = useSelector(selectTypes)
    const typeUnderDeletion = useSelector(selectTypeUnderDeletion)

    const accordionMenu =
        <Accordion defaultIndex={[]} allowMultiple>
            {types.map((type, index) => (

                <AccordionType
                    key={nanoid()}
                    type={type}
                    index={index}
                    deleteStatus={type === typeUnderDeletion}
                />

            ))}
        </Accordion>


    return (
        <div className="accordion-menu">
            {accordionMenu}
            {/*<AddItems*/}
            {/*    types={types}*/}
            {/*/>*/}
        </div>
    );
}