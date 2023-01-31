import "../../../utils/styles/homeperfume.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext, useRef, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "../../../container/useContext";
import { fetchOrderProduct } from "../../Cart/orderSlice";
import { push, ref, update } from "firebase/database";
import { database } from "../../../firebase";

function HomePerfumeMen(props) {
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    const listCart = useSelector(({ order }) => order.orderProduct);


    const { product } = props;
    const product1 = product.slice(0, 3);
    const product2 = product.slice(3, 6);
    const product3 = product.slice(6, 9);
    const slideRef = useRef();
    const [sliderSettings, setSliderSeting] = useState({
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1,
        arrows: true
    });

    useEffect(() => {
        dispatch(fetchOrderProduct());
    }, [dispatch])

    const goPrev = () => {
        slideRef?.current?.slickPrev();
    };

    const goNext = () => {
        slideRef?.current?.slickNext()
    };

    const addOrderItem = (item) => {
        const findItem = listCart.find(el => item.id === el.productId)
        if (findItem) {
            
            update(ref(database, "Cart/" + findItem.key), {
                orderNumber: parseFloat(findItem.orderNumber) + 1,
                productId: findItem.productId,
                user: findItem.user,
                isCheckBox: false,
            })
                .then(() => {
                    dispatch(fetchOrderProduct());
                    toast.success('Add to Cart success!')
                })
                .catch(() => {
                    toast.error('Add to Cart fail!')
                })
           
        } else {
            const ob = {
                user: user.email,
                productId: item.id,
                orderNumber: 1,
                isCheckBox: false,
            }
            push(ref(database, 'Cart'), ob)
                .then(() => {
                    dispatch(fetchOrderProduct());
                    toast.success('Add to Cart success!')
                })
                .catch((error) => {
                    toast.error('Add to Cart fail!')
                });
        }
    }

    return (
        <div>
            <div className="seling-home-women">
                <div className="home-women-title">
                    <h4>NƯỚC HOA NAM</h4>
                    <div className="btn-prev-next">
                        <button onClick={() => goPrev()}>
                            <i className="fa fa-angle-left"></i>
                        </button>
                        <button onClick={() => goNext()}>
                            <i className="fa fa-angle-right"></i>
                        </button>
                    </div>
                </div>
                <Slider {...sliderSettings} ref={slideRef}>
                    <div className="home-women-content">
                        {product1 && product1.map((el, index) => {
                            return (
                                <div className="women-item" key={el.id}>
                                    <div className="women-detail">
                                        <img src={el.image} className="home-women-image" alt="" />
                                        <div className="btn-children">
                                            <div className="btn-content">
                                                <button onClick={() => {
                                                    addOrderItem(el)
                                                }}>Mua sản phẩm</button>
                                                <button><Link to={`/perfume-detail/${el.id}`}>Xem chi tiết</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center", width: "200px" }}>{el.productName}</p>
                                    <div className="price">
                                        <p>{Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(el.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="home-women-content">
                        {product2 && product2.map((el, index) => {
                            return (
                                <div className="women-item" key={el.id}>
                                    <div className="women-detail">
                                        <img src={el.image} className="home-women-image" alt="" />
                                        <div className="btn-children">
                                            <div className="btn-content">
                                                <button onClick={() => {
                                                    addOrderItem(el)
                                                }}>Mua sản phẩm</button>
                                                <button><Link to={`/perfume-detail/${el.id}`}>Xem chi tiết</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center", width: "200px" }}>{el.productName}</p>
                                    <div className="price">
                                        <p>{Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(el.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="home-women-content">
                        {product3 && product3.map((el, index) => {
                            return (
                                <div className="women-item" key={el.id}>
                                    <div className="women-detail">
                                        <img src={el.image} className="home-women-image" alt="" />
                                        <div className="btn-children">
                                            <div className="btn-content">
                                                <button onClick={() => {
                                                    addOrderItem(el)
                                                }}>Mua sản phẩm</button>
                                                <button><Link to={`/perfume-detail/${el.id}`}>Xem chi tiết</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center", width: "200px" }}>{el.productName}</p>
                                    <div className="price">
                                        <p>{Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(el.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Slider>
            </div>
            <div className="btn-see-all">
                <button className="btn-see-all"><Link to={`perfume/1`}>Xem Tất Cả</Link></button>
            </div>
        </div>

    );
}

export default HomePerfumeMen;
