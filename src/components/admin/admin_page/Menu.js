import AccordionMenu from '../admin_components/AccordionMenu';
import "./Menu.css";


export default function Menu() {

        

    const types = ['indian','chinese', 'arabian', 'mexican']
    return (
        <div className='page-container'>
            <div>     
                <AccordionMenu types={types} />
            </div>
            {/* <Footer /> */}
        </div>
    );
}