import { Avatar, Button, Form, Input, Modal, Popover, Upload } from "antd";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGE from "../../../contact";
import { UserContext } from "../../../container/useContext";
import ImgCrop from 'antd-img-crop';

const HeaderRegister = () => {
    const { user, fetchSignOut } = useContext(UserContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const onVisibleChange = (newOpen) => {
        setOpen(newOpen);
    };

    const handleOk = () => {
    setIsModalOpen(false);
    };

    const handleCancel = () => {
    setIsModalOpen(false);
    };

    const userMenuOptions = (
        <ul className="gx-user-popover">
          <li onClick={() => {
            setIsModalOpen(true)
          }}>My Account</li>
          <li onClick={() => {
            navigate('/abate')
          }}>Lịch sử mua hàng</li>
          <li onClick={() => {
            fetchSignOut();
            navigate('/signin')
          }}>Logout</li>
        </ul>
    );
    
    return (
        <div className="header-register">
            <div className="container header-user-cont">
                <div className={user ? "header-users" : "header-register"}>
                    {user ?
                        <>
                            <Popover onVisibleChange={onVisibleChange} placement="bottom" content={userMenuOptions} trigger="click" visible={open}>
                                <Avatar
                                    src={IMAGE.user || 'https://via.placeholder.com/150'}
                                    className="gx-size-40 gx-pointer gx-mr-3"
                                    alt=""
                                />
                                <span className="gx-avatar-name">
                                    {user.email}
                                    <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
                                </span>
                            </Popover>
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
            <Modal 
                title="Thông tin người dùng" 
                open={isModalOpen} 
                closable={true} 
                onOk={handleOk} 
                onCancel={handleCancel}
            >
                phong
            </Modal>
        </div>

    )
}

export default HeaderRegister;
