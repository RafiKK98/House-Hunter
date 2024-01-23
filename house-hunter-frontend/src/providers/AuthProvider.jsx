import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { createContext } from "react"
import useSessionStorage from "../hooks/useSessionStorage";

export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {

    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading
    }

    return (
        <AuthContext.Provider value={authInfo}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider