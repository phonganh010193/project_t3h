import { Avatar, Button, Form, Input, Modal, Popover, Upload } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IMAGE from "../../../contact";
import { UserContext } from "../../../container/useContext";
import { useDispatch, useSelector } from "react-redux";

import { usePrevious } from "../../../utils/hooks";
import { fetchUpdateUserItem, fetchUserItem } from "../../../container/userSlice";
import { toast } from "react-toastify";


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
const HeaderRegister = () => {
    const { user, fetchSignOut } = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userCurrent = useSelector(({ user }) => user.userCurrent)
    const isLoading = useSelector(({ user }) => user.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fields, setFields] = useState([])


    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        if (!isLoading && prevIsLoading && userCurrent) {
            setFields([
                {
                    name: ['user', 'name'],
                    value: userCurrent?.name,
                },
                {
                    name: ['user', 'email'],
                    value: userCurrent?.email,
                },
                {
                    name: ['user', 'address'],
                    value: userCurrent?.address,
                },
                {
                    name: ['user', 'phone'],
                    value: userCurrent?.phone,
                },
                {
                    name: ['user', 'avatar'],
                    value: userCurrent?.avatar,
                }
            ])
        }

    }, [userCurrent, isLoading]);

    useEffect(() => {
        if (user) {
            dispatch(fetchUserItem(user))
        }
    }, [user, dispatch])


    const onVisibleChange = (newOpen) => {
        setOpen(newOpen);
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

    const onFinish = async (values) => {
        try {
            await dispatch(fetchUpdateUserItem(values.user))
            await dispatch(fetchUserItem(user))
            toast.success('Cập nhật thông tin người dùng thành công!')
            setIsModalOpen(false)
        } catch (error) {
            toast.error('Cập nhật thông tin người dùng không thành công')
        }
    };

    return (
        <div className="header-register">
            <div className="container header-user-cont">
                <div className={user ? "header-users" : "header-register"}>
                    {user ?
                        <>
                            <Popover onVisibleChange={onVisibleChange} placement="bottom" content={userMenuOptions} trigger="click" open={open}>
                                <Avatar
                                    src={userCurrent?.email === user?.email ? userCurrent?.avatar : IMAGE.user || 'https://via.placeholder.com/150'}
                                    className="gx-size-40 gx-pointer gx-mr-3"
                                    alt=""
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <span className="gx-avatar-name" style={{ marginLeft: "5px" }}>
                                    {userCurrent?.email === user?.email ? userCurrent?.name : user.email}
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
                footer={false}
            >
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    fields={fields}
                    style={{
                        maxWidth: 600,
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['user', 'name']}
                        label="Họ và tên"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'email']}
                        disabled
                        label="Email"
                        rules={[
                            {
                                type: 'email',
                            },
                        ]}
                    >
                        <Input disabled="disabled" />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'address']}
                        label="Địa chỉ"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'phone']}
                        label="Số điện thoại"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'avatar']}
                        label="avatarUrl"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 8,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    )
}

export default HeaderRegister;
