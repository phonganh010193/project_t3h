import { useEffect } from "react";
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
import HeaderRegister from "../../component/Topbar/component/headerRegister";
import moment from "moment";
import { fetchOrderProduct, fetchUpdateOrderItem } from "../Cart/orderSlice";
import { useContext } from "react";
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
    const { user } =useContext(UserContext);
    const abateDetail = useSelector(({ abate }) => abate.abateDetail);
    const listCart = useSelector(({ order }) => order.orderProduct);
    const isLoading = useSelector(({ abate }) => abate.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const isLoadingUpdate = useSelector(({ abate }) => abate.isLoadingUpdate);
    const prevIsLoadingUpdate = usePrevious(isLoadingUpdate);
    const [fields, setFields] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        if (!isLoadingUpdate && prevIsLoadingUpdate) {
            dispatch(updateQuantityProductByBuy(orderId))
            dispatch(fetchUpdateOrderItem(listCart));
            dispatch(fetchOrderProduct(user));
            dispatch(fetchAbateById(orderId));
        }
    }, [dispatch, isLoadingUpdate, prevIsLoadingUpdate, orderId])



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
        } else {
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
        dispatch(fetchOrderProduct(user));
    }, [dispatch, orderId]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    const todokuyoyaku = (date) => {
        if (moment(date).format("MM") === "01" ||
            moment(date).format("MM") === "03" ||
            moment(date).format("MM") === "05" ||
            moment(date).format("MM") === "07" ||
            moment(date).format("MM") === "08" ||
            moment(date).format("MM") === "10" ||
            moment(date).format("MM") === "12"
        ) {
            if (Number(moment(date).format("DD")) + 5 <= 31) {
                return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + (Number(moment(date).format("DD")) + 5).toString() + "/" + Number(moment(date).format("MM")).toString()
            }
            if (Number(moment(date).format("DD")) + 5 > 31 &&
                Number(moment(date).format("DD")) + 3 <= 31) {
                return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 31).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
            }
            if (
                Number(moment(date).format("DD")) + 3 > 31 &&
                Number(moment(date).format("DD")) + 3 <= 34) {
                return ((Number(moment(date).format("DD")) + 3) - 31).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 31).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
            }
        }
        if (moment(date).format("MM") === "04" ||
            moment(date).format("MM") === "06" ||
            moment(date).format("MM") === "09" ||
            moment(date).format("MM") === "11"
        ) {
            if (Number(moment(date).format("DD")) + 5 <= 30) {
                return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + (Number(moment(date).format("DD")) + 5).toString() + "/" + Number(moment(date).format("MM")).toString()
            }
            if (Number(moment(date).format("DD")) + 5 > 30 &&
                Number(moment(date).format("DD")) + 3 <= 30) {
                return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 30).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
            }
            if (
                Number(moment(date).format("DD")) + 3 > 30 &&
                Number(moment(date).format("DD")) + 3 <= 33) {
                return ((Number(moment(date).format("DD")) + 3) - 30).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 30).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
            }
        } else {
            if (Number(moment(date).format("DD")) <= 28) {
                if (Number(moment(date).format("DD")) + 5 <= 28) {
                    return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + (Number(moment(date).format("DD")) + 5).toString() + "/" + Number(moment(date).format("MM")).toString()
                }
                if (Number(moment(date).format("DD")) + 5 > 28 &&
                    Number(moment(date).format("DD")) + 3 <= 28) {

                    return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 28).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
                }
                if (
                    Number(moment(date).format("DD")) + 3 > 28 &&
                    Number(moment(date).format("DD")) + 3 <= 31) {

                    return ((Number(moment(date).format("DD")) + 3) - 28).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 28).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
                }
            }
            else {
                if (Number(moment(date).format("DD")) + 5 <= 29) {
                    return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + (Number(moment(date).format("DD")) + 5).toString() + "/" + Number(moment(date).format("MM")).toString()
                }
                if (Number(moment(date).format("DD")) + 5 > 29 &&
                    Number(moment(date).format("DD")) + 3 <= 29) {
                    return (Number(moment(date).format("DD")) + 3).toString() + "/" + Number(moment(date).format("MM")).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 29).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
                }
                if (
                    Number(moment(date).format("DD")) + 3 > 29 &&
                    Number(moment(date).format("DD")) + 3 <= 32) {
                    return ((Number(moment(date).format("DD")) + 3) - 29).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString() + " - " + ((Number(moment(date).format("DD")) + 5) - 29).toString() + "/" + (Number(moment(date).format("MM")) + 1).toString();
                }
            }


        }
    }
  


    const onFinish = async (values) => {
        try {
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
        <div className="container-fluid m-0 p-0">
            <HeaderRegister />
            <div className="container abate-container mt-4">
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    disabled={abateDetail?.status !== System.STATUS.ORDERING ? true : false}
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
                                    {abateDetail?.status !== System.STATUS.ORDERING ? <p style={{
                                        margin: "0px",
                                        color: "black"
                                    }}>ĐẶT HÀNG THÀNH CÔNG</p> : "XÁC NHẬN ĐẶT HÀNG"}
                                </Button>
                                <span></span>
                            </Form.Item>

                        </div>
                        <div style={{ marginLeft: "5px" }}>
                            {abateDetail?.status !== System.STATUS.ORDERING ?
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

                    </div>
                </Form>

            </div>
            <Modal
                title={`Đơn hàng mã: ${abateDetail?.key}`}
                open={isModalOpen}
                onCancel={handleCancel}
                width={800}
                footer={false}
            >
                <div className="transfer-content">
                    <p>Tình trạng vận chuyển</p>
                    <div className="use-case-trnasfer d-flex flex-row align-items-center justify-content-center">
                        <div
                            className="transports "
                            style={{
                                border: abateDetail?.status === System.STATUS.ORDERED ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.PROCESSING ? "1px solid green" :
                                        abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid green" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.ORDERED ? "green" :
                                    abateDetail?.status === System.STATUS.PROCESSING ? "green" :
                                        abateDetail?.status === System.STATUS.TRANSFERRING ? "green" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "green" : null
                            }}
                        >
                            <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-icon-14/place-order-1.png" alt="" />
                        </div>
                        <div
                            style={{
                                height: "2px",
                                width: "100px",
                                border: abateDetail?.status === System.STATUS.PROCESSING ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "1px solid gray" :
                                        abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid green" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.PROCESSING ? "green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "" :
                                        abateDetail?.status === System.STATUS.TRANSFERRING ? "green" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "green" : null
                            }}
                        ></div>
                        <div
                            className="transports"
                            style={{
                                border: abateDetail?.status === System.STATUS.PROCESSING ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "1px solid gray" :
                                        abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid green" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.PROCESSING ? "green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "" :
                                        abateDetail?.status === System.STATUS.TRANSFERRING ? "green" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "green" : null
                            }}
                        >
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdE7I635Hdl8CMzDPeGly_qDzfqU9mMhdZYUNYGTI0LZRoHikj1mtdbGsOjdf0cpAOp2I&usqp=CAU" alt="" />
                        </div>
                        <div
                            style={{
                                height: "2px",
                                width: "100px",
                                border: abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "1px solid gray" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "1px solid gray" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.TRANSFERRING ? "green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "green" : null
                            }}
                        ></div>
                        <div
                            className="transports"
                            style={{
                                border: abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "1px solid gray" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "1px solid gray" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.TRANSFERRING ? "green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "" :
                                            abateDetail?.status === System.STATUS.RECEIVED ? "green" : null
                            }}
                        >
                            <img src="https://cdn0.iconfinder.com/data/icons/seo6-filled-outline/128/SEO_-_6_-_Filled_Outline_-_44-10-512.png" alt="" />
                        </div>
                        <div
                            style={{
                                height: "2px",
                                width: "100px",
                                border: abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "1px solid gray" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "1px solid gray" :
                                            abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid gray" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.RECEIVED ? "green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "" :
                                            abateDetail?.status === System.STATUS.TRANSFERRING ? "" : null
                            }}
                        ></div>
                        <div
                            className="transports"
                            style={{
                                border: abateDetail?.status === System.STATUS.RECEIVED ? "1px solid green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "1px solid gray" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "1px solid gray" :
                                            abateDetail?.status === System.STATUS.TRANSFERRING ? "1px solid gray" : null,
                                backgroundColor: abateDetail?.status === System.STATUS.RECEIVED ? "green" :
                                    abateDetail?.status === System.STATUS.ORDERED ? "" :
                                        abateDetail?.status === System.STATUS.PROCESSING ? "" :
                                            abateDetail?.status === System.STATUS.TRANSFERRING ? "" : null
                            }}
                        >
                            <img src="https://cdn-icons-png.flaticon.com/512/1950/1950269.png" alt="" />
                        </div>
                    </div>
                    <div className="info-transfer-status mt-4">
                        <p>Đặt hàng <br />thành công</p>
                        <p>Chờ lấy hàng</p>
                        <p style={{ marginLeft: "15px" }}>Đang <br />giao hàng</p>
                        <p>Đã giao hàng</p>
                    </div>
                    <p>Dự kiến giao hàng : {todokuyoyaku(abateDetail?.dateOrder)}</p>
                </div>

            </Modal>
        </div>
    )
}

export default Abate;
