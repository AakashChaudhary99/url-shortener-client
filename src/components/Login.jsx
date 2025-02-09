import { useGoogleLogin } from '@react-oauth/google';
import React, { useRef, useState } from 'react'
import './login.css'
import { useAppContext } from '../context/AppContext';
const apiUrl = import.meta.env.VITE_BACKEND_URL
import GoogleLogo from '../assets/googlelogo.jpeg'
import axios from 'axios';

const Login = ({setShowLogin,setUserToken}) => {
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email = useRef("")
    let password = useRef("")
    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUserToken(codeResponse)
            setShowLogin(false)
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const isValidEmail = (email) => {
        return emailRegex.test(email)
    }

    const handleEmailChange = (e) => {
        email.current.value = e.target.value
    }

    const handlePasswordChange = (e) => {
        password.current.value = e.target.value
    }

    const resetError = () =>{
        if(emailError){
            setEmailError("")
        }
        if(passwordError){
            setPasswordError("")
        }
    }

    const emailAndPasswordValidation = () =>{
        let isValid = true
        if(!email.current.value || ! password.current.value){
            if(!email.current.value){
                setEmailError("Please enter your email address")
            }
            else{
                setPasswordError("Please enter your password")
            }
            isValid= false
        }

        if(!isValidEmail(email.current.value)){
            setEmailError("Please enter a valid email address")
            isValid = false
        }

        return isValid
    }

    const handleSubmit = async() => {

        resetError()
        if(!emailAndPasswordValidation){
            return
        }
        const body = {
            email: email.current.value,
            password: password.current.value,
            googleAuth: false
        }
        const response = await axios.post(`${apiUrl}/signup`, body)


        
    }

  return (
    <div className='login-page'>
        <h1>Create your account</h1>
        <button className='google-login' onClick={login}><img src={GoogleLogo}/>Continue with Google</button>
        <span>OR</span>
        <form>
            <label>Email</label>
            <input ref={email} onChange={handleEmailChange}/>
            <label>Password</label>
            <input ref={password} onChange={handlePasswordChange}/>
            <button className='login-submit'>Create your link</button>
        </form>
    </div>
  )
}

export default Login