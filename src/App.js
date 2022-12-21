import './App.css';
import React from 'react'
import Menu from './components/Menu/Menu';
import {ChakraProvider} from '@chakra-ui/react';
import {Test} from "./Test";
import Toaster from "./components/Utils/Toaster";
import Header from "./components/Header and Footer/Header";
import Footer from "./components/Header and Footer/Footer";
import LoginForm from "./components/Login Form/LoginForm";


function App() {
    console.log(process.env.REACT_APP_SERVER_URL)

    return (
        <ChakraProvider>
            <div className="App">
                {/*<Header/>*/}
                {/*<Menu/>*/}
                {/*<Test/>*/}
                {/*<Toaster/>*/}
                {/*<Footer/>*/}
                <LoginForm/>
            </div>

        </ChakraProvider>

    );
}

export default App;
