import IMAGE from "../../../../contact/index";
import "../../../../utils/styles/homeperfume.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext, useRef, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserContext } from "../../../../container/useContext";
import { push, ref } from "firebase/database";
import { database } from "../../../../firebase";
import { fetchOrderProduct } from "../../../CartInfo/orderSlice";

function HomePerfumeWomen(props) {
    const { product } = props;
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    console.log('productlist1', product);
    const product1 = product.slice(0,3);
    const product2 = product.slice(3,6);
    const product3 = product.slice(6,9);
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

    const goPrev = () => {
        slideRef?.current?.slickPrev();
    };

    const goNext = () => {
        slideRef?.current?.slickNext()
    };

    const addOrderItem = (item) => {
        const ob = {
            user: user.email,
            productId: item.id,
            orderNumber: 1
        }
        console.log('ob', ob);
        push(ref(database, 'Cart'), ob)
        .then(() => {
            console.log('add success')
            dispatch(fetchOrderProduct());
        })
        .catch((error) => {
            console.log('add fail')            
        });
    }
    return (
        <div style={{marginBottom: "30px"}}>
            <div className="seling-home-women">
                <div className="home-women-title">
                    <h4>NƯỚC HOA NỮ</h4>
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
                                    <p style={{textAlign: "center", width: "200px"}}>{el.productName}</p>
                                    <div className="price">
                                        <p>{el.price}</p>
                                        <p>{el.sale_price}</p>
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
                                    <p style={{textAlign: "center", width: "200px"}}>{el.productName}</p>
                                    <div className="price">
                                        <p>{el.price}</p>
                                        <p>{el.sale_price}</p>
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
                                    <p style={{textAlign: "center", width: "200px"}}>{el.productName}</p>
                                    <div className="price">
                                        <p>{el.price}</p>
                                        <p>{el.sale_price}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    
                </Slider>
            </div>
            <div className="btn-see-all">
                <button className="btn-see-all"><Link to={`perfume/2`}>Xem Tất Cả</Link></button>
            </div>
        </div>
        
    );
}

export default HomePerfumeWomen;
