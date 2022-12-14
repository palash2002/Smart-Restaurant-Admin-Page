import React from 'react';
import {Accordion} from '@chakra-ui/react'
import AccordionType from './AccordionType';
import {useSelector} from "react-redux";
import {selectTypes} from "../../features/menu/menuSlice";
import {nanoid} from "nanoid";


export default function AccordionMenu() {

    const types = useSelector(selectTypes)

    const accordionMenu =
        <Accordion defaultIndex={[]} allowMultiple>
            {types.map((type, index) => (
                <AccordionType
                    key={nanoid()}
                    type={type}
                    index={index}
                />
            ))}
        </Accordion>


    return (
        <div className="accordion-menu">
            {accordionMenu}
        </div>
    );
}