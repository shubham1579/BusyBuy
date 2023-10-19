import { createContext, useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const authContext = createContext();

function useAuth(){
    const value = useContext(authContext);
    return value;
}

const AuthContextProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loggedOut, setLoggedOut] = useState(false);
    const [signIn, setSignIn] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user){
                setUserId(user.uid);
                setIsAuthenticated(true);
            }
            else{
                setIsAuthenticated(false);
            }
        })
    }, []);

    const handleLogOut = () => {
        
        signOut(auth)
        .then(() => {
            setIsAuthenticated(false);
            setLoggedOut(true);
        })
        .catch((err) => {
            console.log(err);
        })

        toast("Sign out successful");
    }

    return (
        <authContext.Provider value={{ isAuthenticated, handleLogOut, userId, setIsAuthenticated, ToastContainer, loggedOut, setLoggedOut, signIn, setSignIn }}>
            {children}
        </authContext.Provider>
    )

}

export { useAuth, AuthContextProvider }