import { useNavigate } from "react-router-dom";

const DataProduct = (props) => {
    const {
        item,
        setIsModalOpen,
        setDeleteItem,
        index,
        key,
        navigate
    } = props;
    return {
        key: key,
        stt: index + 1,
        avatar: <img style={{ width: "35px" }} src={item.image} alt="" />,
        name: <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>,
        number: <div className="d-flex flex-row">
            <span style={{ marginRight: "20px" }}>{item.quantity}</span>
            {item.quantity >= 1 && item.quantity <= 5 ?
                <div style={{ border: "1px solid #ffc107", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "#ffc107", fontSize: "15px", margin: "0" }}>Sắp hết hàng</span></div> :
                item.quantity === 0 ?
                    <div style={{ border: "1px solid red", width: "100px", textAlign: "center", borderRadius: "5px" }}><span style={{ color: "red", fontSize: "15px", margin: "0" }}>Hết hàng</span></div> : null
            }
        </div>,
        action: <div className="action-product">
            <button onClick={(event) => {
                event.preventDefault();
                navigate(`/admin/product/update/${item.id}`)
            }}>Cập nhật</button>
            <button onClick={(event) => {
                event.preventDefault();
                setIsModalOpen(true);
                setDeleteItem(item);
            }}>Xóa</button>
        </div>
    }
}

export default DataProduct;
