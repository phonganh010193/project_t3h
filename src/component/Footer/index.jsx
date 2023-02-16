import { Link } from "react-router-dom";
import IMAGE from "../../contact";
import "../../utils/styles/footer.css";

function Footer() {
    return (
        <div className="container-fluid footer-content">
            <div className="row">
                <div className="col-lg-8 footer-item">
                    <div className="footer-logo">
                        <img src={IMAGE.logo} alt="" />
                        <ul>
                            <li>
                                <div className="icon-logo-footer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" style={{ color: "#fff1a6" }} fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                </div>
                                <p>17 ngách 43/2 ngõ 43 Văn Tiến Dũng,<br />phường Phúc Diễn, quận Bắc Từ Liêm, Hà Nội</p>
                            </li>
                            <li>
                                <div className="icon-logo-footer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" style={{ color: "#fff1a6" }} fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>
                                <p>+037 9010 193</p>
                            </li>
                            <li>
                                <div className="icon-logo-footer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" style={{ color: "#fff1a6" }} fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg>
                                </div>
                                <p>phamvanphong010193@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="policy">
                        <h5>Chính Sách</h5>
                        <ul>
                            <li>
                                <Link to="/payment">Thanh toán</Link>
                            </li>
                            <li>
                                <Link to="/transport">Vận chuyển</Link>
                            </li>
                            <li>
                                <Link to="/return-product">Đổi trả</Link>
                            </li>
                            <li>
                                <Link to="/guerantee">Bảo hành</Link>
                            </li>
                            <li>
                                <Link to="/security">Bảo mật</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "30px", marginLeft: "30px" }}>
                        <div className="footer-map">
                            <h5>Bản đồ</h5>
                            <a target="_blank" href="https://www.google.com/maps/place/43+%C4%90.+V%C4%83n+Ti%E1%BA%BFn+D%C5%A9ng,+Ph%C3%BAc+Di%E1%BB%85n,+T%E1%BB%AB+Li%C3%AAm,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0492864,105.7466989,17z/data=!3m1!4b1!4m5!3m4!1s0x313454efb22ead83:0xb31d1b2467c5d9dc!8m2!3d21.0492814!4d105.7488876?hl=vi-VN">
                                <img src={IMAGE.map} alt="" />
                            </a>
                        </div>
                        <div className="fanpage">
                            <h5>FanPage</h5>
                            <a target="_blank" href="https://www.facebook.com/profile.php?id=100085660191588">
                                <img src={IMAGE.fanpage} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8 footer-end">
                    <p>© Bản quyền thuộc về Phong Anh | Cung cấp bởi Apo</p>
                    <p>HKD Phong Anh- số ĐKKD 010193PT080999 do UBND Q Phong Thu cấp ngày 06/05/2018<br />Đã khai báo với Bộ Công Thương</p>
                </div>
            </div>
        </div>
    );
}

export default Footer;
