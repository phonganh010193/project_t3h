import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { auth } from '../../firebase';
import 'react-toastify/dist/ReactToastify.css';
import { Spin } from "antd";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    });

    const fetchUser = async (values) => {
        try {
            const user = await signInWithEmailAndPassword(auth, values.username, values.password);
            setUser(user.user);
        } catch (error) {
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
