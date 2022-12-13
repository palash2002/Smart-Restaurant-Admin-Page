import AccordionMenu from '../Accordion Components/AccordionMenu';
import "./Menu.css";
import {useDispatch, useSelector} from "react-redux";
import {fetchMenu} from "../../features/menu/menuSlice";
import {useEffect} from "react";
import AddFood from "../Food Addition/AddFood";

export default function Menu() {
    const dispatch = useDispatch()

    const menuStatus = useSelector(state => state.menu.status)

    useEffect(() => {
        if (menuStatus === 'idle') {
            dispatch(fetchMenu())
        }
    }, [menuStatus, dispatch])

    return (
        <div className='page-container'>
            <div>
                <AccordionMenu/>
                <AddFood/>
            </div>
        </div>
    );
}