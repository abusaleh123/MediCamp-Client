import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import React from "react";

export const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const {axiosPublic} = useAxiosPublic();
    const provider = new GoogleAuthProvider();
    const [open, setOpen] = React.useState(false);
    const [theme, setTheme] = useState("light")




    useEffect(() => {
     if (theme === "dark") {
         document.documentElement.classList.add("dark");
     } else {
         document.documentElement.classList.remove("dark");
     }
 }, [theme]);
 
 const toggleTheme = () => {
     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
 };
    

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


    const signInWithGoogle = ( ) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
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
    signInWithGoogle,
    open,
    setOpen,
    theme,
    toggleTheme
  
    
}


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;