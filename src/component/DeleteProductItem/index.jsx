import { Modal } from "antd";

const DeleteProductItem = (props) => {
    const {
        deleteItem,
        handleOk,
        handleCancel,
        isModalOpen
    } = props;
    return (
        <Modal
            title={<h5 style={{ color: "red" }}>Bạn có chắc chắn muốn xóa sản phẩm này?</h5>}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={800}
            okText="Xóa sản phẩm"
            cancelText="Hủy bỏ"
        >
            <div className="delete-item-container d-flex flex-row">
                <div className="men-item">
                    <div className="men-detail">
                        <img src={deleteItem?.image} className="men-image" alt="" />
                    </div>
                    <p>{deleteItem?.productName.toLowerCase()}</p>
                    <div className="price">
                        <p>{Number(deleteItem?.price.split(" ").join('')).toLocaleString()} VND</p>
                        <p>{Number(deleteItem?.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                    </div>
                    {deleteItem?.quantity === 0 ?
                        <p style={{ color: "red", margin: "0" }}>Đã hết hàng</p>
                        : null
                    }
                </div>
                <div className="delete-product-info ml-5">
                    <h6>Thông tin sản phẩm</h6>
                    <div className="delete-info-product">
                        <p>{deleteItem?.description}</p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteProductItem;
