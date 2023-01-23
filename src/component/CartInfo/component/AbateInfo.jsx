import "../../../utils/styles/userinfo.css";

const AbateInfo = () => {
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
          <img src="https://bizweb.dktcdn.net/thumb/grande/100/110/910/products/8727377c-b4b9-4255-9c30-7d6f9c8098c2.webp?v=1670495875373" alt="" />
          <p>PENHALIGON'S ARTHUR (unisex)</p>
        </div>
        <div className="payment-info">
          <div>
            <p>Tạm tính thanh toán</p>
            <p>5.900.000 đ</p>
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
      </div>
    </div>
  )
}

export default AbateInfo;
