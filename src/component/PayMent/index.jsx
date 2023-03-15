import "../../utils/styles/payment.css";
import IMAGE from "../../contact";
import { useEffect } from "react";
import Layout from "../Layout";

const PayMent = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [])
    return (
        <Layout>
            <div className="payment-container">
                <div className="payment-header">
                    <p>Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Thanh toán</span></p>
                </div>
                <div className="payment-content-info">
                    <h4>Phương thức thanh toán</h4>
                    <p>Chúng tối chấp nhận các hình thức thanh toán sau:</p>
                    <ul>
                        <li>Thanh toán tiền mặt khi giao hàng tận nơi (COD) Áp dụng tại HÀ NỘI và Hồ Chí Minh</li>
                        <li>Thanh toán qua chuyển khoản ngân hàng hoặc máy ATM (Vui lòng liên hệ trực tiếp với shop)</li>
                    </ul>
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                    <img className="image-thank" src={IMAGE.payment_logo} alt="" />
                </div>
            </div>
        </Layout>
    )
}

export default PayMent;
