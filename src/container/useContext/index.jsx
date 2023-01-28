import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { auth } from '../../firebase';

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    
    const[user, setUser] = useState(null);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const fetchUser = async(values) => {
        try {
        const user = await signInWithEmailAndPassword(auth, values.username, values.password);
        console.log('user', user.user);
        setUser(user.user);
        } catch (error) {
        console.log(error.message);
        }
    }
    const fetchSignOut = async() => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log('logout success')
        }).catch((error) => {
        // An error happened.
        console.log(error)
        });
    }
    const value = {
        user,
        fetchUser,
        fetchSignOut
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
