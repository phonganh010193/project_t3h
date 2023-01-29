import IMAGE from "../../../contact";
import "../../../utils/styles/sidebar.content.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef, useState } from "react";
import React from "react";

function SidebarContent(props) {
    const { product } = props;
    const listBestSell = product.filter(el => el.bestsellers >= 5);
    const listBestSell_1 = listBestSell.slice(0,4);
    const listBestSell_2 = listBestSell.slice(4,8);
    const listBestSell_3 = listBestSell.slice(8,12);
    console.log('list1111111111', listBestSell_1, listBestSell_2, listBestSell_3);

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
                    {listBestSell_1 && listBestSell_1.map((item, index) => {
                        return (
                            <div className="product-item" key={item.id}>
                                <img src={item.image} alt="" />
                                <div className="product-info">
                                    <p>{item.productName}</p>
                                    <div className="produc-price">
                                        <p>{item.price}</p>
                                        <p>{item.sale_price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="product-content">
                {listBestSell_2 && listBestSell_2.map((item, index) => {
                        return (
                            <div className="product-item" key={item.id}>
                                <img src={item.image} alt="" />
                                <div className="product-info">
                                    <p>{item.productName}</p>
                                    <div className="produc-price">
                                        <p>{item.price}</p>
                                        <p>{item.sale_price}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="product-content">
                {listBestSell_3 && listBestSell_3.map((item, index) => {
                        return (
                            <div className="product-item" key={item.id}>
                                <img src={item.image} alt="" />
                                <div className="product-info">
                                    <p>{item.productName}</p>
                                    <div className="produc-price">
                                        <p>{item.price}</p>
                                        <p>{item.sale_price}</p>
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
