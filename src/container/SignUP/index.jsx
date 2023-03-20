import React from 'react';
import { LockOutlined, UserOutlined, PhoneOutlined, AimOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { fetchUpdateUserItem } from '../userSlice';
import { useDispatch } from 'react-redux';
import RunMockData from '../../mock/runMockData';
import Footer from '../../component/Footer';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { System } from '../../constants/system.constants';
import { useContext } from 'react';
import { UserContext } from '../useContext';
import Loading from '../../component/Loading';
import { useState } from 'react';


const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false)
  const onFinish = async (values) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.username, values.password);
      setIsLoading(false)
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
      navigate('/')
    } catch (err) {
      toast.error('Tên đăng nhập đã tồn tại');
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      {isLoading === false ?
        <div className='container-fluid login-container'>
          <div className='login-header'>
            <p>Apo Đăng Nhập</p>
          </div>
          <div className='logout-content '>
            <div className='image-logout'>
              <img src='https://topbrands.vn/wp-content/uploads/2021/08/thuong-hieu-nuoc-hoa-noi-tieng-2.jpg' alt='' />
            </div>
            <div className='form-login'>
              <p style={{ color: "#2d8356", textAlign: "center", fontSize: "25px" }}>꧁༒۝♥Đăng Ký♥۝༒꧂</p>
              <Form
                name="normal_login"
                className="logout-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="name"
                  rules={[{ required: true, message: 'Xin hãy nhập họ tên!' }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Họ và tên" />
                </Form.Item>
                <Form.Item
                  name="address"
                  rules={[{ required: true, message: 'Xin hãy nhập địa chỉ!' }]}
                >
                  <Input prefix={<AimOutlined className="site-form-item-icon" />} placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item
                  name="phone"
                  rules={[
                    { required: true, message: 'Xin hay nhập số điện thoại!' },

                  ]}
                >
                  <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Số điện thoại" />
                </Form.Item>
                <Form.Item
                  name="username"
                  rules={[{ required: true, message: 'Xin hãy nhập Email!' }, { type: "email", message: "Đây không phải email" }]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="atbd@gmail.com" />
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
                <Form.Item
                  name="confirm_password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Xin hãy xác nhận mật khẩu',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu không trùng khớp'));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                  />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Đăng ký
                  </Button>
                  hoặc <Link to="/signin">Đăng nhập ngay!</Link>
                </Form.Item>
              </Form>
            </div>
          </div>
          <Footer />
        </div>
        : <Loading />
      }
    </>
  );
};

export default SignUp;
