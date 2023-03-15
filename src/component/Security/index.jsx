import { useEffect } from "react";
import IMAGE from "../../contact";
import "../../utils/styles/security.css";
import Layout from "../Layout";

const Security = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <Layout>
            <div className="security-container">
                <div className="security-header">
                    <p>Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Bảo mật</span></p>
                </div>
                <div className="security-content-info">
                    <h4>BẢO MẬT</h4>
                    <p className="title">Chính sách bảo mật thông tin</p>
                    <p className="title">a. Mục đích và phạm vi thu thập</p>
                    <p>Việc thu thập dữ liệu chủ yếu trên APO Phong Anh bao gồm: họ tên, email, điện thoại, địa chỉ khách hàng trong mục liên hệ. Đây là các thông tin mà APO cần thành viên cung cấp bắt buộc khi gửi thông tin nhờ tư vấn hay muốn mua sản phẩm và để APO liên hệ xác nhận lại với khách hàng trên website nhằm đảm bảo quyền lợi cho cho người tiêu dùng.</p>
                    <p>Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới thông tin mà mình cung cấp và hộp thư điện tử của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho APO về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba để có biện pháp giải quyết phù hợp.</p>
                    <p className="title">b. Phạm vi sử dụng thông tin</p>
                    <p>Công ty sử dụng thông tin thành viên cung cấp để:</p>
                    <ul>
                        <li>Liên hệ xác nhận đơn hàng và giao hàng cho thành viên khi nhận được yêu cầu từ thành viên;</li>
                        <li>Cung cấp thông tin về sản phẩm đến khách hàng nếu có yêu cầu từ khách hàng;</li>
                        <li>Gửi email tiếp thị, khuyến mại về hàng hóa do chúng tôi bán;</li>
                        <li>Gửi các thông báo về các hoạt động trao của APO</li>
                        <li>Liên lạc và giải quyết với người dùng trong những trường hợp đặc biệt</li>
                        <li>Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận và liên hệ có liên quan đến giao dịch tại APO </li>
                    </ul>
                    <p className="title">c. Thời gian lưu trữ thông tin</p>
                    <p>Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu ban quản trị hủy bỏ. Còn lại trong mọi trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của APO</p>
                    <p className="title">d. Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</p>
                    <ul>
                        <li>APO Phong Anh</li>
                        <li>17 ngách 43/2 ngõ 43 Văn Tiến Dũng,<br />phường Phúc Diễn, quận Bắc Từ Liêm, Hà Nội</li>
                        <li>phamvanphong010193@gmail.com</li>
                    </ul>
                    <p className="title">e. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình.</p>
                    <p>Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách liên hệ với ban quản trị APO thực hiện việc này.</p>
                    <p className="title">f. Cam kết bảo mật thông tin cá nhân khách hàng</p>
                    <p>Thông tin cá nhân của thành viên trên APO được APO cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của APO . Việc thu thập và sử dụng thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp luật có quy định khác.

                        Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên khi không có sự cho phép đồng ý từ thành viên.

                        Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành viên, APO sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành viên được biết.

                        Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của thành viên bao gồm thông tin hóa đơn kế toán chứng từ số hóa trên APO .

                        Ban quản lý APO yêu cầu các cá nhân khi đăng ký/mua hàng phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên, địa chỉ liên lạc, email, điện thoại,…., và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban quản lý APO không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của thành viên đó nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác</p>
                    <div style={{ width: "100%", textAlign: "center" }}>
                        <img className="image-thank" src={IMAGE.payment_logo} alt="" />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Security;
