import IMAGE from "../../../contact";
import "../../../utils/styles/sidebar.content.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef, useState } from "react";
import React from "react";

function SidebarContent() {
    const slideRef = useRef();
    const [sliderSettings, setSliderSeting] = useState({
        dots: false,
        infinite: false,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        rows: 1,
        slidesPerRow: 1,
        arrows: false
    });

    const goPrev = () => {
        slideRef?.current?.slickPrev();
    };

    const goNext = () => {
        slideRef?.current?.slickNext()
    };

    return (
        <div className="seling-product">
            <div className="product-title">
                <h4>SẢN PHẨM BÁN CHẠY</h4>
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
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-content">
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-content">
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                    <div className="product-item">
                        <img src={IMAGE.logo} alt="" />
                        <div className="product-info">
                            <p>CHANEl BLEU DE CHANEL EAU DE TOILETTE</p>
                            <div className="produc-price">
                                <p>5.800.000 đ</p>
                                <p>8.900.000 đ</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Slider>
        </div>
    );
}

export default SidebarContent;
