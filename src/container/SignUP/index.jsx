import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUp = () => {
  const onFinish = async (values) => {
    try {
      const user = createUserWithEmailAndPassword(auth, values.username, values.password);
      console.log('user', user)
    } catch (err) {
      console.log(err.response.data)
    }
  };

  return (
    <div className='login-content'>
      <div className='image-login'>
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
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm-password"
            rules={[{ required: true, message: 'Please input your ConfirmPassword!' }]}
          >
            <Input
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
