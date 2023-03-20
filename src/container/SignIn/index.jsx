import React, { useContext, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../useContext';
import RunMockData from '../../mock/runMockData';
import Footer from '../../component/Footer';
import Loading from '../../component/Loading';

const SignIn = () => {
  const navigate = useNavigate();
  const { user, fetchUser, isLoadingUser } = useContext(UserContext);
  const onFinish = async (values) => {
    await RunMockData.runMockCategory();
    await RunMockData.runMockProduct();
    await RunMockData.runMockUser();
    await fetchUser(values);
  };

  useEffect(() => {
    if (user) {
      RunMockData.runMockCart(user);
      navigate('/');
    }
  }, [user, navigate]);


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      {isLoadingUser === false ?
        <div className='container-fluid login-container'>
          <div className='login-header'>
            <p>Apo Đăng Nhập</p>
          </div>
          <div className='login-content'>
            <div className='image-login'>
              <img src='https://topbrands.vn/wp-content/uploads/2021/08/thuong-hieu-nuoc-hoa-noi-tieng-2.jpg' alt='' />
            </div>
            <div className='form-login'>
              <p style={{ color: "#2d8356", textAlign: "center", fontSize: "25px" }}>꧁༒۝♥Đăng nhập♥۝༒꧂</p>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    { required: true, message: 'Xin hãy nhập Email' },
                    { type: "email", message: 'Đây không phải là email!' }
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="phongpv@gmail.com" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[{ pattern: new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/), message: "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt" },
                  { required: true, message: "Xin hãy nhập mật khẩu!", },]}
                  hasFeedback
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Ghi nhớ</Checkbox>
                  </Form.Item>

                  <Link className="login-form-forgot" to="/forgot-password">
                    Quên mật khẩu
                  </Link>
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng nhập
                  </Button>
                  Or <Link to="/signup">Đăng ký!</Link>
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
