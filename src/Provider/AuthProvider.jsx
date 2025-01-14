import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const signUpWithEmailPass = (email, password) => {
        return createUserWithEmailAndPassword(  auth, email, password)
    }


    const profileUpdate = (profileUpdate) => {
      
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
    loading
}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;