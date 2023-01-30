import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useRef } from "react";
import "../../../utils/styles/homepage.css";
import HomePerfumeMen from "./component/HomePerfumeMen";
import HomeImageInfo from "./component/HomeImageInfo";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../PerfumeInfo/perfumeInfoSlice";
import HomePerfumeWomen from "./component/HomePerfumeWomen";

function HomePageInfo() {
    const dispatch = useDispatch();
    const product = useSelector(({ product }) => product.productList)
    const productMen = product.filter(el => el.gender === 1);
    const productWomen = product.filter(el => el.gender === 2);
    useEffect(() => {
        dispatch(fetchProduct());
    }, [dispatch])
    const sliderRef = useRef();
    const sliderrSettings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        rows: 1,
        slidesPerRow: 1,
        arrows: false,
        className: 'slide-content',
        dotsClass: 'slick-dots'
    };
    return (
        <div className="homepage-container">
            <Slider {...sliderrSettings} ref={sliderRef} >
                <div className="slide-item">
                    <img src="https://th.bing.com/th/id/R.11dfb5228f92cacb30c2d13ca9347a30?rik=N1BH2SLe2Fckfg&riu=http%3a%2f%2fwww.mywishstyle.com%2fwp-content%2fuploads%2f2015%2f11%2fBurberry-Festive-Beauty-Collection-2015-1080x764.jpg&ehk=4mhkYO19%2bAzVvvrOPIfAlVQdnCn2TEMOUQMdpUriRis%3d&risl=&pid=ImgRaw&r=0" alt="" />
                </div>
                <div className="slide-item">
                    <img src="https://assets.burberry.com/is/image/Burberryltd/3733ce231c48bfec5ce95439ed6508c516cf81fd.jpg?$BBY_V2_SL_4X3$&wid=760&hei=570" alt="" />
                </div>
                <div className="slide-item">
                    <img src="https://img.fragrancex.com/images/aboutus/aboutus-realfragrances.jpg" alt="" />
                </div>
            </Slider>
            <HomePerfumeMen product={productMen} />
            <HomeImageInfo />
            <HomePerfumeWomen product={productWomen} />
        </div>
    )
}

export default HomePageInfo;
