import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import IMAGE from "../../contact";
import "../../utils/styles/cart.container.css";
import { fetchProduct } from "../MainInfo/PerfumeInfo/perfumeInfoSlice";
import { fetchOrderProduct } from "./orderSlice";

const CartInfo = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [number, setNumber] = useState(null)
    const orderList = useSelector(({order}) => order.orderProduct);
    const product = useSelector(({product}) => product.productList);
    console.log('product from cart', product);
    console.log('order list', orderList);
    const listCart = [];
    if(product && orderList) {
        product.forEach(el => {
            orderList.forEach(item => {
                if(el.id === item.productId) {

                    listCart.push(
                        {
                            ...el,
                            numberOrder: item.orderNumber
                        }
                    );
                }
            })
        })
    }
    console.log('list', listCart);
    
    


    useEffect(() => {
        dispatch(fetchOrderProduct());
        dispatch(fetchProduct());
    }, [dispatch]);
    return (
        <div className="cart-container">
            <div className="header-cart">
                <p>Trang chu/ Gio hang</p>
            </div>
            <div className="cart-table-info">
                <p>Gio hang</p>
                <table className="table table-bordered text-center">
                    <thead>
                        <tr>
                            <th></th>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Tên Sản Phẩm</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số Lượng</th>
                            <th scope="col">Thành tiền</th>
                            <th scope="col">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listCart && listCart.map((item, index) => {
                            return (
                                <TRtable key={item.id} item={item} />
                            )
                        })}
                    </tbody>
                </table>
                <div className="btn-all-info">
                    <button onClick={() => {
                        navigate(-1);
                    }}>Tiếp tục mua sắm</button>
                    <div className="btn-left">
                        <button>Cập nhật giỏ hàng</button>
                        <button>Xóa giỏ hàng</button>
                    </div>
                </div>
                <div className="all-price">
                    <table className="table table-bordered" style={{width: "30%", marginTop: "10px"}}>
                        <td>Tổng tiền thành toán</td>
                        <td>5.900.000đ</td>
                    </table>
                    <button><Link to="/abate">Thanh toán</Link></button>
                </div>
                

            </div>
        </div>
    )
}

export default CartInfo;

const TRtable = ({item}) => {
    // console.log('item.orderNumber', item, item.numberOrder);
    const [number, setNumber] = useState(item.numberOrder);

    // useEffect(() => {
    //     co
    //     setNumber(item.orderNumber);
    // }, [item]);

    return (
        <tr key={item.id}>
            <td><input type="checkbox" /></td>
            <td>
                <img className="image-cart" src={item.image} alt="" />
            </td>
            <td>{item.productName}</td>
            <td>{item.price}</td>
            <td>
                <input type="number" value={number} className="text-center" min="1" max="5" onChange={(text) => {
                    setNumber(text.target.value);
                }}/>
            </td>
            <td>Thành tiền</td>
            <td><img className="image-delete" src={IMAGE.delete} alt="" /></td>
        </tr>
    );
}
