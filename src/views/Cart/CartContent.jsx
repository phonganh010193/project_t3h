
import { Link } from "react-router-dom";
import TRtable from "./component/TRtable";
import { Modal } from 'antd';
import { toast } from "react-toastify";

const CartContent = (
    {
        user,
        dispatch,
        navigate,
        abateList,
        listCart,
        setPage,
        page,
        numberOfPage,
        product,
        setIsModalBuyOpen,
        listDataOrder,
        isModalBuyOpen,
        maxQuantity,
        setMaxQuantity,
        isModalOpen,
        updateCartOnline,
        isAllCheckbox,
        handleOnAllCheckbox,
        updateOrder,
        itemChangeNumberOrder,
        _renderPaginate,
        deleteListCart,
        ConfirmListAbate,
        BuyListAbate,
        handleCancel,
        handleOk,
        handleBuyOk,
        handleBuyCancel
    }) => {

    return (
        <div className="cart-table-info">
            <div className="table-scroll">
                <table className="table table-bordered text-center ">
                    <thead>
                        <tr>
                            <th>
                                <label className="btn-checkbox-all">
                                    <input
                                        id="toggle-all"
                                        className="toggle-all"
                                        type="checkbox"
                                        checked={isAllCheckbox() || false}
                                        data-reactid=".0.1.0"
                                        onChange={() => {
                                            handleOnAllCheckbox()
                                        }}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </th>
                            <th className="image-column" scope="col">Hình ảnh</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số Lượng</th>
                            <th scope="col">Thành tiền</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody className="body-cart-info">
                        {listDataOrder ? listDataOrder?.map((item, index) => {
                            return (
                                <TRtable
                                    key={item.id}
                                    item={item}
                                    updateOrder={updateOrder}
                                    user={user}
                                    product={product}
                                    dispatch={dispatch}
                                    itemChangeNumberOrder={itemChangeNumberOrder}
                                    setIsModalBuyOpen={setIsModalBuyOpen}
                                    isModalBuyOpen={isModalBuyOpen}
                                    maxQuantity={maxQuantity}
                                    setMaxQuantity={setMaxQuantity}
                                />
                            )
                        }) : null}
                        <tr>
                            <td colSpan="7" style={{ padding: "0" }}>
                                {listDataOrder?.length > 0 ?
                                    <ul className="pagination-cart">
                                        <li className="page-item-cart"><Link className="page-link" to="#" onClick={() => {
                                            if (page > 0) {
                                                setPage(page - 1);
                                            }
                                        }}><i className='fas fa-angle-double-left' style={{ color: "#2d8356" }}></i></Link></li>
                                        {_renderPaginate()}
                                        <li className="page-item-cart"><Link className="page-link" to="#" onClick={() => {
                                            if (page < (numberOfPage - 1)) {
                                                setPage(page + 1);
                                            }
                                        }}><i className='fas fa-angle-double-right' style={{ color: "#2d8356" }}></i></Link></li>
                                    </ul>
                                    : null
                                }
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div className="btn-all-info">
                <button onClick={() => {
                    navigate("/");
                }}>Tiếp tục mua sắm</button>
                <div className="btn-left">
                    <button onClick={() => {
                        try {
                            updateCartOnline()
                            toast.success('Cập nhật giỏ hàng thành công')
                        } catch (error) {
                            toast.error('Cập nhật giỏ hàng không thành công!')
                        }
                    }}>Cập nhật giỏ hàng</button>
                    <button onClick={() => {
                        deleteListCart();
                    }}>Xóa giỏ hàng</button>
                </div>
            </div>
            <div className="all-price">
                <table className="table table-bordered pay-info-table" style={{ width: "40%", marginTop: "10px" }}>
                    <tbody>
                        <tr>
                            <td>Tổng tiền thanh toán</td>
                            <td>{listCart.filter(el => el.isCheckBox && el.quantity !== 0).reduce(
                                (accumulator, currentValue) => accumulator + Number(Number(currentValue.price.split(" ").join('')) * Number(currentValue.orderNumber)),
                                0
                            ).toLocaleString()} VND</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => {
                    const findItem = listCart?.find(el => el.isCheckBox)
                    if (!findItem) {
                        ConfirmListAbate();
                    } else {
                        BuyListAbate();
                    }
                }}>Thanh toán</button>
            </div>
            <Modal
                title={<p style={{ color: "green" }}>Đơn hàng của bạn chưa hoàn thành. Bạn có muốn tiếp tục?</p>}
                open={isModalOpen}
                onCancel={false}
                closable={false}
                cancelText="Hủy đơn hàng"
                style={{
                    marginTop: "180px"
                }}
                footer={
                    <div className="btn-confirm-order">
                        <button onClick={() => {
                            handleCancel(abateList?.key)
                        }}>Hủy đơn hàng</button>
                        <button onClick={() => {
                            handleOk(abateList?.key)
                        }}>Tiếp tục</button>
                    </div>
                }
            />
            <Modal
                title={<p style={{ color: "green", width: "98%" }}>Hiện tại số sản phẩm tối đa bạn có thể mua cho sản phẩm này là {maxQuantity}. Nếu muốn mua số lượng lớn vui lòng liên hệ trực tiếp shop. Xin cảm ơn!</p>}
                open={isModalBuyOpen}
                onOk={handleBuyOk}
                onCancel={handleBuyCancel}
                style={{
                    marginTop: "160px"
                }}
                footer={false}
            />

        </div>
    )
}

export default CartContent;
