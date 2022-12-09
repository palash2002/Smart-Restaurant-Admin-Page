import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box, Stack
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import AccordionType from './AccordionType';

import AddItems from './AddItems/AddItems.js';

export default function AccordionMenu({ types }) {

    const [typeList, setTypeList] = useState(types)
    console.log(typeList)
    const deleteType = (typeName) => {
        const newTypeList = typeList.filter((t) => (t != typeName))
        setTypeList([...newTypeList])
        console.log(newTypeList)
    }

    const accordionMenu =
        <Accordion defaultIndex={[]} allowMultiple>
            {typeList.map((type, index) => (
                <>
                    <Stack direction="row" display="flex" width="100%" justifyContent="center" alignItems="center">
                        <AccordionType
                            key={nanoid()}
                            type={type}
                            index={index}
                            setTypeList={setTypeList}
                        />
                        <DeleteIcon onClick={() => deleteType(type)} />
                    </Stack>

                    {/* <EditIcon onClick={() =>} */}
                </>
            ))}
        </Accordion>


    return (
        <div className="accordion-menu">
            {accordionMenu}
            <AddItems
                types={typeList}
            />
        </div>
    );
}