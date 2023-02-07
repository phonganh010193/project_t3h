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


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
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
        avatar: ""
      }
      await dispatch(fetchUpdateUserItem(value))
      navigate('/signin')
    } catch (err) {
      console.log(err.response.data)
    }
  };

  return (
    <div className='logout-content '>
      <div className='image-logout'>
        <img src='https://topbrands.vn/wp-content/uploads/2021/08/thuong-hieu-nuoc-hoa-noi-tieng-2.jpg' alt='' />
      </div>
      <div className='form-login'>
        <Form
          name="normal_login"
          className="login-form"
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
            name="confirm-password"
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

  );
};

export default SignUp;
