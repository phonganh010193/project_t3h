import LayoutCart from "../../component/LayoutCart";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../container/useContext";
import { fetchOrderProduct } from "../Cart/orderSlice";
import { fetchProductDetail } from "./perfumeDetailSlice";
import { push, ref, update } from "firebase/database";
import { database } from "../../firebase";
import PerfumeDetailInfo from "./component/perfumeDetailInfo";
import { Tabs } from "antd";
import "../../utils/styles/perfume.detail.css";

const Detail = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const listCart = useSelector(({ order }) => order.orderProduct);

    const detailList = useSelector(({ detail }) => detail.productListDetail);
    const [number, setNumber] = useState(1);


    useEffect(() => {
        dispatch(fetchProductDetail(productId));
        dispatch(fetchOrderProduct());
    }, [dispatch, productId]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const addOrderItem = (item) => {
        const findItem = listCart.find(el => item.id === el.productId)
        if (findItem) {
            listCart.forEach(el => {
                if (el.productId === item.id) {
                    update(ref(database, "Cart/" + el.key), {
                        orderNumber: parseFloat(el.orderNumber) + parseFloat(number),
                        productId: el.productId,
                        user: el.user,
                        isCheckBox: false,
                    })
                        .then(() => {
                            dispatch(fetchOrderProduct());
                            toast.success('Add to Cart success!')
                        })
                        .catch((error) => {
                            console.log(error)
                            toast.error('Add to Cart fail!')
                        })
                }
            });
        } else {
            const ob = {
                user: user.email,
                productId: item.id,
                orderNumber: number,
                isCheckBox: false,
            }
            console.log('ob', ob);
            push(ref(database, 'Cart'), ob)
                .then(() => {
                    toast.success('Add to Cart success!')
                    dispatch(fetchOrderProduct());
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Add to Cart fail!')
                });
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
                                <p>{Number(detailList?.price.split(" ").join('')).toLocaleString()} VND{"  "}<span className="sale-disable">{Number(detailList?.sale_price.split(" ").join('')).toLocaleString()} VND</span></p>
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
