import React, { useEffect } from 'react';
import {  UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { Link } from 'react-router-dom';
import Footer from '../../component/Footer';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const auth = getAuth();
  

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  const onFinish = (values) => {
    sendPasswordResetEmail(auth, values.username)
    .then(() => {
      toast.success('Đã gửi Email reset mất khẩu')
    })
    .catch((error) => {
      toast.error('Không thê gửi email!. Xin kiểm tra lại email!')
      // ..
    });
  };


  return (
    
    <div className='container-fluid login-container'>
      <div className='login-header'>
        <p>Apo Đăng Nhập</p>
      </div>
      <div className='login-content'>
        <div className='image-login'>
          <img src='https://topbrands.vn/wp-content/uploads/2021/08/thuong-hieu-nuoc-hoa-noi-tieng-2.jpg' alt='' />
        </div>
        <div className='form-login'>
          <p className='forgot-password' style={{color: "#2d8356", textAlign: "center", fontSize: "25px"}}>꧁༒۝♥Quên mật khẩu♥۝༒꧂</p>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Xin hãy nhập email!' }, {type: "email", message: "Đây không phải email!"}]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="phongpv@gmail.com" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Gửi Email
              </Button>
              hoặc<Link style={{marginLeft: "5px"}} to="/signin">Đăng nhập ngay!</Link>
            </Form.Item>

          </Form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
