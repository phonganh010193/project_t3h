import React, { useContext, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../useContext';
import RunMockData from '../../mock/runMockData';

const SignIn = () => {
  const navigate = useNavigate();
  const { user, fetchUser} = useContext(UserContext);
  
  const onFinish = async(values) => {
    await RunMockData.runMockCategory();
    await RunMockData.runMockProduct();
    await RunMockData.runMockCart();
    await fetchUser(values);
  };

  useEffect(() => {
    if (user) {
      console.log('user', user);
      navigate('/');
    }
  }, [user]);

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
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
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

  );
};

export default SignIn;
// import { useState } from "react";

// const SignIn = () => {
//     const [loginEmail, setLoginEmail] = useState('')
//     const [loginPassWord, setLoginPassWord] = useState('');
//     const [formErrors, setFormError] = useState({});

//     const handleFormValidation = () => {    
//         let formErrors = {};    
//         let formIsValid = true;
//         //validate firstname
        
//         //Email    
//         if (!loginEmail) {    
//           formIsValid = false;    
//           formErrors["emailErr"] = "Email is required.";    
//         } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginEmail))) { 
//           formIsValid = false;    
//           formErrors["emailErr"] = "Invalid email."; 
//         }
//         //validate password
//         if (!loginPassWord) {    
//             formIsValid = false;    
//             formErrors["passwordErr"] = "Password is required.";    
//           } else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(loginPassWord))) { 
//             formIsValid = false;    
//             formErrors["passwordErr"] = "Invalid password."; 
//           }
//         setFormError(formErrors)
//         return formIsValid;
//     }
//     const login = () => {
//         handleFormValidation();
//     }

//     return (
//         <section className="vh-100" style={{backgroundColor: "#9A616D"}}>
//             <div className="container py-5 h-100">
//                 <div className="row d-flex justify-content-center align-items-center h-100">
//                     <div className="col col-xl-10">
//                         <div className="card" style={{borderRadius: "1rem"}}>
//                             <div className="row g-0">
//                                 <div className="col-md-6 col-lg-5 d-none d-md-block">
//                                     <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
//                                     alt="login form" className="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
//                                 </div>
//                                 <div className="col-md-6 col-lg-7 d-flex align-items-center">
//                                     <div className="card-body p-4 p-lg-5 text-black">
//                                         <form>
//                                             <div className="d-flex align-items-center mb-3 pb-1">
//                                             <i className="fas fa-cubes fa-2x me-3" style={{color: "#ff6219"}}></i>
//                                             <span className="h1 fw-bold mb-0">Logo</span>
//                                             </div>
                        
//                                             <h5 className="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>
                        
//                                             <div className="form-outline mb-4">
//                                             <input 
//                                                 type="email" id="form2Example17" 
//                                                 className="form-control form-control-lg" 
//                                                 value={loginEmail}
//                                                 onChange={(event) => {
//                                                     setLoginEmail(event.target.value)
//                                                 }}
//                                             />
//                                             <label className="form-label" for="form2Example17">Email address</label>
//                                             {formErrors.emailErr &&
//                                                 <span style={{color: "red", paddingTop: 10}}>{formErrors.emailErr}</span>
//                                             }
//                                             </div>
                        
//                                             <div className="form-outline mb-4">
//                                             <input 
//                                                 type="password" 
//                                                 id="form2Example27" 
//                                                 className="form-control form-control-lg" 
//                                                 value={loginPassWord}
//                                                 onChange={(event) => {
//                                                     setLoginPassWord(event.target.value);
//                                                 }}
//                                             />
//                                             <label className="form-label" for="form2Example27">Password</label>
//                                             {formErrors.passwordErr &&
//                                                 <span style={{color: "red", paddingTop: 10}}>{formErrors.passwordErr}</span>
//                                             }
//                                             </div>
                        
//                                             <div className="pt-1 mb-4">
//                                             <button className="btn btn-dark btn-lg btn-block" type="button"
//                                             onClick={login}>Login</button>
//                                             </div>
                        
//                                             <a className="small text-muted" href="#!">Forgot password?</a>
//                                             <p className="mb-5 pb-lg-2" style={{color: "#393f81"}}>Don't have an account? <a href="/signup"
//                                                 style={{color: "#393f81"}}>Register here</a></p>
//                                             <a href="#!" className="small text-muted">Terms of use.</a>
//                                             <a href="#!" className="small text-muted">Privacy policy</a>
//                                         </form>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// export default SignIn;