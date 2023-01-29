import { push, ref, remove } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { database } from "../../../firebase";
import "../../../utils/styles/userinfo.css";
import { fetchListAbate } from "../orderSlice";
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { useContext } from "react";
import { UserContext } from "../../../container/useContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AbateInfo = (props) => {
  const dispatch = useDispatch();
  const { user } = useContext(UserContext);
  const abateList = useSelector(({order}) => order.abateList);
  console.log('abateList', abateList);
  
  const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  useEffect(() => {
    dispatch(fetchListAbate());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  const sumPrice = abateList?.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.price*currentValue.orderNumber),
    0
  );

  const onFinish = (values) => {
    const infoOrder = {
      ...values,
      dateOrder: new Date(),
      orderList: abateList
    };
    console.log('infoOrder', infoOrder);
    push(ref(database, "CompleteOrder", infoOrder))
    .then(() => {
      toast.success('Order thành công')
    })
    .catch((error) => {
      console.log(error)
      toast.error('Order không thành công');
    })
  };
  
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={validateMessages}
      className="abate-info"
    >
      <div className="abate-info-left">
        <div className="m-billing-info">
          <h2>Thông tin thanh toán</h2>
          <div className="m-billing-info-step">
              <p>Xin hãy nhập thông tin thanh toán</p>
          </div>
          <Form.Item
            name={['user', 'name']}
            label="Họ tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'email']}
            label="Email"
            rules={[
              {
                type: 'email',
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={['user', 'address']}
            label="Địa Chỉ"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item 
            name={['user', 'phone']} 
            label="Phone number"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'note']} label="Ghi chú">
            <Input.TextArea />
          </Form.Item>
          
        </div>
        <div className="forms-payment">
          <h2>Hình thức thanh toán</h2>
          <div className="pay-delivery">
            <Form.Item 
            name={['user', 'pay_dilivery']} 
            valuePropName="checked" 
            noStyle
            rules={[
              {
                required: true,
              },
            ]}
            >
              <Checkbox>Thanh toán khi nhận hàng</Checkbox>
            </Form.Item>
          </div>
        </div>
      </div>
      
      <div className="cofirm-payment">
        <h2>Đơn hàng</h2>
        <div className="product-cofirm-payment">
          {abateList && abateList.map((item, index) => {
            return (
              <div className="info-product-abate" key={item.id}>
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
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Xác nhận ĐĂT HÀNG
            </Button>
          </Form.Item>
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
    </Form>
  )
}

export default AbateInfo;
