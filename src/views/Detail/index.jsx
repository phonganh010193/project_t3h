import LayoutCart from "../../component/LayoutCart";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../container/useContext";
import { fetchAddOrderItem, fetchOrderProduct } from "../Cart/orderSlice";
import { fetchAddCommentDetail, fetchCommentListByUser, fetchProductDetail } from "./perfumeDetailSlice";
import PerfumeDetailInfo from "./component/perfumeDetailInfo";
import { Tabs } from "antd";
import "../../utils/styles/perfume.detail.css";
import { fetchUserItem } from "../../container/userSlice";
import PerfumeEvaluate from "./component/perfumeEvaluate";
import GuideShopping from "./component/guideShopping";
import { System } from "../../constants/system.constants";
import { usePrevious } from "../../utils/hooks";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";


const Detail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { productId } = useParams();
    const { user } = useContext(UserContext);
    const userCurrent = useSelector(({ user }) => user.userCurrent);
    const product = useSelector(({ product }) => product.productList);
    const detailList = useSelector(({ detail }) => detail.productListDetail);
    const commentList = useSelector(({ detail }) => detail.commentList);
    const [number, setNumber] = useState("");
    const [image, setImage] = useState('')
    const isLoadingAddOrderProduct = useSelector(({ order }) => order.isLoadingAdd)
    const prevIsLoadingAddOrderProduct = usePrevious(isLoadingAddOrderProduct);

    useEffect(() => {
        if (!isLoadingAddOrderProduct && prevIsLoadingAddOrderProduct) {
            dispatch(fetchOrderProduct(user));
        }
    }, [isLoadingAddOrderProduct]);


    useEffect(() => {
        setImage(detailList?.image)
    }, [detailList])
    useEffect(() => {
        dispatch(fetchProductDetail(productId));
        dispatch(fetchOrderProduct(user));
        dispatch(fetchProduct());
        dispatch(fetchUserItem(user));
        dispatch(fetchCommentListByUser(productId));
    }, [dispatch, productId]);



    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        setNumber(1)
    }, []);

    const addOrderItem = (item) => {
        if (item.quantity === 0) {
            toast.error('Sản phẩm đã hết. Vui lòng quay lại sau!')
            return;
        }
        if (user && userCurrent) {
            try {
                const params = {
                    ...item,
                    user: userCurrent,
                    orderNumber: number
                }
                dispatch(fetchAddOrderItem(params));
            } catch (error) {
                toast.error('Thêm không thành công')
            }
        } else {
            navigate('/signin');
        }

    }
    const addCommentByUser = async (value) => {
        try {
            await dispatch(fetchAddCommentDetail(value));
            await dispatch(fetchCommentListByUser(productId));

        } catch (error) {
            console.log(error);
        }
    }


    const onChange = (key) => {
        console.log(key);
    };
    const items = [
        {
            key: '1',
            label: `THÔNG TIN SẢN PHẨM`,
            children: <PerfumeDetailInfo detailList={detailList} />,
        },
        {
            key: '2',
            label: `HƯỚNG DẪN MUA HÀNG`,
            children: <GuideShopping />,
        },
        {
            key: '3',
            label: `ĐÁNH GIÁ CHI TIẾT`,
            children: <PerfumeEvaluate
                userCurrent={userCurrent}
                detailList={detailList}
                addCommentByUser={addCommentByUser}
                commentList={commentList}
            />,
        },
    ];

    const itemChangeNumberOrder = (item) => {
        const finfItem = product.find(el => el.id === item.id);
        if (finfItem) {
            return finfItem?.quantity;
        }
    }

    return (
        <LayoutCart>
            <div className="container perfume-detail">
                <div className="header-detail">
                    <p>Nhóm sản phẩm/<span style={{ color: "#2d8356" }}>{detailList?.productName}</span></p>
                </div>
                <div className="content-detail">
                    <div className="content-detail-image">
                        <img src={image} alt="" />
                        <div className="icon-click-image">
                            {detailList?.imageShow?.map((item, index) => {
                                if (item.image) {
                                    return (
                                        <div className="list-image-show" key={index}>
                                            <img
                                                key={index}
                                                src={item.image}
                                                alt=""
                                                onClick={() => {
                                                    setImage(item.image)
                                                }}
                                            />
                                        </div>

                                    )
                                }
                            })}
                        </div>
                    </div>

                    <div className="buy-info">
                        <h2 style={{ textTransform: "capitalize" }}>{detailList?.productName?.toLowerCase()}</h2>
                        <div className="capacity">
                            <h6>Dung Tích</h6>
                            <div className="capacity-info">
                                <p>{detailList?.capacity}</p>
                                <p>{Number(detailList?.price?.split(" ").join('')).toLocaleString()} VND{"  "}<span className="sale-disable">{Number(detailList?.sale_price?.split(" ").join('')).toLocaleString()} VND</span></p>
                            </div>
                            {detailList?.quantity >= 10 ?
                                <p><img className="icon-status" src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/523/posts/32694/final_image/tutorial-preview-large.png" /><span>Còn hàng</span></p>
                                : detailList?.quantity >= 1 && detailList?.quantity <= 5 ?
                                    <p><img className="icon-status" src="https://cdn3d.iconscout.com/3d/premium/thumb/checkmark-2997167-2516205.png" /><span>Sắp hết hàng</span></p>
                                    : detailList?.quantity === 0 ?
                                        <p><img className="icon-status" src="https://www.citypng.com/public/uploads/preview/png-red-round-close-x-icon-31631915146jpppmdzihs.png" /><span>Hết hàng</span></p>
                                        : null
                            }
                            <div className="amount">
                                <h6>Số Lượng</h6>
                                <div className="amount-form">
                                    <input type="number" value={number >= itemChangeNumberOrder(detailList) ? itemChangeNumberOrder(detailList) : number} className="text-center" min="1" max={itemChangeNumberOrder(detailList)} onChange={(event) => {
                                        setNumber(event.target.value);
                                        if (Number(event.target.value) >= product.find(el => el.id === detailList.id).quantity) {
                                            toast.warning(`Hiện tại số sản phẩm tối đa bạn có thể mua cho sản phẩm này là ${itemChangeNumberOrder(detailList)}. Nếu muốn mua số lượng lớn vui lòng liên hệ trực tiếp shop. Xin cảm ơn!`);
                                        }
                                    }} />
                                    <button className="cart-shop" onClick={() => {
                                        addOrderItem(detailList);
                                    }}>Thêm vào giỏ hàng</button>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div className="detail-indo">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>
        </LayoutCart>
    )
}

export default Detail;
