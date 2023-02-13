import IMAGE from "../../contact";
import LayoutCart from "../LayoutCart";

const Renraku = () => {
    return (
        <LayoutCart>
            <div className="renraku-container" style={{ width: "100%" }}>
                <p style={{ borderBottom: "1px solid gray" }}>Trang chủ/<span style={{ color: "#2d8356" }}>Liên hệ</span></p>
                <img style={{ width: "100%" }} src={IMAGE.renraku} alt="" />
                <div className="renraku-content">
                    <div className="content-left">

                    </div>
                    <div className="content-right">

                    </div>

                </div>
            </div>
        </LayoutCart>
    )
}

export default Renraku;
