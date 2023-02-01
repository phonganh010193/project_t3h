import LayoutCart from "../../component/LayoutCart"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderProduct, updateListCart } from "./orderSlice";
import { push, ref, remove, update } from "firebase/database";
import { database } from '../../firebase';
import TRtable from "./component/TRtable";
import { fetchListAbate } from "../Abate/abateSlice";
import "../../utils/styles/cart.container.css";
import { System } from "../../constants/system.constants";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listCart = useSelector(({ order }) => order.orderProduct);

    useEffect(() => {
        dispatch(fetchOrderProduct());
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])

    const updateOrder = (value) => {
        dispatch(updateListCart(value));
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
        const object = {
            name: "",
            email: products[0].user,
            address: "",
            phone: "",
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
        navigate(`/abate/${newAbate.key}`);
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
                                <th></th>
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
                                const updates = listCart.filter(el => el.isChanged);
                                listCart.forEach(el => {
                                    updates.forEach(item => {
                                        if (el.id === item.id) {
                                            update(ref(database, "/Cart/" + el.key), {
                                                orderNumber: item.orderNumber,
                                                productId: item.productId,
                                                user: item.user
                                            })
                                                .then(() => {
                                                    toast.success('Cập nhật thành công giỏ hàng!')
                                                })
                                                .catch(() => {
                                                    toast.error('Cập nhật fail!')
                                                })
                                        }
                                    })
                                });
                                dispatch(fetchOrderProduct());
                            }}>Cập nhật giỏ hàng</button>
                            <button onClick={() => {
                                deleteListCart();
                            }}>Xóa giỏ hàng</button>
                        </div>
                    </div>
                    <div className="all-price">
                        <table className="table table-bordered" style={{ width: "30%", marginTop: "10px" }}>
                            <td>Tổng tiền thanh toán</td>
                            <td>{listCart.filter(el => el.isCheckBox).reduce(
                                (accumulator, currentValue) => accumulator + Number(Number(currentValue.price.split(" ").join('')) * Number(currentValue.orderNumber)),
                                0
                            ).toLocaleString()} VND</td>
                        </table>
                        <button onClick={() => {
                            if (listCart.filter(el => el.isCheckBox).length === 0) {
                                ConfirmListAbate();
                            } else {
                                BuyListAbate();
                            }
                        }}>Thanh toán</button>
                    </div>


                </div>
            </div>
        </LayoutCart>
    )
}

export default Cart;
