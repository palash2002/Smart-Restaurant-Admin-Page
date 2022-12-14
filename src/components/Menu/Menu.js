import AccordionMenu from '../Accordion Components/AccordionMenu';
import "./Menu.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchMenu, selectStatus} from "../../features/menu/menuSlice";
import {useEffect} from "react";
import AddFood from "../Food Addition/AddFood";
import {Spinner} from "@chakra-ui/react";

export default function Menu() {
    const dispatch = useDispatch()

    const menuStatus = useSelector(selectStatus)

    useEffect(() => {
        if (menuStatus === 'idle') {
            dispatch(fetchMenu())
        }
    }, [menuStatus, dispatch])

    return (
        <div className='page-container'>
            {menuStatus === 'loading' ? <Spinner/> :
                <div>
                    <AccordionMenu/>
                    <AddFood/>
                </div>
            }
        </div>
    );
}