import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";

import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useAxiosPublic from "../../Utility/Hooks/AxiosInstance/useAxiosPublic";
import { app } from "../Firebase/firebase.config";

export const Context = createContext("");

const AuthContext = ({ children }) => {

    // Get the axios Public Instance
    const axiosPublic = useAxiosPublic();

    // Store the currently Logged in User Data
    const [user, setUser] = useState(null);

    // Handle The Loading State 
    const [loader, setLoader] = useState(true);

    // Get The App Configuration From firebase.config.js
    const auth = getAuth(app);

    // Google Auth Provider
    const googleProvider = new GoogleAuthProvider();

    // Handle Google Sign In 
    const signWithGoogle = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Handle Sign Up Using Email And Password
    const signUpUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Update The user Name And PhotoUrl After SignUp
    const updateUserProfile = (name, photoUrl) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        });
    };

    // Sign In Using Email And Password
    const signInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Sign Out User
    const signOutUser = () => {
        return signOut(auth);
    };

    // Make a ContextValue Function To Share All The Function And State
    const contextValue = {
        signUpUser,
        signInUser,
        signWithGoogle,
        user,
        loader,
        signOutUser,
        updateUserProfile,
    };

    // Handle User Sign In Or Out Observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const user = { email: currentUser.email };
                axiosPublic.post("/user/accessToken", user).then((res) => {
                    const token = res.data.token;
                    if (token) {
                        localStorage.setItem("access-token", token);
                        setLoader(false);
                    }
                });
            } else {
                localStorage.removeItem("access-token");
                setLoader(false);
            }
        });
        // CleanUp Function
        return () => unsubscribe();
    }, [auth, axiosPublic]);
    // Return ContextValue To The Children
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthContext;

// Manage The PropTypes Of Children
AuthContext.propTypes = {
    children: PropTypes.node,
};
