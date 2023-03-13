import moment from "moment/moment";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../../utils/styles/historyorder.css";
import { fetchCancelOrderById, fetchHistoryOrder, fetchUpdateStatusOrdered } from "./historySlice";
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from "antd";
import { useCallback } from "react";
import { UserContext } from "../../container/useContext";
import { usePrevious } from "../../utils/hooks";
import { updateQuantityProductByCancel } from "../Perfume/perfumeInfoSlice";
import { fetchAddOrderItem, fetchOrderProduct } from "../Cart/orderSlice";
import { System } from "../../constants/system.constants";
import { fetchProductDetail } from "../Detail/perfumeDetailSlice";

const HistoryOrder = (props) => {
    const { userCurrent, dispatch } = props;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const historyOrderList = useSelector(({ history }) => history.historyList);
    const isCancelLoading = useSelector(({ history }) => history.isCancelLoading);
    const addItem = useSelector(({ detail }) => detail.productListDetail);
    const isLoadingDetail = useSelector(({ detail }) => detail.isLoading);
    const prevIsLoadingDetail = usePrevious(isLoadingDetail);
    const prevCancelLoading = usePrevious(isCancelLoading);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [key, setKey] = useState('');
    const [itemCancel, setitemCancel] = useState(null);

    useEffect(() => {
        if (!isLoadingDetail && prevIsLoadingDetail) {
            addOrderItem(addItem);
        }
    }, [isLoadingDetail])
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
        if (item.status !== System.STATUS.ORDERED) {
            setIsModalConfirmOpen(true);
            setIsModalOpen(false);
            return;
        }
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

    const handleConfirmOk = () => {
        setIsModalConfirmOpen(false);
    };
    const handleConfirmCancel = () => {
        setIsModalConfirmOpen(false);
    };

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
            } catch (error) {
                toast.error('Thêm không thành công')
            }
        } else {
            navigate('/signin');
        }
    };

    const getBuyMoreItem = (el) => {
        dispatch(fetchProductDetail(el.id));
    }

    return (
        <div className="history-container">
            <div className="history-info">
                {historyOrderList?.length > 0 ? historyOrderList.map((item, index) => {
                    return (
                        <div className="history-item" key={index}>
                            <div className="history-item-children d-flex flex-row">
                                Ngày {moment(item.dateOrder).format("DD-MM-YYYY HH:mm:ss")}
                                <div className="history-item-btn-group d-flex flex-row">
                                    <p style={{ marginLeft: "40px" }}><Link to={`/abate/${item.key}`}>Xem đơn hàng</Link></p>
                                    <p style={{ marginLeft: "40px" }}>
                                        {item.status !== System.STATUS.RECEIVED ?
                                            <button
                                                className="btn-show-confirm-cancel"
                                                onClick={() => {
                                                    setKey(item)
                                                    setIsModalOpen(true)
                                                }}
                                            >Huỷ đơn hàng</button>
                                            : <div style={{ border: "1px solid green", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "green", fontSize: "15px", margin: "0" }}>Đã nhận hàng</span></div>
                                        }
                                    </p>
                                </div>

                            </div>
                            <div className="history-item-info mt-4">
                                {item.products.map((el, index) => {
                                    return (
                                        <div className="children" key={el.id}>
                                            <Link to={`/perfume-detail/${el.id}`}><img src={el.image} alt="" /></Link>
                                            <div className="d-flex flex-column">
                                                <div className="children-info">
                                                    <p style={{ textTransform: "capitalize" }}>{el.productName.toLowerCase()}</p>
                                                    <p>Giá: {Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                                    <p>Số lượng: {el.orderNumber}</p>
                                                    <p>Thành tiền: {(Number(el.price.split(" ").join('')) * el.orderNumber).toLocaleString()} VND</p>
                                                </div>
                                                <div className="children-info-buy">
                                                    <button onClick={(event) => {
                                                        event.preventDefault();
                                                        getBuyMoreItem(el)
                                                    }}>Mua lại</button>
                                                </div>
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
            <Modal
                title={<p style={{ color: "#ffc107" }}>Sản phẩm của bạn
                    {key?.status === System.STATUS.PROCESSING ? " đã được đóng gói. Nếu muốn hủy đơn hàng vui lòng liên hệ trực tiếp với shop. Xin cảm ơn!" :
                        key?.status === System.STATUS.TRANSFERRING ? " đang được vận chuyển. Hiện tại không thể hủy đơn hàng. Xin cảm ơn!" : ""
                    }</p>}
                open={isModalConfirmOpen}
                onOk={handleConfirmOk}
                onCancel={handleConfirmCancel}
                style={{
                    marginTop: "180px"
                }}
                footer={false}

            />
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
        </div>
    )
}

export default HistoryOrder;
