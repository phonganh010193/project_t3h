import LayoutCart from "../../component/LayoutCart"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOrderProduct, updateListCart } from "./orderSlice";
import { push, ref, remove, update } from "firebase/database";
import { database } from '../../firebase';
import TRtable from "./component/TRtable";
import "../../utils/styles/cart.container.css";
import { System } from "../../constants/system.constants";
import { fetchAbateList, fetchRemoveAbatebyId } from "../Abate/abateSlice";
import { usePrevious } from "../../utils/hooks";
import { Modal } from "antd";



const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listCart = useSelector(({ order }) => order.orderProduct);
    const abateList = useSelector(({ abate }) => abate.abateList);
    const isLoading = useSelector(({ abate }) => abate.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = (key) => {
        navigate(`/abate/${key}`)
        setIsModalOpen(false);
    };

    const handleCancel = async (key) => {
        try {
            await dispatch(fetchRemoveAbatebyId(key))
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
        dispatch(fetchOrderProduct());
        dispatch(fetchAbateList());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    const updateOrder = async (value) => {
        await dispatch(updateListCart(value));
    }

    const deleteListCart = () => {
        remove(ref(database, 'Cart'))
            .then(() => {
                dispatch(fetchOrderProduct());
                toast.success('Delete Cart success!')
            })
            .catch((error) => {
                toast.success('Delete Cart fail!')
            })
    }


    const ConfirmListAbate = () => {
        toast.warning('Xin hãy chọn sản phẩm trước khi thanh toán')
        return;
    }

    const BuyListAbate = async () => {
        const products = listCart.filter(el => {
            return el.isCheckBox;
        });
        console.log('product=============', products)
        const object = {
            note: "",
            pay_dilivery: "",
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
        dispatch(fetchOrderProduct());
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
    return (
        <LayoutCart>
            <div className="cart-container">
                <div className="header-cart">
                    <p>Trang chủ/ <span style={{ color: "rgb(45, 131, 86)" }}>Giỏ hàng</span></p>
                </div>
                <div className="cart-table-info">
                    <table className="table table-bordered text-center">
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
                                        <span class="checkmark"></span>
                                    </label>
                                </th>
                                <th scope="col">Hình ảnh</th>
                                <th scope="col">Tên Sản Phẩm</th>
                                <th scope="col">Đơn giá</th>
                                <th scope="col">Số Lượng</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listCart && listCart.map((item, index) => {
                                return (
                                    <TRtable key={item.id} item={item} updateOrder={updateOrder} />
                                )
                            })}
                        </tbody>
                    </table>
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
                        <table className="table table-bordered" style={{ width: "30%", marginTop: "10px" }}>
                            <tbody>
                                <td>Tổng tiền thanh toán</td>
                                <td>{listCart.filter(el => el.isCheckBox).reduce(
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
