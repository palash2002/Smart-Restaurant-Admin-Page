import React, {useState} from 'react';
import { nanoid } from 'nanoid';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import AccordionType from './AccordionType';

export default function AccordionMenu({ types }) {

    const [typeList, setTypeList] = useState(types)
    console.log(typeList)
    const deleteType = (typeName) => {
        const newTypeList = typeList.filter((t)=>(t!=typeName))
        setTypeList([...newTypeList])
        console.log(newTypeList)
    }

    const accordionMenu =
        <Accordion defaultIndex={[]} allowMultiple>
            {typeList.map((type, index) => (
                <>
                <DeleteIcon onClick={() => deleteType(type)}/>
                <AccordionType
                    key={nanoid()}
                    type={type}
                    index={index}
                    setTypeList={setTypeList}
                />
                {/* <EditIcon onClick={() =>} */}
                </>
            ))}
        </Accordion>


    return (
        <div className="accordion-menu">
            {accordionMenu}
        </div>
    );
}