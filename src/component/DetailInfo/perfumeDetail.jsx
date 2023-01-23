import { Tabs } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../../utils/styles/perfume.detail.css";
import PerfumeDetailInfo from "./perfumeDetailInfo";
import { fetchProductDetail } from "./perfumeDetailSlice";

const PerfumeDetail = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const detailList = useSelector(({detail}) => detail.productListDetail);
    console.log('detail', detailList);

    useEffect(() => {
        dispatch(fetchProductDetail(productId));
    }, [dispatch, productId]);

    const onChange = (key) => {
    console.log(key);
    };
    const items = [
    {
        key: '1',
        label: `THÔNG TIN SẢN PHẨM`,
        children: <PerfumeDetailInfo detailList = {detailList} />,
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
        <div className="container perfume-detail">
            <div className="header-detail">
                <p>Nhom san pham/{detailList.productName}</p>
            </div>
            <div className="content-detail">
                <img src={detailList?.image} alt="" />
                <div className="buy-info">
                    <h2>{detailList?.productName}</h2>
                    <div className="capacity">
                        <h6>Dung Tích</h6>
                        <div className="capacity-info">
                            <p>{detailList?.capacity}</p>
                            <p>{detailList?.price}{"  "}<span className="sale-disable">{detailList?.sale_price}</span></p>
                        </div>
                        <div className="amount">
                            <h6>Số Lượng</h6>
                            <div className="amount-form">
                                <div>
                                    <input />
                                </div>
                                <div className="amount-form-btn">
                                    <button>+</button>
                                    <button>-</button>
                                </div>
                                <button className="cart-shop">Thêm vào giỏ hàng</button>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="detail-indo">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    )
}

export default PerfumeDetail;
