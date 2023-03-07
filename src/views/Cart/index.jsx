import LayoutCart from "../../component/LayoutCart"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDeleteOrderItem, fetchOrderProduct, updateListCart } from "./orderSlice";
import { push, ref, update } from "firebase/database";
import { database } from '../../firebase';
import TRtable from "./component/TRtable";
import "../../utils/styles/cart.container.css";
import { System } from "../../constants/system.constants";
import { fetchAbateList, fetchRemoveAbateById, } from "../Abate/abateSlice";
import { usePrevious } from "../../utils/hooks";
import { Modal } from "antd";
import { fetchUserItem } from "../../container/userSlice";
import { useContext } from "react";
import { UserContext } from "../../container/useContext";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";


const take = 5
const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    const listCart = useSelector(({ order }) => order.orderProduct);
    const isLoadingCarlList = useSelector(({ order }) => order.isLoading);
    const prevIsLoadingCartList = usePrevious(isLoadingCarlList);
    console.log('listcart', listCart);
    const product = useSelector(({ product }) => product.productList);
    const userCurrent = useSelector(({ user }) => user.userCurrent)
    const abateList = useSelector(({ abate }) => abate.abateList);
    const isLoading = useSelector(({ abate }) => abate.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [listDataOrder, setListDataOrder] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [page, setPage] = useState(0);
    const orderLoading = useSelector(({ order }) => order.isLoading);
    const prevOrderLoading = usePrevious(orderLoading);
    const isLoadingDelete = useSelector(({ order }) => order.isLoadingDelete);
    const prevDeleteLoading = usePrevious(isLoadingDelete);

    useEffect(() => {
        if (!isLoadingCarlList && prevIsLoadingCartList) {
            listCart.forEach(el => {
                if (el.quantity === 0) {
                    update(ref(database, "/Cart/" + el.key), {
                        user: el.user,
                        productId: el.productId,
                        orderNumber: el.orderNumber,
                        isCheckBox: false
                    })
                }
            })
        }
    }, [isLoadingCarlList])
    useEffect(() => {
        if (!isLoadingDelete && prevDeleteLoading) {
            dispatch(fetchOrderProduct(user))
        }
    }, [isLoadingDelete])
    const handleOk = (key) => {
        navigate(`/abate/${key}`)
        setIsModalOpen(false);
    };

    const handleCancel = (key) => {
        try {
            dispatch(fetchRemoveAbateById(key))
            toast.success('Hủy thành công!')
        } catch (error) {
            console.log(error);
            toast.error('Hủy không thành công!')
        }
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (!isLoading && prevIsLoading && abateList) {
            setIsModalOpen(true)
        }
    }, [abateList])
    useEffect(() => {
        dispatch(fetchOrderProduct(user));
        dispatch(fetchAbateList());
        dispatch(fetchUserItem(user));
        dispatch(fetchProduct());
    }, [dispatch, user]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    const updateOrder = async (value) => {
        await dispatch(updateListCart(value));
    }

    const deleteListCart = () => {
        if (user) {
            try {
                dispatch(fetchDeleteOrderItem(user))
                toast.success('Xóa giỏ hàng thành công!')
            } catch (error) {
                toast.success('Xóa giỏ hàng thất bại!')
            }
        }
    }


    const ConfirmListAbate = () => {
        toast.warning('Xin hãy chọn sản phẩm trước khi thanh toán')
        return;
    }

    const BuyListAbate = async () => {
        const products = listCart.filter(el => {
            return el.isCheckBox && el.quantity !== 0;
        });
        const object = {
            name: "",
            email: userCurrent.email,
            address: "",
            phone: "",
            note: "",
            pay_dilivery: true,
            products,
            status: System.STATUS.ORDERING,
            dateOrder: ""
        }
        const newAbate = await push(ref(database, 'Abate'), object)
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error)
            });
        updateCartOnline();
        navigate(`/abate/${newAbate.key}`);

    }

    const updateCartOnline = () => {
        const updates = listCart.filter(el => el.isChanged);
        updates.forEach(item => {
            update(ref(database, "/Cart/" + item.key), {
                orderNumber: item.orderNumber,
                productId: item.productId,
                user: item.user,
                isCheckBox: item.isCheckBox,
            })
                .then((res) => {
                    console.log(res)
                })
                .catch(() => {
                    toast.error('Cập nhật không thành công!')
                })
        })
        dispatch(fetchOrderProduct(user));
    }

    const isAllCheckbox = () => {
        const findUncheck = listCart.find(el => !el.isCheckBox);
        if (listCart.length === 0) {
            return findUncheck;
        }
        return !findUncheck;
    }

    const handleOnAllCheckbox = () => {
        const findUncheck = listCart.find(el => !el.isCheckBox);
        if (findUncheck) {
            listCart.forEach((el) => {
                const value = {
                    item: {
                        ...el,
                        orderNumber: el.orderNumber,
                        isChanged: true,
                        isCheckBox: true
                    },
                };
                updateOrder(value);
            });
        } else {
            listCart.forEach((el) => {
                const value = {
                    item: {
                        ...el,
                        orderNumber: el.orderNumber,
                        isChanged: true,
                        isCheckBox: false
                    },
                };
                updateOrder(value);
            });
        }
    }

    useEffect(() => {
        if (listCart?.length > 0) {
            setPage(0);
            if (page === 0) {
                setListDataOrder(listCart?.slice(0, take));
            }
            setNumberOfPage(Math.ceil(listCart?.length / take));
        }
    }, []);

    useEffect(() => {
        if (!orderLoading && prevOrderLoading) {
            setListDataOrder(listCart?.slice(0, take));
            setNumberOfPage(Math.ceil(listCart?.length / take));
        }
    }, [orderLoading, prevOrderLoading]);

    useEffect(() => {
        if (listCart) {
            setListDataOrder(listCart?.slice(page * take, page * take + take));
        }
    }, [page, listCart]);

    const _renderPaginate = () => {
        const data = [];
        for (let index = 0; index < numberOfPage; index++) {
            data.push(
                <li className="page-item-cart"><Link className={`page-link ${page === index ? 'active' : 'normal'}`} to="#" onClick={() => {
                    setPage(index);
                }}>{index + 1}</Link></li>
            )
        }
        return data;
    }
    return (
        <LayoutCart>
            <div className="cart-container">
                <div className="header-cart">
                    <p>Trang chủ/ <span style={{ color: "rgb(45, 131, 86)" }}>Giỏ hàng</span></p>
                </div>
                <div className="cart-table-info">
                    <div className="table-scroll">
                        <table className="table table-bordered text-center ">
                            <thead>
                                <tr>
                                    <th>
                                        <label className="btn-checkbox-all">
                                            <input
                                                id="toggle-all"
                                                className="toggle-all"
                                                type="checkbox"
                                                checked={isAllCheckbox() || false}
                                                data-reactid=".0.1.0"
                                                onChange={() => {
                                                    handleOnAllCheckbox()
                                                }}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    </th>
                                    <th className="image-column" scope="col">Hình ảnh</th>
                                    <th scope="col">Tên Sản Phẩm</th>
                                    <th scope="col">Đơn giá</th>
                                    <th scope="col">Số Lượng</th>
                                    <th scope="col">Thành tiền</th>
                                    <th scope="col">Xóa</th>
                                </tr>
                            </thead>
                            <tbody className="body-cart-info">
                                {listDataOrder ? listDataOrder?.map((item, index) => {
                                    return (
                                        <TRtable
                                            key={item.id}
                                            item={item}
                                            updateOrder={updateOrder}
                                            user={user} product={product}
                                        />
                                    )
                                }) : null}
                                <tr>
                                    <td colSpan="7" style={{ padding: "0" }}>
                                        {listDataOrder?.length > 0 ?
                                            <ul className="pagination-cart">
                                                <li className="page-item-cart"><Link className="page-link" to="#" onClick={() => {
                                                    if (page > 0) {
                                                        setPage(page - 1);
                                                    }
                                                }}><i className='fas fa-angle-double-left' style={{ color: "#2d8356" }}></i></Link></li>
                                                {_renderPaginate()}
                                                <li className="page-item-cart"><Link className="page-link" to="#" onClick={() => {
                                                    if (page < (numberOfPage - 1)) {
                                                        setPage(page + 1);
                                                    }
                                                }}><i className='fas fa-angle-double-right' style={{ color: "#2d8356" }}></i></Link></li>
                                            </ul>
                                            : null
                                        }
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                    <div className="btn-all-info">
                        <button onClick={() => {
                            navigate("/");
                        }}>Tiếp tục mua sắm</button>
                        <div className="btn-left">
                            <button onClick={() => {
                                try {
                                    updateCartOnline()
                                    toast.success('Cập nhật giỏ hàng thành công')
                                } catch (error) {
                                    toast.error('Cập nhật giỏ hàng không thành công!')
                                }
                            }}>Cập nhật giỏ hàng</button>
                            <button onClick={() => {
                                deleteListCart();
                            }}>Xóa giỏ hàng</button>
                        </div>
                    </div>
                    <div className="all-price">
                        <table className="table table-bordered" style={{ width: "40%", marginTop: "10px" }}>
                            <tbody>
                                <td>Tổng tiền thanh toán</td>
                                <td>{listCart.filter(el => el.isCheckBox && el.quantity !== 0).reduce(
                                    (accumulator, currentValue) => accumulator + Number(Number(currentValue.price.split(" ").join('')) * Number(currentValue.orderNumber)),
                                    0
                                ).toLocaleString()} VND</td>
                            </tbody>
                        </table>
                        <button onClick={() => {
                            const findItem = listCart?.find(el => el.isCheckBox)
                            if (!findItem) {
                                ConfirmListAbate();
                            } else {
                                BuyListAbate();
                            }
                        }}>Thanh toán</button>
                    </div>
                </div>
            </div>
            <Modal
                title={<p style={{ color: "green" }}>Đơn hàng của bạn chưa hoàn thành. Bạn có muốn tiếp tục?</p>}
                open={isModalOpen}
                onCancel={false}
                closable={false}
                cancelText="Hủy đơn hàng"
                style={{
                    marginTop: "180px"
                }}
                footer={
                    <div className="btn-confirm-order">
                        <button onClick={() => {
                            handleCancel(abateList?.key)
                        }}>Hủy đơn hàng</button>
                        <button onClick={() => {
                            handleOk(abateList?.key)
                        }}>Tiếp tục</button>
                    </div>
                }
            />

        </LayoutCart>
    )
}

export default Cart;
