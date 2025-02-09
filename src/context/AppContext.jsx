import {createContext, useContext, useState} from 'react'

const appContext = createContext()

export const AppProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [longurl, setUrl] = useState(null)
    return (
        <appContext.Provider value={{user, setUser, longurl, setUrl}}>
            {children}
        </appContext.Provider>
    )
}


export const useAppContext = () => {
    return useContext(appContext)
}