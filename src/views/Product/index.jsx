import HeaderRegister from "../../component/Topbar/component/headerRegister";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Table } from 'antd';
import React, { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";
import { usePrevious } from "../../utils/hooks";
import "../../utils/styles/product.css";
import { useNavigate } from "react-router-dom";
import DeleteProductItem from "../../component/DeleteProductItem";
import DataProduct from "../../component/DataProduct";
import { ref, remove } from "firebase/database";
import { toast } from "react-toastify";
import { database } from "../../firebase";
import { fetchUserItem } from "../../container/userSlice";
import { useContext } from "react";
import { UserContext } from "../../container/useContext";
import { System } from "../../constants/system.constants";

const Product = () => {
    const [searchText, setSearchText] = useState('');
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchedColumn, setSearchedColumn] = useState('');
    const product = useSelector(({ product }) => product.productList);
    const productLoading = useSelector(({ product }) => product.isLoading);
    const preProductLoading = usePrevious(productLoading);
    const searchInput = useRef(null);
    const [data, setData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteItem, setDeleteItem] = useState(null);
    const userCurrent = useSelector(({ user }) => user.userCurrent);

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchUserItem(user));
    }, [dispatch, user]);

    useEffect(() => {
        if (!productLoading && preProductLoading && product) {
            setData(product?.map((item, index) => {
                return {
                    key: item.id,
                    stt: index + 1,
                    avatar: <img style={{ width: "35px" }} src={item.image} alt="" />,
                    name: item.productName,
                    number: <div className="d-flex flex-row">
                        <span style={{ marginRight: "20px" }}>{item.quantity}</span>
                        {item.quantity >= 1 && item.quantity <= 5 ?
                            <div style={{ border: "1px solid #ffc107", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "#ffc107", fontSize: "15px", margin: "0" }}>Sắp hết hàng</span></div> :
                            item.quantity === 0 ?
                                <div style={{ border: "1px solid red", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "red", fontSize: "15px", margin: "0" }}>Hết hàng</span></div> : null
                        }
                    </div>,
                    action: <div className="action-product">
                        <button onClick={(event) => {
                            event.preventDefault();
                            navigate(`/admin/product/update/${item.id}`)
                        }}>Cập nhật</button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            setIsModalOpen(true);
                            setDeleteItem(item);
                        }}>Xóa</button>
                    </div>
                }
            }))
        }
    }, [dispatch, productLoading, product, preProductLoading])
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
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
            width: '5%',
        },
        {
            title: 'Ảnh',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '15%',
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '40%',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Số lượng',
            dataIndex: 'number',
            key: 'number',
            width: '20%',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            key: 'action',
        },
    ];

    const handleOk = () => {
        remove(ref(database, "/Product/" + deleteItem.key))
            .then(() => {
                toast.success('Xóa sản phẩm thành công!')
            })
            .catch((error) => {
                toast.error('Xóa sản phẩm thất bại!')
            })
        dispatch(fetchProduct());
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="container-fluid m-0 p-0">
            <HeaderRegister />
            {userCurrent?.roles === System.ROLESUSER.ADMIN ||
                userCurrent?.roles === System.ROLESUSER.MEMBER ?
                <div className="container">
                    <div className="product-title-header">
                        <h4 className="mt-4">Kho hàng</h4>

                        <div style={{ width: "800px" }} className="d-flex flex-row justify-content-between">
                            <span
                                className="all-product"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setData(product?.map((item, index) => {
                                        return {
                                            key: item.id,
                                            stt: index + 1,
                                            avatar: <img style={{ width: "35px" }} src={item.image} alt="" />,
                                            name: <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>,
                                            number: <div className="d-flex flex-row">
                                                <span style={{ marginRight: "20px" }}>{item.quantity}</span>
                                                {item.quantity >= 1 && item.quantity <= 5 ?
                                                    <div style={{ border: "1px solid #ffc107", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "#ffc107", fontSize: "15px", margin: "0" }}>Sắp hết hàng</span></div> :
                                                    item.quantity === 0 ?
                                                        <div style={{ border: "1px solid red", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "red", fontSize: "15px", margin: "0" }}>Hết hàng</span></div> : null
                                                }
                                            </div>,
                                            action: <div className="action-product">
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    navigate(`/admin/product/update/${item.id}`)
                                                }}>Cập nhật</button>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    setIsModalOpen(true);
                                                    setDeleteItem(item);
                                                }}>Xóa</button>
                                            </div>
                                        }
                                    }))
                                }}
                            >Tổng: {product?.length} sản phẩm</span>
                            <span
                                className="effeting-product"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setData(product?.filter(el => {
                                        if (el.quantity >= 1 && el.quantity <= 5) {
                                            return el;
                                        }
                                    })?.map((item, index) => {
                                        return {
                                            key: item.id,
                                            stt: index + 1,
                                            avatar: <img style={{ width: "35px" }} src={item.image} alt="" />,
                                            name: <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>,
                                            number: <div className="d-flex flex-row">
                                                <span style={{ marginRight: "20px" }}>{item.quantity}</span>
                                                {item.quantity >= 1 && item.quantity <= 5 ?
                                                    <div style={{ border: "1px solid #ffc107", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "#ffc107", fontSize: "15px", margin: "0" }}>Sắp hết hàng</span></div> :
                                                    item.quantity === 0 ?
                                                        <div style={{ border: "1px solid red", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "red", fontSize: "15px", margin: "0" }}>Hết hàng</span></div> : null
                                                }
                                            </div>,
                                            action: <div className="action-product">
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    navigate(`/admin/product/update/${item.id}`)
                                                }}>Cập nhật</button>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    setIsModalOpen(true);
                                                    setDeleteItem(item);
                                                }}>Xóa</button>
                                            </div>
                                        }
                                    }))
                                }}
                            >Sắp hết hàng: {product?.filter(el => {
                                if (el.quantity >= 1 && el.quantity <= 5) {
                                    return el;
                                }
                            })?.length} sản phẩm</span>
                            <span
                                className="effeteed-product"
                                onClick={(event) => {
                                    event.preventDefault();
                                    setData(product?.filter(el => {
                                        if (el.quantity === 0) {
                                            return el;
                                        }
                                    })?.map((item, index) => {
                                        return {
                                            key: item.id,
                                            stt: index + 1,
                                            avatar: <img style={{ width: "35px" }} src={item.image} alt="" />,
                                            name: <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>,
                                            number: <div className="d-flex flex-row">
                                                <span style={{ marginRight: "20px" }}>{item.quantity}</span>
                                                {item.quantity >= 1 && item.quantity <= 5 ?
                                                    <div style={{ border: "1px solid #ffc107", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "#ffc107", fontSize: "15px", margin: "0" }}>Sắp hết hàng</span></div> :
                                                    item.quantity === 0 ?
                                                        <div style={{ border: "1px solid red", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "red", fontSize: "15px", margin: "0" }}>Hết hàng</span></div> : null
                                                }
                                            </div>,
                                            action: <div className="action-product">
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    navigate(`/admin/product/update/${item.id}`)
                                                }}>Cập nhật</button>
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    setIsModalOpen(true);
                                                    setDeleteItem(item);
                                                }}>Xóa</button>
                                            </div>
                                        }
                                    }))
                                }}
                            >Hết hàng: {product?.filter(el => {
                                if (el.quantity === 0) {
                                    return el;
                                }
                            })?.length} sản phẩm</span>
                        </div>

                    </div>
                    <Table columns={columns} dataSource={data} />
                    <a href="/" style={{ paddingBottom: "50px" }}>Quay lại trang chủ</a>
                </div>
                : <div className="container">
                    <p style={{ color: "red" }}>Bạn không được quyền truy cập chức năng này</p>
                </div>
            }
            <DeleteProductItem isModalOpen={isModalOpen} deleteItem={deleteItem} handleOk={handleOk} handleCancel={handleCancel} />
        </div>
    )
}

export default Product;
