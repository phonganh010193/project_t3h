import "../../../utils/styles/homeperfume.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../../container/useContext";
import { fetchAddOrderItem, fetchOrderProduct } from "../../Cart/orderSlice";
import { Link } from "react-router-dom";
import { System } from "../../../constants/system.constants";

const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: true
};
function HomePerfume(props) {
    const { product, gender } = props;
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);

    const product1 = product.slice(0, 3);
    const product2 = product.slice(3, 6);
    const product3 = product.slice(6, 9);
    const slideRef = useRef();

    useEffect(() => {
        dispatch(fetchOrderProduct());
    }, [dispatch])

    const goPrev = () => {
        slideRef?.current?.slickPrev();
    };

    const goNext = () => {
        slideRef?.current?.slickNext()
    };

    const addOrderItem = async (item) => {
        try {
            const params = {
                ...item,
                user,
                orderNumber: 1
            }
            await dispatch(fetchAddOrderItem(params));
            await dispatch(fetchOrderProduct());
        } catch (error) {
            toast.error('Thêm không thành công')
        }
    }
    return (
        <div style={{ marginBottom: "30px" }}>
            <div className="seling-home-perfume">
                <div className="home-perfume-title">
                    <h4>{gender === System.GENDER.WOMMEN ? "NƯỚC HOA NỮ" : "NƯỚC HOA NAM"}</h4>
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
                    <div className="home-perfume-content">
                        {product1 && product1.map((el, index) => {
                            return (
                                <div className="home-perfume-item" key={el.id}>
                                    <div className="home-perfume-detail">
                                        <img src={el.image} className="home-perfume-image" alt="" />
                                        <div className="btn-children">
                                            <div className="btn-content">
                                                <button onClick={() => {
                                                    addOrderItem(el)
                                                }}>Mua sản phẩm</button>
                                                <button><Link to={`/perfume-detail/${el.id}`}>Xem chi tiết</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center", textTransform: "capitalize" }}>{el.productName.toLowerCase()}</p>
                                    <div className="price">
                                        <p>{Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(el.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="home-perfume-content">
                        {product2 && product2.map((el, index) => {
                            return (
                                <div className="home-perfume-item" key={el.id}>
                                    <div className="home-perfume-detail">
                                        <img src={el.image} className="home-perfume-image" alt="" />
                                        <div className="btn-children">
                                            <div className="btn-content">
                                                <button onClick={() => {
                                                    addOrderItem(el)
                                                }}>Mua sản phẩm</button>
                                                <button><Link to={`/perfume-detail/${el.id}`}>Xem chi tiết</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center", textTransform: "capitalize" }}>{el.productName.toLowerCase()}</p>
                                    <div className="price">
                                        <p>{Number(el.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(el.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="home-perfume-content">
                        {product3 && product3.map((el, index) => {
                            return (
                                <div className="home-perfume-item" key={el.id}>
                                    <div className="home-perfume-detail">
                                        <img src={el.image} className="home-perfume-image" alt="" />
                                        <div className="btn-children">
                                            <div className="btn-content">
                                                <button onClick={() => {
                                                    addOrderItem(el)
                                                }}>Mua sản phẩm</button>
                                                <button><Link to={`/perfume-detail/${el.id}`}>Xem chi tiết</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                    <p style={{ textAlign: "center", textTransform: "capitalize" }}>{el.productName.toLowerCase()}</p>
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
                <button className="btn-see-all"><Link to={`perfume/2`}>Xem Tất Cả</Link></button>
            </div>
        </div>

    );
}

export default HomePerfume;
