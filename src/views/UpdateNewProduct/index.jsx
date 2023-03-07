import { Button, DatePicker, Form, Input, InputNumber, Modal, Select } from "antd";
import dayjs from "dayjs";
import { push, ref, update } from "firebase/database";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../../component/Footer";
import HeaderRegister from "../../component/Topbar/component/headerRegister";
import { System } from "../../constants/system.constants";
import { UserContext } from "../../container/useContext";
import { fetchUserItem } from "../../container/userSlice";
import { database } from "../../firebase";
import { usePrevious } from "../../utils/hooks";
import "../../utils/styles/update.new.product.css";
import { fetchProduct, fetchProductById } from "../Perfume/perfumeInfoSlice";

const UpdateNewProduct = () => {
    const url = window.location.href;
    const productId = (url.slice(47));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productInfoReview, setProductInfoReview] = useState(null);
    const productList = useSelector(({ product }) => product.productList);
    const productUpdate = useSelector(({ product }) => product.productUpdate);
    const isLoading = useSelector(({ product }) => product.isLoading);
    const prevIsLoading = usePrevious(isLoading);
    const [count, setCount] = useState(0);
    const [fields, setFields] = useState([]);
    const { user } = useContext(UserContext);
    const userCurrent = useSelector(({ user }) => user.userCurrent)
    useEffect(() => {
        if (!productUpdate) {
            setFields([
                {
                    name: ['product', 'categoryName'],
                    value: "",
                },
                {
                    name: ['product', 'status'],
                    value: "",
                },
                {
                    name: ['product', 'categoryId'],
                    value: "",
                },
                {
                    name: ['product', 'gender'],
                    value: "",
                },
                {
                    name: ['product', 'dateAdd'],
                    value: "",
                },
                {
                    name: ['product', 'productName'],
                    value: "",
                },
                {
                    name: ['product', 'image'],
                    value: "",
                },
                {
                    name: ['product', 'price'],
                    value: "",
                },
                {
                    name: ['product', 'sale_price'],
                    value: "",
                },
                {
                    name: ['product', 'capacity'],
                    value: "",
                },
                {
                    name: ['product', 'image_1'],
                    value: "",
                },
                {
                    name: ['product', 'image_2'],
                    value: "",
                },
                {
                    name: ['product', 'image_3'],
                    value: "",
                },
                {
                    name: ['product', 'description'],
                    value: "",
                },
                {
                    name: ['product', 'quantity'],
                    value: "",
                }

            ]);

        } else {
            setFields([
                {
                    name: ['product', 'categoryName'],
                    value: productUpdate?.categoryName,
                },
                {
                    name: ['product', 'categoryId'],
                    value: productUpdate?.categoryId,
                },
                {
                    name: ['product', 'status'],
                    value: productUpdate?.status,
                },
                {
                    name: ['product', 'gender'],
                    value: productUpdate?.gender,
                },
                {
                    name: ['product', 'dateAdd'],
                    value: dayjs(productUpdate?.dateAdd, 'YYYY-MM-DD'),
                },
                {
                    name: ['product', 'productName'],
                    value: productUpdate?.productName,
                },
                {
                    name: ['product', 'image'],
                    value: productUpdate?.image,
                },
                {
                    name: ['product', 'price'],
                    value: productUpdate?.price,
                },
                {
                    name: ['product', 'sale_price'],
                    value: productUpdate?.sale_price,
                },
                {
                    name: ['product', 'capacity'],
                    value: productUpdate?.capacity,
                },
                {
                    name: ['product', 'image_1'],
                    value: productUpdate?.imageShow[0]?.image,
                },
                {
                    name: ['product', 'image_2'],
                    value: productUpdate?.imageShow[1]?.image,
                },
                {
                    name: ['product', 'image_3'],
                    value: productUpdate?.imageShow[2]?.image,
                },
                {
                    name: ['product', 'description'],
                    value: productUpdate?.description,
                },
                {
                    name: ['product', 'quantity'],
                    value: productUpdate?.quantity,
                }


            ]);
        }
    }, [isLoading, prevIsLoading, productUpdate])
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchProductById(productId))
        dispatch(fetchUserItem(user));
    }, [dispatch, productId, user]);

    useEffect(() => {
        if (productList) {
            setCount(productList.length)
        }
    }, [productList])
    const handleOk = async () => {
        const value = {
            categoryName: productInfoReview?.categoryName,
            id: !productUpdate ? String(count) : productUpdate?.id,
            gender: productInfoReview?.gender,
            dateAdd: productInfoReview?.dateAdd?.$d ? moment(productInfoReview?.dateAdd?.$d).format("YYYY-MM-DD") : "",
            bestsellers: 0,
            productName: productInfoReview?.productName,
            image: productInfoReview?.image,
            imageShow: [
                { image: productInfoReview?.image_1 ? productInfoReview?.image_1 : "" },
                { image: productInfoReview?.image_2 ? productInfoReview?.image_2 : "" },
                { image: productInfoReview?.image_3 ? productInfoReview?.image_3 : "" }
            ],
            price: productInfoReview?.price,
            sale_price: productInfoReview?.sale_price,
            categoryId: productInfoReview?.categoryId,
            capacity: productInfoReview?.capacity,
            description: productInfoReview?.description ? productInfoReview?.description : "",
            quantity: productInfoReview?.quantity ? productInfoReview?.quantity : "",
        };
        if (!productUpdate) {
            await push(ref(database, "Product"), value)
                .then((res) => {
                    toast.success('Thêm sản phẩm thành công');
                })
                .catch((error) => {
                    toast.error('Thêm sản phẩm thất bại');
                })
            await setIsModalOpen(false);
        } else {
            await update(ref(database, "/Product/" + productUpdate.key), value)
                .then((res) => {
                    toast.success('Cập nhật thành công');
                })
                .catch((error) => {
                    toast.error('Cập nhật không thành công');
                })
            await setIsModalOpen(false);
        }

    };

    const handleCancel = () => {
        setCount(count - 1);
        setIsModalOpen(false);
    };
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
    };

    const onFinish = async (values) => {
        await setProductInfoReview(values.product);
        await setCount(count + 1)
        await setIsModalOpen(true)
    };

    const onModoru = () => {
        navigate('/');
    }
    return (
        <div class="container-fluid m-0 p-0">
            <HeaderRegister />
            <div className="container">
                <h4 className="mt-5 mb-5">Thông tin sản phẩm</h4>
                {userCurrent.roles === System.ROLESUSER.ADMIN ||
                    userCurrent.roles === System.ROLESUSER.MEMBER ?
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        className="form-update-product"
                        validateMessages={validateMessages}
                        fields={fields}
                    >
                        <div className="new-product-info">
                            <Form.Item name={['product', 'categoryName']} label="CategoryName" rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="Nước hoa nam">Nước hoa nam</Select.Option>
                                    <Select.Option value="Nước hoa nữ">Nước hoa nữ</Select.Option>
                                    <Select.Option value="Lousi vuition">Lousi vuition</Select.Option>
                                    <Select.Option value="Chanel">Chanel</Select.Option>
                                    <Select.Option value="Kilian">Kilian</Select.Option>
                                    <Select.Option value="Dior">Dior</Select.Option>
                                    <Select.Option value="Jo malone">Jo malone</Select.Option>
                                    <Select.Option value="Creen">Creen</Select.Option>
                                    <Select.Option value="Dolce gabbala">Dolce gabbala</Select.Option>
                                    <Select.Option value="Hermes">Hermes</Select.Option>
                                    <Select.Option value="Guicci">Guicci</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['product', 'categoryId']} label="CategoryId" rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="1">Nước hoa nam</Select.Option>
                                    <Select.Option value="2">Nước hoa nữ</Select.Option>
                                    <Select.Option value="7">Lousi vuition</Select.Option>
                                    <Select.Option value="8">Chanel</Select.Option>
                                    <Select.Option value="9">Kilian</Select.Option>
                                    <Select.Option value="10">Dior</Select.Option>
                                    <Select.Option value="11">Jo malone</Select.Option>
                                    <Select.Option value="12">Creen</Select.Option>
                                    <Select.Option value="13">Dolce gabbala</Select.Option>
                                    <Select.Option value="14">Hermes</Select.Option>
                                    <Select.Option value="15">Guicci</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['product', 'gender']} label="Gender" rules={[{ required: true }]}>
                                <Select>
                                    <Select.Option value="1">Men</Select.Option>
                                    <Select.Option value="2">Wommen</Select.Option>
                                    <Select.Option value="3">ALL</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item name={['product', 'dateAdd']} label="DateAdd">
                                <DatePicker />
                            </Form.Item>
                            <Form.Item name={['product', 'productName']} label="Product Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['product', 'image']} label="ImageUrl" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['product', 'price']} label="Price" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['product', 'sale_price']} label="Sale Price" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Form.Item name={['product', 'capacity']} label="Capacity" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>

                        </div>
                        <div className="detail-product-info">
                            <div className="image-show">
                                <Form.Item name={['product', 'image_1']} label="Image1Url" rules={[{ required: true }]}>
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['product', 'image_2']} label="Image2Url">
                                    <Input />
                                </Form.Item>
                                <Form.Item name={['product', 'image_3']} label="Image3Url">
                                    <Input />
                                </Form.Item>
                            </div>
                            <Form.Item name={['product', 'quantity']} label="Quantity" rules={[{ required: true }]}>
                                <InputNumber min={1} />
                            </Form.Item>
                            <Form.Item name={['product', 'description']} label="Depscription">
                                <Input.TextArea rows={10} />
                            </Form.Item>

                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                                <Button type="primary" htmlType="submit">
                                    Review Product
                                </Button>
                                <Button htmlType="button" style={{ marginLeft: "10px" }} onClick={onModoru}>
                                    Quay về Trang chủ
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                    : <p style={{ color: "red" }}>Bạn không được quyền truy cập chức năng này</p>
                }
                <Modal
                    title="Review Product"
                    centered
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText={!productUpdate ? "Thêm sản phẩm" : "Cập nhật"}
                    cancelText="Trở lại"
                    width={1000}
                    style={{
                        top: 20
                    }}
                    className="review-product-modal"
                >
                    <div className="review-product-container">
                        <div className="product-info-content">
                            <img src={productInfoReview?.image} alt="" />
                            <p>{productInfoReview?.productName}</p>
                            <p>{Number(productInfoReview?.price.split(" ").join('')).toLocaleString()} VND</p>
                            <p style={{ textDecoration: "line-through", color: "gray" }}>{Number(productInfoReview?.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                            {productInfoReview?.quantity >= 10 ?
                                <p><img className="icon-status" src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" /><span>Còn hàng</span></p>
                                : productInfoReview?.quantity >= 1 && productInfoReview?.quantity <= 5 ?
                                    <p><img className="icon-status" src="https://cdn3d.iconscout.com/3d/premium/thumb/checkmark-2997167-2516205.png" /><span>Sắp hết hàng</span></p>
                                    : productInfoReview?.quantity === 0 ?
                                        <p><img className="icon-status" src="https://www.citypng.com/public/uploads/preview/png-red-round-close-x-icon-31631915146jpppmdzihs.png" /><span>Hết hàng</span></p>
                                        : null
                            }
                        </div>
                        <div className="review-detail-info">
                            <h5>Thông tin sản phẩm</h5>
                            <div className="info-children">
                                <p>
                                    {productInfoReview?.description}
                                </p>
                            </div>

                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default UpdateNewProduct;
