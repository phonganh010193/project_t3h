import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import LayoutCart from "../../component/LayoutCart";
import "../../utils/styles/historyorder.css";
import { fetchCancelOrderById, fetchHistoryOrder, fetchUpdateStatusOrdered } from "./historySlice";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "antd";
import { useCallback } from "react";
import { UserContext } from "../../container/useContext";
import { usePrevious } from "../../utils/hooks";
import { updateQuantityProductByCancel } from "../Perfume/perfumeInfoSlice";
import { fetchOrderProduct } from "../Cart/orderSlice";

const HistoryOrder = () => {
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    const historyOrderList = useSelector(({ history }) => history.historyList);
    const isCancelLoading = useSelector(({ history }) => history.isCancelLoading);
    const prevCancelLoading = usePrevious(isCancelLoading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [key, setKey] = useState('');
    const [itemCancel, setitemCancel] = useState(null);
    useEffect(() => {
        if (!isCancelLoading && prevCancelLoading) {
            dispatch(fetchHistoryOrder(user));
            dispatch(updateQuantityProductByCancel(itemCancel))
        }
    }, [isCancelLoading])

    useEffect(() => {
        dispatch(fetchHistoryOrder(user));
        dispatch(fetchOrderProduct(user));
    }, [dispatch, user])

    const handleOk = useCallback((item) => {
        console.log("item", item)

        try {
            dispatch(fetchCancelOrderById(item));

            toast.success('Hủy đơn hàng thành công');
            setitemCancel(item)
        } catch (error) {
            console.log(error);
            toast.error('Hủy không thành công');
        }
        setIsModalOpen(false);
    }, [key]);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <LayoutCart>
            <div className="history-container">
                <p className="history-header">Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Lịch sử Mua hàng</span></p>
                <div className="history-info">
                    {historyOrderList?.length > 0 ? historyOrderList.map((item, index) => {
                        return (
                            <div className="history-item" key={index}>
                                <p>
                                    Ngày {moment(item.dateOrder).format("DD-MM-YYYY HH:mm:ss")}
                                    <span style={{ marginLeft: "40px" }}><Link to={`/abate/${item.key}`}>Xem chi tiết</Link></span>
                                    <span style={{ marginLeft: "40px" }}>
                                        <button
                                            className="btn-show-confirm-cancel"
                                            onClick={() => {
                                                setKey(item)
                                                setIsModalOpen(true)
                                            }}
                                        >Huỷ đơn hàng</button>
                                    </span>

                                </p>
                                <div className="history-item-info">
                                    {item.products.map((el, index) => {
                                        return (
                                            <div className="children" key={el.id}>
                                                <img src={el.image} alt="" />
                                                <div className="children-info">
                                                    <p style={{ textTransform: "capitalize" }}>{el.productName.toLowerCase()}</p>
                                                    <p>Giá: {Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                                    <p>Số lượng: {el.orderNumber}</p>
                                                    <p>Thành tiền: {(Number(el.price.split(" ").join('')) * el.orderNumber).toLocaleString()} VND</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    }) :
                        <div style={{ marginBottom: "70px" }}>
                            <p>Chưa có dữ liệu!</p>
                            <a href="/">Tiếp tục mua hàng</a>
                        </div>
                    }
                </div>
            </div>
            <Modal
                title={<p style={{ color: "green" }}>Bạn chắc chắn muốn hủy đơn hàng?</p>}
                open={isModalOpen}
                closable={false}
                style={{
                    marginTop: "180px"
                }}
                footer={
                    <div className="btn-confirm-cancel">
                        <button onClick={() => {
                            handleCancel();
                        }}>Hủy</button>
                        <button onClick={() => {
                            handleOk(key)
                        }}>Xác nhận</button>
                    </div>
                }

            />


        </LayoutCart>
    )
}

export default HistoryOrder;
