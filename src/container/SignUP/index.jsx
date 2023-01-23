import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import '../../../node_modules/antd/dist/reset.css';
import '../../utils/styles/signin.css';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';


const SignUp = () => {
  const onFinish = async(values) => {
    console.log('Received values of form sign up: ', values);
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
            rules={[{ required: true, message: 'Please input your ConfirmPassword!'}]}
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

// import { useState } from "react";

// const SignUp = () => {
//     const [registerEmail, setRegisterEmail] = useState('')
//     const [registerPassWord, setRegisterPassWord] = useState('');
//     const [registerPassWordConfirm, setRegisterPassWordConfirm] = useState('');
//     const [formErrors, setFormError] = useState({});
//     const [showValidateConfirm, setShowValidateConfirm] = useState(false)

//     const handleFormValidation = () => {    
//         let formErrors = {};    
//         let formIsValid = true;
//         //validate firstname
        
//         //Email    
//         if (!registerEmail) {    
//           formIsValid = false;    
//           formErrors["emailErr"] = "Email is required.";    
//         } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(registerEmail))) { 
//           formIsValid = false;    
//           formErrors["emailErr"] = "Invalid email."; 
//         }
//         //validate password
//         if (!registerPassWord) {    
//             formIsValid = false;    
//             formErrors["passwordErr"] = "Password is required.";    
//         } else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(registerPassWord))) { 
//             formIsValid = false;    
//             formErrors["passwordErr"] = "Invalid password."; 
//         }
//         setFormError(formErrors)
//         return formIsValid;
//     }
//     const register = () => {
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
                        
//                                             <div className="mb-4">
//                                             <input 
//                                                 type="email" 
//                                                 id="form2Example17" 
//                                                 className="form-control form-control-lg" 
//                                                 value={registerEmail}
//                                                 onChange={(event) => {
//                                                     setRegisterEmail(event.target.value)
//                                                 }}
//                                             />
//                                             <label className="form-label" for="form2Example17">Email address</label>
//                                             {formErrors.emailErr &&
//                                                 <span style={{color: "red", paddingTop: 10}}>{formErrors.emailErr}</span>
//                                             }
//                                             </div>
                        
//                                             <div className="mb-4">
//                                             <input 
//                                                 type="password" 
//                                                 id="form2Example27" 
//                                                 className="form-control form-control-lg" 
//                                                 value={registerPassWord}
//                                                 onChange={(event) => {
//                                                     setRegisterPassWord(event.target.value)
//                                                 }}
//                                             />
//                                             <label className="form-label" for="form2Example27">Password</label>
//                                             {formErrors.passwordErr &&
//                                                 <span style={{color: "red", paddingTop: 10}}>{formErrors.passwordErr}</span>
//                                             }
//                                             </div>

//                                             <div className="mb-4">
//                                             <input 
//                                                 type="confirm-password" 
//                                                 id="form2Example27" 
//                                                 className="form-control form-control-lg" 
//                                                 value={registerPassWordConfirm}
//                                                 onChange={(event) => {
//                                                     setRegisterPassWordConfirm(event.target.value);
//                                                 }}
//                                             />
//                                             {registerPassWord !== registerPassWordConfirm &&
//                                              <p className="alert-confirm-password" style={{color: "red"}}>☒ Use same password</p>
//                                             }
//                                             {registerPassWord === registerPassWordConfirm &&
//                                                 <p className="alert-confirm-password" style={{color: "green"}}>🗹 Password Matched</p>
//                                             }
//                                             <label className="form-label" for="form2Example27">ConFirmPassword</label>
//                                             </div>
                        
//                                             <div className="pt-1 mb-4">
//                                             <button id="create" className="btn btn-dark btn-lg btn-block" type="button" onClick={register}>SignUp</button>
//                                             </div>
                        
//                                             <a className="small text-muted" href="/signin">Login?</a><br/>
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

// export default SignUp;