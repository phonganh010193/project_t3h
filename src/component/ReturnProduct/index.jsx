import { useEffect } from "react";
import IMAGE from "../../contact";
import LayoutCart from "../LayoutCart";
import "../../utils/styles/return.css";

const ReturnProduct = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <LayoutCart>
            <div className="return-container">
                <div className="return-header">
                    <p>Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Đổi trả</span></p>
                </div>
                <div className="return-content-info">
                    <h4>QUY ĐỊNH ĐỔI TRẢ HÀNG</h4>
                    <p>Chúng tôi thực hiện đổi hàng hoặc trả lại tiền cho quý khách, trừ những trường hợp sau:</p>
                    <ul>
                        <li>
                            Không đạt chất lượng như:<br />
                            <span>(*) Quý khách vui lòng kiểm tra hàng hóa và tình trạng với nhân viên giao hàng ngay khi nhận được hàng. Khi phát hiện một trong các trường hợp trên, quý khách có thể trao đổi trực tiếp với nhân viên giao hàng hoặc phản hồi cho chúng tôi trong vòng 24h.</span><br />
                        </li>
                        <li>Kiểm tra hàng hoá nguyên bao bì đóng gói từ chính hãng cung cấp.Một số trường hợp shop đã bóc hàng hoá ra để kiểm tra khi nhân hàng từ bên nước ngoài gửi về </li>
                    </ul>
                    <p>Chúng tôi sẽ không chấp nhận đổi hoặc trả hàng các trường hợp sau:</p>
                    <ul>
                        <li>Quý khách muốn thay đổi chủng loại, mẫu mã nhưng không thông báo trước.</li>
                        <li>Quý khách tự làm ảnh hưởng tình trạng bên ngoài như rách bao bì, bong tróc, bể vỡ,…</li>
                        <li>Quý khách vận hành không đúng chỉ dẫn gây hỏng hóc hàng hóa.</li>
                    </ul>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <img className="image-thank" src={IMAGE.payment_logo} alt="" />
                    </div>
                </div>
            </div>
        </LayoutCart>
    )
}

export default ReturnProduct;