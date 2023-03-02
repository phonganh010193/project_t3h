import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { fetchUpdateUserItem } from '../userSlice';
import { useDispatch } from 'react-redux';
import RunMockData from '../../mock/runMockData';
import Footer from '../../component/Footer';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { System } from '../../constants/system.constants';


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    if (values.password === values.confirm_password) {
      try {
        await createUserWithEmailAndPassword(auth, values.username, values.password);
        await RunMockData.runMockCategory();
        await RunMockData.runMockProduct();
        await RunMockData.runMockUser();
        const value = {
          name: values.name,
          email: values.username,
          address: values.address,
          phone: values.phone,
          avatar: "",
          roles: System.ROLESUSER.USER
        }
        await dispatch(fetchUpdateUserItem(value))
        navigate('/signin')
      } catch (err) {
        toast.error('Tên đăng nhập đã tồn tại');
      }
    } else {
      toast.error('Mật khẩu không trùng khớp')
    }

  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  return (
    <div className='container-fluid login-container'>
      <div className='login-header'>
        <p>Apo Đăng Nhập</p>
      </div>
      <div className='logout-content '>
        <div className='image-logout'>
          <img src='https://topbrands.vn/wp-content/uploads/2021/08/thuong-hieu-nuoc-hoa-noi-tieng-2.jpg' alt='' />
        </div>
        <div className='form-login'>
          <p style={{ color: "#2d8356", textAlign: "center", fontSize: "25px" }}>꧁༒۝♥SingUp♥۝༒꧂</p>
          <Form
            name="normal_login"
            className="logout-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="name"
              rules={[{ required: true, message: 'Please input your Name!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ và tên" />
            </Form.Item>
            <Form.Item
              name="address"
              rules={[{ required: true, message: 'Please input your Address!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Địa chỉ" />
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: 'Please input your Phone!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="confirm_password"
              rules={[{ required: true, message: 'Please input your ConfirmPassword!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="ConfirmPassword"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Sign up
              </Button>
              Or <a href="/signin">Login now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </div>

  );
};

export default SignUp;
