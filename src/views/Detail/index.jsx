import LayoutCart from "../../component/LayoutCart";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../container/useContext";
import { fetchAddOrderItem, fetchOrderProduct } from "../Cart/orderSlice";
import { fetchProductDetail } from "./perfumeDetailSlice";
import PerfumeDetailInfo from "./component/perfumeDetailInfo";
import { Tabs } from "antd";
import "../../utils/styles/perfume.detail.css";
// import { Carousel } from "react-carousel-minimal";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Detail = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const detailList = useSelector(({ detail }) => detail.productListDetail);
    console.log('detailList', detailList);
    const [number, setNumber] = useState(1);


    useEffect(() => {
        dispatch(fetchProductDetail(productId));
        dispatch(fetchOrderProduct());
    }, [dispatch, productId]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const addOrderItem = async (item) => {
        try {
            const params = { ...item, user }
            await dispatch(fetchAddOrderItem(params));
            await dispatch(fetchOrderProduct());
        } catch (error) {
            toast.error('Thêm không thành công')
        }
    }

    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `THÔNG TIN SẢN PHẨM`,
            children: <PerfumeDetailInfo detailList={detailList} />,
        },
        {
            key: '2',
            label: `HƯỚNG DẪN MUA HÀNG`,
            children: `Content of Tab Pane 2`,
        },
        {
            key: '3',
            label: `ĐÁNH GIÁ CHI TIẾT`,
            children: `Content of Tab Pane 3`,
        },
    ];

    return (
        <LayoutCart>
            <div style={{
                padding: "0 20px"
            }}>

            </div>
            <div className="container perfume-detail">
                <div className="header-detail">
                    <p>Nhóm sản phẩm/<span style={{ color: "#2d8356" }}>{detailList?.productName}</span></p>
                </div>
                <div className="content-detail">
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        showIndicators={false}
                        thumbWidth="70px"
                        width="70%"
                    >
                        {detailList && detailList?.imageShow?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item.image} alt="" />
                                </div>
                            )
                        })}
                    </Carousel>

                    <div className="buy-info">
                        <h2 style={{ textTransform: "capitalize" }}>{detailList?.productName?.toLowerCase()}</h2>
                        <div className="capacity">
                            <h6>Dung Tích</h6>
                            <div className="capacity-info">
                                <p>{detailList?.capacity}</p>
                                <p>{Number(detailList?.price?.split(" ").join('')).toLocaleString()} VND{"  "}<span className="sale-disable">{Number(detailList?.sale_price?.split(" ").join('')).toLocaleString()} VND</span></p>
                            </div>
                            <div className="amount">
                                <h6>Số Lượng</h6>
                                <div className="amount-form">
                                    <input type="number" value={number} className="text-center" min="1" max="1000" onChange={(event) => {
                                        setNumber(event.target.value);
                                    }} />
                                    <button className="cart-shop" onClick={() => {
                                        addOrderItem(detailList);
                                    }}>Thêm vào giỏ hàng</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="detail-indo">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
        </LayoutCart>
    )
}

export default Detail;
