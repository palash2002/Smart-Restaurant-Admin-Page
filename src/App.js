import './App.css';
import React from 'react'
import Menu from './components/Menu/Menu';
import {ChakraProvider} from '@chakra-ui/react';
import {Test} from "./Test";


function App() {
    console.log(process.env.REACT_APP_SERVER_URL)

    return (
        <ChakraProvider>
            <div className="App">
                <Menu/>
                <Test/>
            </div>

        </ChakraProvider>

    );
}

export default App;
