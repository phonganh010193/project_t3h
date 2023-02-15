import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const fetchStart = () => {
        setIsLoadingUser(true);
    };

    const fetchSuccess = () => {
        setIsLoadingUser(false);
    };

    const fetchError = (error) => {
        setIsLoadingUser(false);
        console.log(error)
    };
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const fetchUser = async (values) => {
        fetchStart();
        try {
            const user = await signInWithEmailAndPassword(auth, values.username, values.password);
            fetchSuccess();
            setUser(user.user);
        } catch (error) {
            fetchError(error)
            toast.error('Tên đăng nhập hoặc mật khẩu không đúng')
        }
    }
    const fetchSignOut = async () => {
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
        isLoadingUser,
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
