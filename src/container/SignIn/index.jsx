import React, { useContext, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../useContext';
import RunMockData from '../../mock/runMockData';
import Footer from '../../component/Footer';
import { useState } from 'react';
import Loading from '../../component/Loading';

const SignIn = () => {
  const navigate = useNavigate();
  const { user, fetchUser, isLoadingUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false)
  const onFinish = async (values) => {
    await RunMockData.runMockCategory();
    await RunMockData.runMockProduct();
    await RunMockData.runMockUser();
    await fetchUser(values);
  };

  useEffect(() => {
    if (!user && isLoadingUser === true) {
      setLoading(true)
    } else if (user) {
      setLoading(false)
      RunMockData.runMockCart(user);
      navigate('/');
    }
  }, [user, isLoadingUser]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      {loading === false ?
        <div className='container-fluid login-container'>
          <div className='login-header'>
            <p>Apo Đăng Nhập</p>
          </div>
          <div className='login-content'>
            <div className='image-login'>
              <img src='https://topbrands.vn/wp-content/uploads/2021/08/thuong-hieu-nuoc-hoa-noi-tieng-2.jpg' alt='' />
            </div>
            <div className='form-login'>
              <p style={{ color: "#2d8356", textAlign: "center", fontSize: "25px" }}>꧁༒۝♥SingIn♥۝༒꧂</p>
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
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <Link className="login-form-forgot" to="/forgot-password">
                    Forgot password
                  </Link>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <a href="/signup">register now!</a>
                </Form.Item>

              </Form>
            </div>
          </div>
          <Footer />
        </div>
        :
        <Loading />
      }

    </>
  );
};

export default SignIn;
