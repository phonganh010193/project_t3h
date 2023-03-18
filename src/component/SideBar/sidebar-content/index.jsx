import "../../../utils/styles/sidebar.content.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { System } from "../../../constants/system.constants";
import { useEffect } from "react";
import { useState } from "react";

const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
    slidesPerRow: 1,
    arrows: false
};
function SidebarContent(props) {
    const { listShowProduct, checkShow, url } = props;
    const navigate = useNavigate();
    const [listShowProduct_1, setListShowProduct_1] = useState(null)
    const [listShowProduct_2, setListShowProduct_2] = useState(null)
    const [listShowProduct_3, setListShowProduct_3] = useState(null)
    useEffect(() => {
        if (listShowProduct) {
            setListShowProduct_1(listShowProduct?.slice(0, 4));
            setListShowProduct_2(listShowProduct?.slice(4, 8));
            setListShowProduct_3(listShowProduct?.slice(8, 12));
        }
    }, [listShowProduct])
    const slideRef = useRef();

    const goPrev = () => {
        slideRef?.current?.slickPrev();
    };

    const goNext = () => {
        slideRef?.current?.slickNext()
    };

    return (
        <div 
            className={
                checkShow === System.CHECKPRODUCT.BESTSELL && url?.slice(21) === "/" ? 
                "seling-product" : 
                checkShow === System.CHECKPRODUCT.BESTSELL && url?.includes("/perfume/") ?
                "seling-product-perfume" :
                checkShow === System.CHECKPRODUCT.NEWPRODUCT ?
                "seling-product-children" :
                "seling-product-children-1"
            }
        >
            <div className="product-title">
                <h4>{checkShow === System.CHECKPRODUCT.BESTSELL ? 
                "SẢN PHẨM BÁN CHẠY" : 
                checkShow === System.CHECKPRODUCT.NEWPRODUCT?
                "SẢN PHẨM MỚI VỀ" : "NƯỚC HOA GIẢM GIÁ"
            }
            </h4>
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
                <div className="product-content">
                    {listShowProduct_1 && listShowProduct_1.map((item, index) => {
                        return (
                            <div className="product-item" key={item.id} onClick={() => {
                                navigate(`/perfume-detail/${item.id}`)
                            }}>
                                <img src={item.image} alt="" />
                                <div className="product-info">
                                    <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                    <div className="produc-price">
                                        <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="product-content">
                    {listShowProduct_2 && listShowProduct_2.map((item, index) => {
                        return (
                            <div className="product-item" key={item.id} onClick={() => {
                                navigate(`/perfume-detail/${item.id}`)
                            }}>
                                <img src={item.image} alt="" />
                                <div className="product-info">
                                    <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                    <div className="produc-price">
                                        <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="product-content">
                    {listShowProduct_3 && listShowProduct_3.map((item, index) => {
                        return (
                            <div className="product-item" key={item.id} onClick={() => {
                                navigate(`/perfume-detail/${item.id}`)
                            }}>
                                <img src={item.image} alt="" />
                                <div className="product-info">
                                    <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                    <div className="produc-price">
                                        <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Slider>
        </div>
    );
}

export default SidebarContent;
