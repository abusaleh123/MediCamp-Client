import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const {axiosPublic} = useAxiosPublic()
    

    const signUpWithEmailPass = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(  auth, email, password)
    }
    const SignInWithEmailPass = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
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
            if(currentUser){
                const userInfo = {email : currentUser.email}
                    axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if(res.data.token){
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            }else{
                    localStorage.removeItem('access-token')
            }
            setLoading(false)
           
        })
        return () => {
            unsubscribe()
        }
    }, [axiosPublic])



const authInfo = {
    signUpWithEmailPass,
    user,
    setUser,
    profileUpdate,
    setLoading,
    loading,
    logOut,
    SignInWithEmailPass,
  
    
}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;