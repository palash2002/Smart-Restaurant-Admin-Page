import React, {useState} from 'react'
import {Button, Input} from "@chakra-ui/react";
import './login-form.css'

const LoginForm = () => {

    const [details, setDetails] = useState(() => ({
        user_id: '',
        password: ''
    }))

    const setUserId = ({target}) => {
        setDetails(oldDetails => ({
            ...oldDetails,
            user_id: target.value
        }))
    }

    const setPassword = ({target}) => {
        setDetails(oldDetails => ({
            ...oldDetails,
            password: target.value
        }))
    }

    const login = () => {
        // your code here
    }

    return (
        <div className='login-form'>
            <div className='form-wrapper'>
                <Input onChange={setUserId} placeholder='Username' className='username-field'/>
                <Input type='password' onChange={setPassword} placeholder='Password' className='password-field'/>
                <Button onClick={login}>Log In</Button>
            </div>
        </div>
    )
}

export default LoginForm