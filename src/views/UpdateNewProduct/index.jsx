import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import { push, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { database } from "../../firebase";
import { usePrevious } from "../../utils/hooks";
import "../../utils/styles/update.new.product.css";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";

const UpdateNewProduct = () => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productInfoReview, setProductInfoReview] = useState(null);
    const productList = useSelector(({ product }) => product.productList);
    console.log('productReview', productInfoReview);
    const [count, setCount] = useState(0);
    console.log('count', count)
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
    }, [dispatch]);

    useEffect(() => {
        if (productList) {
            setCount(productList.length)
        }
    }, [productList])
    const handleOk = async () => {
        const value = {
            categoryName: productInfoReview?.categoryName,
            id: String(count),
            gender: productInfoReview?.gender,
            dateAdd: productInfoReview?.dateAdd.$d ? productInfoReview?.dateAdd.$d : "",
            bestsellers: productInfoReview?.bestsellers ? productInfoReview?.bestsellers : "",
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
            detail_product: {
                title_1: productInfoReview?.title_1 ? productInfoReview?.title_1 : "",
                image_detail_1: productInfoReview?.image_detail_1 ? productInfoReview?.image_detail_1 : "",
                title_2: productInfoReview?.title_2 ? productInfoReview?.title_2 : "",
                title_3: productInfoReview?.title_3 ? productInfoReview?.title_3 : "",
                title_4: productInfoReview?.title_4 ? productInfoReview?.title_4 : "",
                title_5: productInfoReview?.title_5 ? productInfoReview?.title_5 : "",
                title_6: productInfoReview?.title_6 ? productInfoReview?.title_6 : "",
                title_7: productInfoReview?.title_7 ? productInfoReview?.title_7 : "",
                image_detail_2: productInfoReview?.image_detail_2 ? productInfoReview?.image_detail_2 : "",
                title_8: productInfoReview?.title_8 ? productInfoReview?.title_8 : "",
                title_9: productInfoReview?.title_9 ? productInfoReview?.title_9 : ""
            }
        };
        console.log('value', value)
        await push(ref(database, "Product"), value)
            .then((res) => {
                toast.success('theem thanhf coong')
            })
            .catch((error) => {
                toast.error('thaat bai')
            })
        await dispatch(fetchProduct());
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setCount(count - 1)
        setIsModalOpen(false);
    };
    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
    };
    /* eslint-enable no-template-curly-in-string */

    const onFinish = async (values) => {
        await setProductInfoReview(values.product);
        await setCount(count + 1)
        await setIsModalOpen(true)
    };
    return (
        <div className="container mt-5">
            <h4 className="mb-5">Thông tin sản phẩm</h4>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                className="form-update-product"
                validateMessages={validateMessages}
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
                    <Form.Item name={['product', 'bestsellers']} label="Best sellers">
                        <Select>
                            <Select.Option value="1">Bán chạy</Select.Option>
                            <Select.Option value="2">Không</Select.Option>
                        </Select>
                    </Form.Item>
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
                </div>
                <div className="detail-product-info">
                    <Form.Item name={['product', 'title_1']} label="Title_1">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_2']} label="Title_2">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_3']} label="Title_3">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_4']} label="Title_4">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_5']} label="Title_5">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_6']} label="Title_6">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_7']} label="Title_7">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_8']} label="Title_8">
                        <Input />
                    </Form.Item>
                    <Form.Item name={['product', 'title_9']} label="Title_9">
                        <Input />
                    </Form.Item>
                    <div className="detail-image-new-info">
                        <Form.Item name={['product', 'image_detail_1']} label="Image Detail 1">
                            <Input />
                        </Form.Item>
                        <Form.Item name={['product', 'image_detail_2']} label="Image Detail 2">
                            <Input />
                        </Form.Item>
                    </div>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Review Product
                        </Button>
                    </Form.Item>
                </div>


            </Form>
            <Modal
                title="Review Product"
                centered
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Thêm sản phẩm"
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
                    </div>
                    <div className="review-detail-info">
                        <h5>Thông tin sản phẩm</h5>
                        <div className="info-children">
                            <p>
                                {productInfoReview?.title_1}
                            </p>
                            <img style={{ width: "300px" }} src={productInfoReview?.image_detail_1} alt="" />
                            <p>
                                {productInfoReview?.title_2}
                                {productInfoReview?.title_3}
                                {productInfoReview?.title_4}
                            </p>
                            <img style={{ width: "300px" }} src={productInfoReview?.image_detail_2} alt="" />
                            <p>
                                {productInfoReview?.title_5}
                                {productInfoReview?.title_6}
                                {productInfoReview?.title_7}
                                {productInfoReview?.title_8}
                                {productInfoReview?.title_9}
                            </p>
                        </div>

                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UpdateNewProduct;
