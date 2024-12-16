import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();



// authentication provider
export const AuthProvide = ({children}) => {
    const [currentUser, setCurrentuser] = useState(null);
    const [loading, setLoading] = useState(true);


    // register user
 const registerUser = async (email, password) => {

        return await createUserWithEmailAndPassword(auth, email, password);
    }

    // login user
    const loginUser = async (email, password) => {

        return await signInWithEmailAndPassword(auth, email, password);
    }

    // signup with Google
    const signInwithGoogle = async (email, password) => {

        return await signInWithPopup(auth, googleProvider)
    }

    // logout user
    const logout = () => {
        return signOut(auth)
    }

    // manage user
    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentuser(user);
            setLoading(false);

            if(user) {
                const {email, displayname, photoURL} = user;
                const  userData = {
                    email, username: displayname, 
                    photo: photoURL
                }
            }
        })
        return () => unsubscribe();
    } ,[])


    const value = {
       currentUser,
       loading,
       registerUser,
       loginUser,
       signInwithGoogle,
       logout
    }
    return (
       <AuthContext.Provider value={value}>
        {children}
       </AuthContext.Provider>
    )     
    
}