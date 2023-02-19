import IMAGE from "../../contact";
import LayoutCart from "../LayoutCart";
import React from 'react'
import { Button, Form, Input } from 'antd';
import "../../utils/styles/renraku.css";
import { push, ref } from "@firebase/database";
import { async } from "q";
import { database } from "../../firebase";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../container/useContext";
import { useState } from "react";
const layout = {

    labelCol: { span: 16 },
    wrapperCol: { span: 24 },
};

/* eslint-disable no-template-curly-in-string */
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
const Renraku = () => {
    const { user } = useContext(UserContext)
    const [fields, setFields] = useState([])
    const onFinish = async (values) => {
        console.log('values', values);
        await push(ref(database, "Renraku"), {
            ...values,
            user: user.email
        })
            .then(() => {
                toast.success('Gửi liên hệ thành công')
            })
            .catch((error) => {
                console.log(error)
                toast.error('Gửi thật bại')
            })
        setFields([
            {
                name: ['renraku', 'name'],
                value: ''
            },
            {
                name: ['renraku', 'email'],
                value: ''
            },
            {
                name: ['renraku', 'introduction'],
                value: ''
            }
        ])
    };
    return (
        <LayoutCart>
            <div className="renraku-container" style={{ width: "100%" }}>
                <p style={{ borderBottom: "1px solid gray" }}>Trang chủ/<span style={{ color: "#2d8356" }}>Liên hệ</span></p>
                <a target="_blank" href="https://www.google.com/maps/place/43+%C4%90.+V%C4%83n+Ti%E1%BA%BFn+D%C5%A9ng,+Ph%C3%BAc+Di%E1%BB%85n,+T%E1%BB%AB+Li%C3%AAm,+H%C3%A0+N%E1%BB%99i,+Vi%E1%BB%87t+Nam/@21.0492864,105.7466989,17z/data=!3m1!4b1!4m5!3m4!1s0x313454efb22ead83:0xb31d1b2467c5d9dc!8m2!3d21.0492814!4d105.7488876?hl=vi-VN"><img style={{ width: "100%" }} src={IMAGE.renraku} alt="" /></a>
                <div className="renraku-content">

                    <div className="content-right">

                        <img src={IMAGE.logo2} alt="" />
                        <ul>
                            <li>
                                <div className="icon-logo-renraku">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" style={{ color: "#fff1a6" }} fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                </div>
                                <p>17 ngách 43/2 ngõ 43 Văn Tiến Dũng,<br />phường Phúc Diễn, quận Bắc Từ Liêm, Hà Nội</p>
                            </li>
                            <li>
                                <div className="icon-logo-renraku">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" style={{ color: "#fff1a6" }} fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>
                                <p>+037 9010 193</p>
                            </li>
                            <li>
                                <div className="icon-logo-renraku">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" style={{ color: "#fff1a6" }} fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                    </svg>
                                </div>
                                <p>phamvanphong010193@gmail.com</p>
                            </li>
                        </ul>
                    </div>
                    <div className="content-left">
                        <Form
                            {...layout}
                            layout="vertical"
                            name="nest-messages"
                            onFinish={onFinish}
                            fields={fields}
                            className="form-lh"
                            style={{
                                maxWidth: 600,
                                width: "75%"
                            }}
                            validateMessages={validateMessages}
                        >
                            <Form.Item
                                name={['renraku', 'name']}
                                label="Họ và tên"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name={['renraku', 'email']}
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item name={['renraku', 'introduction']} label="Viết bình luận" >
                                <Input.TextArea className="note" />
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                    offset: 2,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Gửi liên hệ
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>

            </div>

        </LayoutCart>
    )
}

export default Renraku;
