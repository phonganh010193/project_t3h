import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LayoutCart from "../../component/LayoutCart";
import { UserContext } from "../../container/useContext";
import "../../utils/styles/search.css";
import { fetchAddOrderItem, fetchOrderProduct } from "../Cart/orderSlice";
import { fetchSearchProduct } from "./searchSlice";
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserItem } from "../../container/userSlice";
import { System } from "../../constants/system.constants";
import { usePrevious } from "../../utils/hooks";
import { ref, remove } from "firebase/database";
import { database } from "../../firebase";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";
import { Modal } from "antd";

const SearchList = () => {
    const navigate = useNavigate();
    const values = (window.location.href.slice(29))
    const [searchName, setSearchName] = useState('')
    const { user } = useContext(UserContext);
    const userCurrent = useSelector(({ user }) => user.userCurrent)
    const dispatch = useDispatch();
    const listSearch = useSelector(({ search }) => search.searchList)
    const isLoading = useSelector(({ search }) => search.isLoading)

    const isLoadingAddOrderProduct = useSelector(({ order }) => order.isLoadingAdd)
    const prevIsLoadingAddOrderProduct = usePrevious(isLoadingAddOrderProduct);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteItem, setDeleteItem] = useState(null);
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
    useEffect(() => {
        dispatch(fetchSearchProduct(searchName));
        dispatch(fetchOrderProduct(user));
        dispatch(fetchUserItem(user));
    }, [dispatch]);

    useEffect(() => {
        if (!isLoadingAddOrderProduct && prevIsLoadingAddOrderProduct) {
            dispatch(fetchOrderProduct(user));
        }
    }, [isLoadingAddOrderProduct]);



    const searchProduct = async (value) => {
        if (!value) {
            toast.warning('Xin hãy nhập thông tin tìm kiếm');
            return;
        } else {
            await dispatch(fetchSearchProduct(value))
            navigate(`/search/${value.toLowerCase().split(" ").join('')}`)
        }
    };

    useEffect(() => {
        if (values) {
            setSearchName(values);
            searchProduct(values);
        }
    }, [values]);


    const addOrderItem = (item) => {
        if (item.quantity === 0) {
            toast.error('Sản phẩm đã hết. Vui lòng quay lại sau!')
            return;
        }
        if (user && userCurrent) {
            try {
                const params = {
                    ...item,
                    user: userCurrent,
                    orderNumber: 1
                }
                dispatch(fetchAddOrderItem(params));
                // dispatch(fetchOrderProduct(user));
            } catch (error) {
                toast.error('Thêm không thành công')
            }
        } else {
            navigate('/signin');
        }
    }
    return (
        <LayoutCart>
            <div className="search-container">
                <div className="input-search">
                    <div className="input-item">
                        <input
                            value={searchName}
                            type="text"
                            placeholder="search ...."
                            onChange={(event) => {
                                setSearchName(event.target.value)
                            }}
                        />
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        searchProduct(searchName)
                    }}>Search</button>
                </div>
                {isLoading ?
                    <div style={{ textAlign: "center", width: "100%" }}>
                        <p style={{ fontSize: "20px" }}>Loading ... </p>
                    </div>
                    :
                    <div className="search-list">
                        {listSearch.length > 0 ?
                            listSearch.map((item, index) => {
                                return (
                                    <div key={item.id} className="search-list-item">
                                        <div className="list-detail">
                                            <img src={item.image} className="list-image" alt="" />
                                            <div className="btn-children">
                                                <div className="btn-content-search">
                                                    <button onClick={() => {
                                                        addOrderItem(item)
                                                    }}>Mua sản phẩm</button>
                                                    <button><Link to={`/perfume-detail/${item.id}`}>Xem chi tiết</Link></button>
                                                    {userCurrent?.roles === System.ROLESUSER.ADMIN || userCurrent?.roles === System.ROLESUSER.MEMBER ? <button><Link to={`/admin/update/product/${item.id}`}>Cập nhật</Link></button> : null}
                                                    {userCurrent?.roles === System.ROLESUSER.ADMIN || userCurrent?.roles === System.ROLESUSER.MEMBER ? <button  onClick={() => {
                                                        setIsModalOpen(true);
                                                        setDeleteItem(item);
                                                    }}>Xóa sản phẩm</button> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <p style={{ textAlign: "center", textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                        <div className="price">
                                            <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                            <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                        </div>
                                        {item.quantity === 0 ?
                                            <p style={{ color: "red", margin: "0" }}>Đã hết hàng</p>
                                            : null
                                        }
                                    </div>
                                )

                            })
                            : <p>Sản phẩm không tồn tại !</p>
                        }
                    </div>
                }
            </div>
            <Modal 
                title={<h5 style={{color: "red"}}>Bạn có chắc chắn muốn xóa sản phẩm này?</h5>}
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                width={800}
                okText="Xóa sản phẩm"
                cancelText="Hủy bỏ"
            >
                <div className="delete-item-container d-flex flex-row">
                    <div className="men-item">
                        <div className="men-detail">
                            <img src={deleteItem?.image} className="men-image" alt="" />
                        </div>
                        <p>{deleteItem?.productName.toLowerCase()}</p>
                        <div className="price">
                            <p>{Number(deleteItem?.price.split(" ").join('')).toLocaleString()} VND</p>
                            <p>{Number(deleteItem?.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                        </div>
                        {deleteItem?.quantity === 0 ?
                            <p style={{ color: "red", margin: "0" }}>Đã hết hàng</p>
                            : null
                        }
                    </div>
                    <div className="delete-product-info ml-5">
                        <h6>Thông tin sản phẩm</h6>
                        <div className="delete-info-product">
                            <p>{deleteItem?.description}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        </LayoutCart>
    )
}

export default SearchList;
