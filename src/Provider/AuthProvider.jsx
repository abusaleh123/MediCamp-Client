import { createUserWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const signUpWithEmailPass = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(  auth, email, password)
    }
    const logOut = (auth) => {
        setLoading(true)
        return signOut(auth)
    }

    const profileUpdate = (profileUpdate) => {
      setLoading(true)
        return updateProfile(auth.currentUser, profileUpdate)
}


    useEffect( () => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
           
        })
        return () => {
            unsubscribe()
        }
    }, [])



const authInfo = {
    signUpWithEmailPass,
    user,
    setUser,
    profileUpdate,
    setLoading,
    loading,
    logOut
}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;