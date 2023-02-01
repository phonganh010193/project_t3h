import moment from "moment/moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LayoutCart from "../../component/LayoutCart";
import "../../utils/styles/historyorder.css";
import { fetchHistoryOrder } from "./historySlice";


const HistoryOrder = () => {
    const dispatch = useDispatch();
    const historyOrderList = useSelector(({ history }) => history.historyList);
    console.log('historyorderList', historyOrderList);
    useEffect(() => {
        dispatch(fetchHistoryOrder());
    }, [dispatch])
    return (
        <LayoutCart>
            <div className="history-container">
                <p className="history-header">Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Lịch sử Mua hàng</span></p>
                <div className="history-info">
                    {historyOrderList && historyOrderList.map((item, index) => {
                        return (
                            <div className="history-item" key={index}>
                                <p>Ngày {moment(item.dateOrder).format("DD-MM-YYYY HH:mm:ss")}<span style={{ marginLeft: "40px" }}><Link to={`/abate/${item.key}`}>Xem chi tiết</Link></span></p>
                                <div className="history-item-info">
                                    {item.products.map((el, index) => {
                                        return (
                                            <div className="children" key={el.id}>
                                                <img src={el.image} alt="" />
                                                <div className="children-info">
                                                    <p>{el.productName}</p>
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
                    })}

                </div>
            </div>

        </LayoutCart>
    )
}

export default HistoryOrder;
