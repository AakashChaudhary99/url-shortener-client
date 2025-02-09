import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import {GoogleLogin, googleLogout, useGoogleLogin} from '@react-oauth/google'
const apiUrl = import.meta.env.VITE_BACKEND_URL
const googleApi = import.meta.env.VITE_GOOGLE_API
import './homepage.css'
import Login from './Login'
import axios from 'axios'
const Hompage = () => {
    const [userToken, setUserToken] = useState(null)
    const {user, setUser, longurl, setUrl} = useAppContext()
    const [showLogin, setShowLogin] = useState(false)
    let url = useRef("")
    const [error, setError] = useState(false)
    const handleSubmit = (e) => {
        if(e){
            e.preventDefault()
        }
        console.log('insie handlesubmntu')
        console.log('urlllll',longurl)
        if(! url.current.value && !longurl){
            setError(true)
            return
        }
        if(url.current.value){
            setUrl(url.current.value)
        }
        if(!user){
            setShowLogin(true)
        }
        else{
            alert(longurl)
            setUrl(null)
        }

    }

    useEffect(() => {
        console.log("user", userToken)
        const getUserInfo = () => {
            axios.get(`${googleApi}${userToken.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${userToken.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setUser(res.data);
                    })
                    .catch((err) => console.log(err));
        }
        if(userToken){
            getUserInfo()

        }
        console.log("userrr", user)

    },[userToken])


    useEffect(() => {
        console.log('insoide iuseeffecvt')
        if(longurl){
            handleSubmit()
        }
    }, [user])

    const handleInputChange = (e) => {
        console.log(e.target.value)
        if(error){
            setError(false)
            
        }
        url.current.value=e.target.value

    }

    return (
        <div className='form-modal'>
            {
                showLogin?<Login setUserToken={setUserToken} setShowLogin={setShowLogin} />:
                (<div className='form-content'>
                    <p>Shorten a long link</p>
                    <form onSubmit={handleSubmit}>
                        <label>Paste your long link here</label>
                        <input className={error?"input-error":""} ref={url} placeholder='https://example.com/longurl' onChange={handleInputChange} />
                        {error && <span>We'll need a valid URL, like "super-long-link.com/shorten-it"</span>}
                        <button type='submit'>Submit</button>
                    </form>
    
                </div>)
            }
            
            
        </div>
    )
}

export default Hompage