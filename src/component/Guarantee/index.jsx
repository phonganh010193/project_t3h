
import { useEffect } from "react";
import IMAGE from "../../contact";
import LayoutCart from "../LayoutCart";
import "../../utils/styles/guerantee.css";

const Guerantee = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <LayoutCart>
            <div className="guerantee-container">
                <div className="guerantee-header">
                    <p>Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Bảo hành</span></p>
                </div>
                <div className="guerantee-content-info">
                    <h4>QUY ĐỊNH BẢO HÀNH</h4>
                    <ul>
                        <li>Cam kết hàng hoá chính hãng nhập khẩu từ Pháp,Ý,Anh, Mỹ.</li>
                        <li>Cam kết hoàn tiền cho khách hàng nếu phát hiện hàng giả hàng fake.</li>
                        <li>Cam kết bảo hành chất lượng nước hoa đến giọt cuối cùng cho khách hàng</li>
                    </ul>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <img className="image-thank" src={IMAGE.payment_logo} alt="" />
                    </div>
                </div>
            </div>
        </LayoutCart>
    )
}

export default Guerantee;
