import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../component/Layout"
import { fetchCategory } from "../../component/SideBar/sibarSlice";
import { UserContext } from "../../container/useContext";
import { usePrevious } from "../../utils/hooks";
import { fetchProduct } from "./perfumeInfoSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchAddOrderItem, fetchOrderProduct } from "../Cart/orderSlice";
import "../../utils/styles/perfume.css";
import { fetchUserItem } from "../../container/userSlice";
import { System } from "../../constants/system.constants";


const take = 9;

const Perfume = () => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const { user } = useContext(UserContext);
    const userCurrent = useSelector(({ user }) => user.userCurrent)
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const product = useSelector(({ product }) => product.productList);
    const productLoading = useSelector(({ product }) => product.isLoading);
    const preProductLoading = usePrevious(productLoading);
    const categories = useSelector(({ category }) => category.categoryList);
    const [productData, setProductData] = useState([]);
    const [listDataProduct, setListDataProduct] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchCategory());
        dispatch(fetchOrderProduct(user));
        dispatch(fetchUserItem(user))
    }, [dispatch, user]);

    useEffect(() => {
        if (productLoading === true) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [productLoading])
    const showListProduct = () => {
        if (categoryId === "1") {
            return product?.filter(el => el.gender === "1")
        } else if (categoryId === "2") {
            return product?.filter(el => el.gender === "2")
        } else if (categoryId === "3") {
            return product?.filter(el => {
                if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "1") {
                    return el
                }
            })
        } else if (categoryId === "4") {
            return product?.filter(el => {
                if (Number(el.price.split(" ").join('')) > 3000000 && el.gender === "2") {
                    return el
                }
            })
        } else if (categoryId === "5") {
            return product?.filter(el => {
                if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "1") {
                    return el
                }
            })
        } else if (categoryId === "6") {
            return product?.filter(el => {
                if (Number(el.price.split(" ").join('')) < 1000000 && el.gender === "2") {
                    return el
                }
            })
        } else if (categoryId === "100") {
            return product?.filter(el => {
                if (el.gender === "1" || el.gender === "2") {
                    return el
                }
            })
        } else {
            return product?.filter(el => el.categoryId === categoryId)
        }
    }

    useEffect(() => {
        if (product.length > 0) {
            const tmpProductData = showListProduct();
            setPage(0);
            setProductData(tmpProductData);
            if (page === 0) {
                setListDataProduct(tmpProductData?.slice(0, take));
            }
            setNumberOfPage(Math.ceil(tmpProductData?.length / take));
        }
    }, [categoryId, product]);

    useEffect(() => {
        if (!productLoading && preProductLoading) {
            const tmpProductData = showListProduct();
            setProductData(tmpProductData);
            setListDataProduct(tmpProductData?.slice(0, take));
            setNumberOfPage(Math.ceil(tmpProductData?.length / take));
        }
    }, [productLoading, preProductLoading]);

    useEffect(() => {
        if (productData) {
            setListDataProduct(productData?.slice(page * take, page * take + take));
        }
        window.scrollTo({ top: 100, left: 0, behavior: 'smooth' });
    }, [page]);

    const _renderPaginate = () => {
        const data = [];
        for (let index = 0; index < numberOfPage; index++) {
            data.push(
                <li className="page-item"><Link className={`page-link ${page === index ? 'active' : ''}`} to="#" onClick={() => {
                    setPage(index);
                }}>{index + 1}</Link></li>
            )
        }
        return data;
    }

    const addOrderItem = async (item) => {
        if (item.status === System.STATUS_PRODUCT.HET) {
            toast.error('Sản phẩm đã hết. Vui lòng quay lại sau!')
            return;
        }
        if (user && userCurrent) {
            try {
                const params = {
                    ...item,
                    user: userCurrent,
                    orderNumber: 1
                }
                await dispatch(fetchAddOrderItem(params));
                await dispatch(fetchOrderProduct(user));
            } catch (error) {
                toast.error('Thêm không thành công')
            }
        } else {
            navigate('/signin');
        }
    }
    return (
        <Layout>
            {loading ?
                <div style={{ textAlign: "center", width: "100%" }}>
                    <p style={{ fontSize: "20px" }}>Loading ... </p>
                </div>
                :
                <div className="men-container">
                    {categoryId === "100" ?
                        <>
                            <p style={{ borderBottom: "1px solid gray" }}>Trang chủ / <span style={{ color: "#2d8356" }}>Tất cả sản phẩm</span></p>
                            <h4>TẤT CẢ SẢN PHẨM</h4>
                        </>
                        :
                        categories &&
                        categories?.map((item, index) => {
                            return (
                                <div
                                    key={item.id}
                                >
                                    {categoryId === item.id ?
                                        <>
                                            <p style={{ borderBottom: "1px solid gray" }}>Trang chủ / <span style={{ color: "#2d8356" }}>{item.categoryName}</span></p>
                                            <h4>{item.categoryName.toUpperCase()}</h4>
                                        </>
                                        : null

                                    }
                                </div>
                            )
                        })
                    }

                    <div className="men-list">
                        {listDataProduct &&
                            listDataProduct?.map((item, index) => {
                                return (
                                    <div key={item.id} className="men-item">
                                        <div className="men-detail">
                                            <img src={item.image} className="men-image" alt="" />
                                            <div className="btn-children">
                                                <div className="btn-content">
                                                    <button onClick={() => {
                                                        addOrderItem(item)
                                                    }}>Mua sản phẩm</button>
                                                    <button><Link to={`/perfume-detail/${item.id}`}>Xem chi tiết</Link></button>
                                                    {userCurrent?.roles === System.ROLESUSER.ADMIN || userCurrent?.roles === System.ROLESUSER.MEMBER ? <button><Link to={`/admin/update/product/${item.id}`}>Cập nhật</Link></button> : null}
                                                </div>
                                            </div>
                                        </div>
                                        <p>{item.productName.toLowerCase()}</p>
                                        <div className="price">
                                            <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                            <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                        </div>
                                        {item.status === System.STATUS_PRODUCT.HET ?
                                            <p style={{ color: "red", margin: "0" }}>Đã hết hàng</p>
                                            : null
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                    {listDataProduct?.length > 0 ?
                        <ul className="pagination">
                            <li className="page-item"><Link className="page-link" to="#" onClick={() => {
                                if (page > 0) {
                                    setPage(page - 1);
                                }
                            }}>Trước</Link></li>
                            {_renderPaginate()}
                            <li className="page-item"><Link className="page-link" to="#" onClick={() => {
                                if (page < (numberOfPage - 1)) {
                                    setPage(page + 1);
                                }
                            }}>Sau</Link></li>
                        </ul>
                        : null
                    }
                </div>
            }
        </Layout>
    )
}

export default Perfume;
