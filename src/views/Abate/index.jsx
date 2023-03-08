import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { Link, useParams } from "react-router-dom";
import { fetchAbateById, fetchRemoveAbateById, fetchUpdateAbateById } from "./abateSlice";
import "../../utils/styles/abate.css";
import { System } from "../../constants/system.constants";
import IMAGE from "../../contact";
import { usePrevious } from "../../utils/hooks";
import { useState } from "react";
import { fetchProduct, updateQuantityProductByBuy } from "../Perfume/perfumeInfoSlice";
import { fetchOrderProduct } from "../Cart/orderSlice";
import { UserContext } from "../../container/useContext";

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
        checkbox: '${label} is not a valid checkbox!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

const layout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 14,
    },
};

const Abate = () => {
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const abateDetail = useSelector(({ abate }) => abate.abateDetail);
    console.log('abaateDetail', abateDetail);
    const isLoading = useSelector(({ abate }) => abate.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const isLoadingUpdate = useSelector(({ abate }) => abate.isLoadingUpdate);
    const prevIsLoadingUpdate = usePrevious(isLoadingUpdate);
    const [fields, setFields] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (!isLoadingUpdate && prevIsLoadingUpdate) {
            dispatch(updateQuantityProductByBuy(orderId))
        }
    }, [isLoadingUpdate])



    useEffect(() => {
        if (!isLoading && prevIsLoading && abateDetail.status === System.STATUS.ORDERING) {
            setFields([
                {
                    name: ['user', 'name'],
                    value: abateDetail?.products[0]?.user?.name,
                },
                {
                    name: ['user', 'email'],
                    value: abateDetail?.products[0]?.user?.email,
                },
                {
                    name: ['user', 'address'],
                    value: abateDetail?.products[0]?.user?.address,
                },
                {
                    name: ['user', 'phone'],
                    value: abateDetail?.products[0]?.user?.phone,
                },
                {
                    name: ['user', 'note'],
                    value: abateDetail?.note,
                },
                {
                    name: ['user', 'pay_dilivery'],
                    value: abateDetail?.pay_dilivery,
                }

            ]);
        } else if (!isLoading && prevIsLoading && abateDetail.status === System.STATUS.ORDERED) {
            setFields([
                {
                    name: ['user', 'name'],
                    value: abateDetail?.name,
                },
                {
                    name: ['user', 'email'],
                    value: abateDetail?.email,
                },
                {
                    name: ['user', 'address'],
                    value: abateDetail?.address,
                },
                {
                    name: ['user', 'phone'],
                    value: abateDetail?.phone,
                },
                {
                    name: ['user', 'note'],
                    value: abateDetail?.note,
                },
                {
                    name: ['user', 'pay_dilivery'],
                    value: abateDetail?.pay_dilivery,
                }
            ]);
        }

    }, [isLoading]);


    useEffect(() => {
        dispatch(fetchAbateById(orderId));
        dispatch(fetchProduct());
    }, [dispatch, orderId]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);


    const onFinish = async (values) => {
        try {
            // await update(ref(database, "/Abate/" + orderId), {
            //     name: values.user.name,
            //     email: values.user.email,
            //     address: values.user.address,
            //     phone: values.user.phone,
            //     note: values.user.note,
            //     pay_dilivery: values.user.pay_dilivery,
            //     products: abateDetail?.products,
            //     status: System.STATUS.ORDERED,
            //     dateOrder: new Date()
            // })
            const value = {
                name: values.user.name,
                email: values.user.email,
                address: values.user.address,
                phone: values.user.phone,
                note: values.user.note,
                pay_dilivery: values.user.pay_dilivery,
                products: abateDetail?.products,
                status: System.STATUS.ORDERED,
                dateOrder: new Date(),
            }
            dispatch(fetchUpdateAbateById({ orderId, value }))
            dispatch(fetchAbateById(orderId));
        } catch (error) {
            toast.error('Xin kiểm tra lại thông tin thanh toán')
        }
    };

    const removeAbateById = (orderId) => {
        try {
            dispatch(fetchRemoveAbateById(orderId));
        } catch (error) {
            toast.error('Xóa không thành công')
        }

    }
    return (
        <div className="container abate-container">
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
                disabled={abateDetail?.status === System.STATUS.ORDERED ? true : false}
                className="abate-info"
                fields={fields}
            >
                <div className="abate-info-left">
                    <img src={IMAGE.logo} alt="" style={{
                        width: "100px"
                    }} />
                    <div className="m-billing-info">
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItem: 'center',
                        }}>
                            <h2>Thông tin thanh toán</h2>
                            {abateDetail?.status === System.STATUS.ORDERED ?
                                <p style={{
                                    padding: '5px 20px',
                                    border: '2px solid #71973e',
                                    color: '#71973e',
                                    fontWeight: '900',
                                    marginLeft: '10px',
                                }}>ORDERED</p>
                                : null
                            }
                        </div>

                        <div className="m-billing-info-step">
                            <p>Xin hãy xác nhận thông tin thanh toán</p>
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
                                        type: 'checkbox',
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
                                        <p style={{ textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                        <p>Giá: {Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
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
                                {abateDetail?.status === System.STATUS.ORDERED ? <p style={{
                                    margin: "0px",
                                    color: "black"
                                }}>ĐẶT HÀNG THÀNH CÔNG</p> : "XÁC NHẬN ĐẶT HÀNG"}
                            </Button>
                            <span></span>
                        </Form.Item>

                    </div>
                    <div style={{ marginLeft: "5px" }}>
                        {abateDetail?.status === System.STATUS.ORDERED ?
                            <Link to='/'>Tiếp tục mua sắm</Link>
                            :
                            <Link to='/cart' onClick={() => {
                                removeAbateById(orderId)
                            }}>Quay về Giỏ hàng</Link>
                        }
                        {abateDetail?.status !== System.STATUS.ORDERING ?
                            <button
                                style={{
                                    marginLeft: "20px",
                                    borderRadius: "5px",
                                    backgroundColor: "green",
                                    color: "white",
                                    width: "190px",
                                    border: "none"
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    dispatch(fetchAbateById(orderId));
                                    setIsModalOpen(true);
                                }}
                            >Kiểm tra tình trạng giao hàng</button>
                            :
                            null
                        }
                    </div>
                    <Modal
                        title="Đơn hàng mã : "
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        width={800}
                    >
                        <div className="transfer-content">
                            <p>Tình trạng vận chuyển</p>
                            <div className="use-case-trnasfer d-flex flex-row align-items-center justify-content-center">
                                <div className="transports " style={{ border: "1px solid green" }}>
                                    <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-14/place-order-1.png" alt="" />
                                </div>
                                <div style={{ height: "2px", width: "100px", border: "1px solid black" }}></div>
                                <div className="transports" style={{ border: "1px solid green" }}>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdE7I635Hdl8CMzDPeGly_qDzfqU9mMhdZYUNYGTI0LZRoHikj1mtdbGsOjdf0cpAOp2I&usqp=CAU" alt="" />
                                </div>
                                <div style={{ height: "2px", width: "100px", border: "1px solid black" }}></div>
                                <div className="transports" style={{ border: "1px solid green" }}>
                                    <img src="https://cdn0.iconfinder.com/data/icons/seo6-filled-outline/128/SEO_-_6_-_Filled_Outline_-_44-10-512.png" alt="" />
                                </div>
                                <div style={{ height: "2px", width: "100px", border: "1px solid black" }}></div>
                                <div className="transports" style={{ border: "1px solid green" }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/1950/1950269.png" alt="" />
                                </div>
                            </div>
                            <div className="info-transfer-status mt-4">
                                <p>Đặt hàng <br />thành công</p>
                                <p>Đang xử lý <br />đơn hàng</p>
                                <p style={{ marginLeft: "15px" }}>Đang <br />giao hàng</p>
                                <p>Đã giao hàng</p>
                            </div>
                        </div>

                    </Modal>
                </div>
            </Form>

        </div>
    )
}

export default Abate;
