import Layout from "../Layout"
import "../../utils/styles/newservice.css";

const NewService = () => {
    return (
        <Layout>
            <div className="new-service-container">
                <div className="new-service-header">
                    <p>Trang chủ / <span style={{ color: "#2d8356" }}>Dịch vụ mới</span></p>
                </div>
                <div className="new-service-info">
                    <p>Chưa có dịch vụ mới</p>
                </div>
            </div>
        </Layout>
    )
}

export default NewService;
