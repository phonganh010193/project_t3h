import { Avatar, Button, Form, Input, Modal, Popover, Space, Table } from "antd";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import IMAGE from "../../../contact";
import { UserContext } from "../../../container/useContext";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { usePrevious } from "../../../utils/hooks";
import { fetchUpdateUserItem, fetchUser, fetchUserItem } from "../../../container/userSlice";
import { toast } from "react-toastify";
import { System } from "../../../constants/system.constants";
import { ref, update } from "firebase/database";
import { database } from "../../../firebase";
import { fetchRenraku } from "../../Renraku/renrakuSlice";


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
    const userCurrent = useSelector(({ user }) => user.userCurrent);
    const listRenraku = useSelector(({ renraku }) => renraku.renrakuList);
    const isLoadingRenraku = useSelector(({ renraku }) => renraku.isLoading);
    const prevIsLoadingRenraku = usePrevious(isLoadingRenraku);

    const userList = useSelector(({ user }) => user.userList);
    const isLoading = useSelector(({ user }) => user.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const [open, setOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fields, setFields] = useState(null);
    const [isModalOpenByRoles, setIsModalOpenByRoles] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [numberRenraku, setNumberRenraku] = useState(null);

    useEffect(() => {
        if (!isLoadingRenraku && prevIsLoadingRenraku) {
            setNumberRenraku(listRenraku?.filter(el => el.status !== "complete")?.length)
        }
    }, [isLoadingRenraku, listRenraku])

    const handleOk = () => {
        setIsModalOpen(false);
        setIsModalOpenByRoles(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModalOpenByRoles(false);

    };
    const handleChange = (value) => {
        userList.forEach(el => {
            if (el.key === value.item.key) {
                update(ref(database, "/User/" + el.key), {
                    email: el.email,
                    address: el.address,
                    phone: el.phone,
                    avatar: el.avatar,
                    name: el.name,
                    roles: value.values
                })
                    .then((res) => {
                        return res
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        })
    }


    const data = userList?.map((item, index) => {
        return {
            key: item.key,
            name: item.name,
            roles:
                <select
                    id="roles"
                    onChange={(event) => {
                        handleChange({
                            item: item,
                            values: event.target.value
                        })
                    }}
                    defaultValue={item.roles === System.ROLESUSER.MEMBER ? "B" :
                        item.roles === System.ROLESUSER.USER ? "C" : "A"
                    }
                >
                    <option value="A">Admin</option>
                    <option value="B">Member</option>
                    <option value="C">User</option>
                </select>,
            email: item.email,
        }
    })

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
            dispatch(fetchUser());
        }
    }, [user, dispatch])
    useEffect(() => {
        dispatch(fetchRenraku());
    }, [dispatch])


    const onVisibleChange = (newOpen) => {
        setOpen(newOpen);
    };

    const userMenuOptions = (
        <ul className="gx-user-popover">
            <li onClick={() => {
                setIsModalOpen(true)
                setOpen(false)
            }}>My Account</li>
            {userCurrent?.roles === System.ROLESUSER.ADMIN ?
                <li onClick={() => {
                    setIsModalOpenByRoles(true);
                    setOpen(false);
                }}>Vai Trò</li>
                : null
            }
            {userCurrent?.roles === System.ROLESUSER.ADMIN ||
                userCurrent?.roles === System.ROLESUSER.MEMBER ?
                <li onClick={() => {
                    navigate(`/admin/product/update/${0}`)
                }}>Thêm sản phẩm mới</li>
                : null
            }
            {userCurrent?.roles === System.ROLESUSER.ADMIN ||
                userCurrent?.roles === System.ROLESUSER.MEMBER ?
                <li onClick={() => {
                    navigate('/admin/renraku-by-user');
                    setOpen(false);
                }}>Liên hệ {numberRenraku ? <span style={{ color: "red" }}>({numberRenraku})</span> : null}</li>
                : null
            }
            {userCurrent?.roles === System.ROLESUSER.ADMIN ||
                userCurrent?.roles === System.ROLESUSER.MEMBER ?
                <li onClick={() => {
                    navigate('/admin/order');
                    // setOpen(false);
                }}>Đơn hàng</li>
                : null
            }
            {userCurrent?.roles === System.ROLESUSER.ADMIN ||
                userCurrent?.roles === System.ROLESUSER.MEMBER ?
                <li onClick={() => {
                    navigate('/admin/product');
                    // setOpen(false);
                }}>Kho hàng</li>
                : null
            }
            <li onClick={() => {
                fetchSignOut();
            }}><a style={{ color: "black", textDecoration: "none" }} href="/signin">Logout</a></li>
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


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                    width: "300px"
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Vai Trò',
            dataIndex: 'roles',
            key: 'roles',
            width: '20%',
            // ...getColumnSearchProps('roles'),
        },
    ];



    return (
        <div className="header-register">
            <div className="container header-user-cont">
                <div className={user ? "header-users" : "header-register"}>
                    {user ?
                        <>
                            <Popover onOpenChange={onVisibleChange} placement="bottom" content={userMenuOptions} trigger="click" open={open}>
                                <Avatar
                                    src={userCurrent?.email === user?.email ? userCurrent?.avatar : IMAGE.user || 'https://via.placeholder.com/150'}
                                    className="gx-size-40 gx-pointer gx-mr-3"
                                    alt=""
                                    style={{ width: "40px", height: "40px" }}
                                />
                                <span className="gx-avatar-name" style={{ marginLeft: "5px", fontWeight: "bold" }}>
                                    {userCurrent?.email === user?.email ? userCurrent?.name : user.email}
                                    <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />

                                </span>
                                {userCurrent?.roles === System.ROLESUSER.ADMIN ||
                                    userCurrent?.roles === System.ROLESUSER.MEMBER ? <div>{numberRenraku ? <span className="renraku-number-icon">!</span> : null}</div> : null}
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
                        <Input disabled={userCurrent?.roles === System.ROLESUSER.ADMIN ? "disabled" : false} />
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
                        <Input disabled={userCurrent?.roles === System.ROLESUSER.ADMIN ? "disabled" : false} />
                    </Form.Item>
                    <Form.Item
                        name={['user', 'phone']}
                        label="Số điện thoại"
                    >
                        <Input disabled={userCurrent?.roles === System.ROLESUSER.ADMIN ? "disabled" : false} />
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
                            offset: 10,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Phân quyền người dùng"
                open={isModalOpenByRoles}
                closable={true}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
                width={1000}
            >
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: 10,
                    }}
                />;
            </Modal>

        </div>

    )
}

export default HeaderRegister;
