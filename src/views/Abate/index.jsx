import { push, ref, remove, update } from "firebase/database";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutCart from "../../component/LayoutCart";
import { database } from "../../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { fetchAbateById } from "./abateSlice";
import "../../utils/styles/userinfo.css";
import { async } from "@firebase/util";
import { System } from "../../constants/system.constants";

const Abate = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    console.log('orderId', orderId);
    const abateDetail = useSelector(({ abate }) => abate.abateDetail);
    console.log('abateDetail', abateDetail);
    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 14,
        },
    };

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

    useEffect(() => {
        dispatch(fetchAbateById(orderId));
    }, [dispatch]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    const onFinish = async(values) => {
        await update(ref(database, "/Abate/" + orderId), {
            name: values.user.name,
            email: values.user.email,
            address: values.user.address,
            phone: values.user.phone,
            note: values.user.note,
            pay_dilivery: values.user.pay_dilivery,
            products: abateDetail.products,
            status: System.STATUS.ORDERED,
        })
        .then(() => {
            toast.success('Order thành công!')
        })
        .catch((error) => {
            toast.error('order không thành công')
        })

    };
    return (
        <LayoutCart>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                className="abate-info"
            >
                <div className="abate-info-left">
                    <div className="m-billing-info">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItem: 'center',
                        }}>
                            <h2>Thông tin thanh toán</h2>
                            <p style={{
                                padding: '5px 20px',
                                border: '2px solid #71973e',
                                color: '#71973e',
                                fontWeight: '900',
                                marginLeft: '10px',
                            }}>ORDERED</p>
                        </div>
                        
                        <div className="m-billing-info-step">
                            <p>Xin hãy nhập thông tin thanh toán</p>
                        </div>
                        <Form.Item
                            name={['user', 'name']}
                            label="Họ tên"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'email']}
                            label="Email"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name={['user', 'address']}
                            label="Địa Chỉ"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name={['user', 'phone']}
                            label="Phone number"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item name={['user', 'note']} label="Ghi chú">
                            <Input.TextArea />
                        </Form.Item>

                    </div>
                    <div className="forms-payment">
                        <h2>Hình thức thanh toán</h2>
                        <div className="pay-delivery">
                            <Form.Item
                                name={['user', 'pay_dilivery']}
                                valuePropName="checked"
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                            >
                                <Checkbox>Thanh toán khi nhận hàng</Checkbox>
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="cofirm-payment">
                    <h2>Đơn hàng</h2>
                    <div className="product-cofirm-payment">
                        {(abateDetail?.products || [])?.map((item, index) => {
                            return (
                                <div className="info-product-abate" key={item.id}>
                                    <img src={item.image} alt="" />
                                    <div style={{ textAlign: "left" }}>
                                        <p>{item.productName}</p>
                                        <p>Gía: {Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>Số lượng: {item.orderNumber}</p>
                                        <p>Thành tiền: {(Number(item.price.split(" ").join('')) * item.orderNumber).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                    <div className="payment-info">
                        <div>
                            <p>Tạm tính thanh toán</p>
                            <p>{(abateDetail?.products || [])?.reduce(
                                (accumulator, currentValue) => accumulator + Number(Number(currentValue?.price?.split(" ").join('')) * Number(currentValue?.orderNumber)),
                                0
                            )?.toLocaleString()} VND</p>
                        </div>
                        <div>
                            <p>Chi phí vận chuyển</p>
                            <p>-</p>
                        </div>
                    </div>
                    <div className="price-payment">
                        <div>
                            <p>Tổng thanh toán</p>
                            <p>{(abateDetail?.products || [])?.reduce(
                                (accumulator, currentValue) => accumulator + Number(Number(currentValue?.price?.split(" ").join('')) * Number(currentValue?.orderNumber)),
                                0
                            )?.toLocaleString()} VND</p>
                        </div>
                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 8,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Xác nhận ĐĂT HÀNG
                            </Button>
                        </Form.Item>
                    </div>
                    <div style={{ marginLeft: "5px" }}>
                        <Link to='/cart' onClick={() => {
                            remove(ref(database, "Abate"))
                                .then(() => {
                                    dispatch(fetchAbateById(orderId));
                                })
                                .catch((error) => {
                                    console.log(error)
                                })
                        }}>Quay về Giỏ hàng</Link>
                    </div>
                </div>
            </Form>
        </LayoutCart>
    )
}

export default Abate;
