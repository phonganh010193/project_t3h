import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import IMAGE from "../../../contact";
import { UserContext } from "../../../container/useContext";
import RunMockData from "../../../mock/runMockData";

const HeaderRegister = () => {
    const { user, fetchSignOut } = useContext(UserContext);
    console.log('user from header register', user);
    const [show, setShow] = useState(false);
    return (
        <div className="header-register">
            <div className="container header-user-cont">
                <div className={user? "header-users" : "header-register"}>
                    {user ?
                    <>
                        <div className="user-name" onClick={() => {
                            setShow(true)
                        }}>
                            <img src={IMAGE.user} alt="" />
                            <span>Phong Anh</span>
                        </div>
                        {show === true &&
                            <div className="logout">
                                <Link to="/signin" onClick={() => {
                                    fetchSignOut();
                                }}>Logout</Link>
                            </div>
                        }
                    </>
                        
                        
                    :
                        <ul>
                            <li>
                                <a href="/signin">Đăng Nhập</a>
                            </li>
                            <li>
                                <a href="/signup">Đăng Ký</a>
                            </li>
                        </ul>
                    }
                </div>
            </div>
        </div>
        
    )
}

export default HeaderRegister;
