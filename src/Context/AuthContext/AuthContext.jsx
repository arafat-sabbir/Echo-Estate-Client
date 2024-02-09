import {
    GoogleAuthContext,
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
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../../Hooks/AxiosPublic/useAxiosPublic";

export const Context = createContext("");

const AuthContext = ({ children }) => {
    const axiosPublic = useAxiosPublic();
    const [user, setUser] = useState("");
    const [loader, setLoader] = useState(true);
    const auth = getAuth(app);

    const googleProvider = new GoogleAuthContext();

    const signWithGoogle = () => {
        setLoader(true);
        return signInWithPopup(auth, googleProvider);
    };

    const signUpUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (name, photoUrl) => {
        setLoader(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoUrl,
        });
    };
    const signInUser = (email, password) => {
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signOutUser = () => {
        return signOut(auth);
    };

    const contextValue = {
        signUpUser,
        signInUser,
        signWithGoogle,
        user,
        loader,
        signOutUser,
        updateUserProfile,
    };
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
        return () => unsubscribe();
    }, [auth, axiosPublic]);
    return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AuthContext;

AuthContext.propTypes = {
    children: PropTypes.node,
};
