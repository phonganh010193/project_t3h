import { useEffect } from "react";
import Layout from "../component/Layout";
import IMAGE from "../contact";
import "../utils/styles/transport.css";

const Transport = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <Layout>
            <div className="transport-container">
                <div className="transport-header">
                    <p>Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Vận chuyển</span></p>
                </div>
                <div className="transport-content-info">
                    <h4>GIAO NHẬN VÀ VẬN CHUYỂN</h4>
                    <p>Phương thức vận chuyển:</p>
                    <ul>
                        <li>Tại các quận Hà Nội : Giao hàng ngay trong vòng 30phút khách hàng sẽ nhận được hàng</li>
                        <li>Tại các tỉnh thành phố lớn miền Bắc : Hải Phòng, Bắc Giang,Nam định,Quảng Ninh, Ninh Bình, Bắc Cạn,Lào Cai, Sơn La,Hà Tây,Vinh,.. chúng tôi khi nhận được tiền chuyển khoản có thể gửi xe khách tại các bến xe và Khách hàng có thể nhận ngay trong ngày</li>
                        <li>Thành Phố : Hồ Chí Minh,Đà nẵng, chúng tôi sẽ chuyển qua dịch vụ hàng không khách hàng thường nhận vào ngày hôm sau</li>
                        <li>Các huyện, xã... ngoài thành phố đều phải gửi qua dịch vụ bưu điện thời gian nhận hàng 3-4ngày không tính ngày nghỉ,cuối tuần</li>
                    </ul>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <img className="image-thank" src={IMAGE.payment_logo} alt="" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Transport;
