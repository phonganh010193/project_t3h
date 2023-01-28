import { ref, remove } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { database } from "../../../firebase";
import "../../../utils/styles/userinfo.css";
import { fetchListAbate } from "../orderSlice";

const AbateInfo = (props) => {
  const dispatch = useDispatch();
  const abateList = useSelector(({order}) => order.abateList);
  console.log('abateList', abateList);
  

  useEffect(() => {
    dispatch(fetchListAbate());
  }, [dispatch])
  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const sumPrice = abateList?.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.price*currentValue.orderNumber),
    0
  );

  return (
    <div className="abate-info">
      <div className="abate-info-left">
        <div className="m-billing-info">
          <h2>Thông tin thanh toán</h2>
          <div className="m-billing-info-step">
              <p>Xin hãy nhập thông tin thanh toán</p>
          </div>
          <div className="m-billing-field">
            <div className="m__small-billing-field">
              <input 
                type="text" 
                placeholder="Họ và tên" 
              />
            </div>
          </div>

          <div className="m-billing-field">
            <div className="m__small-billing-field">
            <input 
              type="text" 
              placeholder="Email" 
            />
            </div>
          </div>

          <div className="m-billing-field">
            <div className="m__small-billing-field">
            <input 
              type="text" 
              placeholder="Địa chỉ" 
            />
            </div>
          </div>

          <div className="m-billing-field">
            <div className="m__small-billing-field">
            <input 
              type="text" 
              placeholder="Số điện thoại" 
            />
            </div>
          </div>
          <div className="m-billing-field">
            <div className="m__small-billing-field">
            <input 
              type="text" 
              placeholder="Tỉnh thành" 
            />
            </div>
          </div>
          <div className="m-billing-field">
            <div className="m__small-billing-field">
              <textarea 
                type="text" 
                placeholder="Ghi chú (tùy chọn)" 
              />
            </div>
          </div>
        </div>
        <div className="forms-payment">
          <h2>Hình thức thanh toán</h2>
          <div className="pay-delivery">
            <div>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
              <label for="html">
                Thanh toán khi giao hang
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="cofirm-payment">
        <h2>Đơn hàng</h2>
        <div className="product-cofirm-payment">
          {abateList && abateList.map((item, index) => {
            return (
              <div className="info-product-abate">
                <img src={item.image} alt="" />
                <div style={{textAlign: "left"}}>
                  <p>{item.productName}</p>
                  <p>Số lượng: {item.orderNumber}</p>
                </div>
              </div>
            )
          })}
          
        </div>
        <div className="payment-info">
          <div>
            <p>Tạm tính thanh toán</p>
            <p>{sumPrice}</p>
          </div>
          <div>
            <p>Chi phí vận chuyển</p>
            <p>-</p>
          </div>
        </div>
        <div className="price-payment">
          <div>
            <p>Tổng thanh toán</p>
            <p>5.900.000 đ</p>
          </div>
          <button>Xác nhận ĐẶT HÀNG</button>
        </div>
        <div style={{marginLeft: "5px"}}>
          <Link to='/cart' onClick={() => {
            remove(ref(database, "Abate"))
            .then(() => {
              dispatch(fetchListAbate());
              console.log('remove ListAbate success')
            })
            .catch((error) => {
              console.log(error)
            })
          }}>Quay về Giỏ hàng</Link>
        </div>
      </div>
    </div>
  )
}

export default AbateInfo;
