
import { push, ref, update } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../../container/useContext";
import { database } from "../../../firebase";
import { usePrevious } from "../../../utils/hooks";
import "../../../utils/styles/perfume.css";
import { fetchCategory } from "../../SideBar/sibarSlice";
import { fetchProduct } from "./perfumeInfoSlice";
import { fetchOrderProduct } from "../../CartInfo/orderSlice";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const take = 9;

function PerfumeInfo() {
    const { categoryId } = useParams();
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const product = useSelector(({ product }) => product.productList);
    const productLoading = useSelector(({ product }) => product.isLoading);
    const preProductLoading = usePrevious(productLoading);
    const categories = useSelector(({ category }) => category.categoryList);
    const listCart = useSelector(({ order }) => order.orderProduct);
    const [productData, setProductData] = useState([]);

    const [listDataProduct, setListDataProduct] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [orderNumber, setOrderNumber] = useState(1);

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchCategory());
        dispatch(fetchOrderProduct());
    }, [dispatch]);

    useEffect(() => {
        if (product.length > 0) {
            const tmpProductData = product.filter(el => el.categoryId === categoryId);
            setPage(0);
            setProductData(tmpProductData);
            if (page === 0) {
                setListDataProduct(tmpProductData.slice(0, take));
            }
            setNumberOfPage(Math.ceil(productData.length / take));
        }
    }, [categoryId]);

    useEffect(() => {
        if (!productLoading && preProductLoading) {
            const tmpProductData = product.filter(el => el.categoryId === categoryId);
            setProductData(tmpProductData);
            setListDataProduct(tmpProductData.slice(0, take));
            setNumberOfPage(Math.ceil(productData.length / take));
        }
    }, [productLoading, preProductLoading]);

    useEffect(() => {
        if (productData) {
            setListDataProduct(productData.slice(page * take, page * take + take));
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
        const findItem = listCart.find(el => item.id === el.productId)
        if (findItem) {
            listCart.forEach(el => {
                if (el.productId === item.id) {
                    update(ref(database, "Cart/" + el.key), {
                        orderNumber: parseFloat(el.orderNumber) + 1,
                        productId: el.productId,
                        user: el.user,
                        isCheckBox: false,
                    })
                        .then(() => {
                            dispatch(fetchOrderProduct());
                            toast.success('Add to Cart success!')
                        })
                        .catch(() => {
                            toast.error('Add to Cart fail!')
                        })
                }
            });
        } else {
            const ob = {
                user: user.email,
                productId: item.id,
                orderNumber: parseFloat(orderNumber),
                isCheckBox: false,
            }
            console.log('ob', ob);
            await push(ref(database, 'Cart'), ob)
                .then(() => {
                    dispatch(fetchOrderProduct());
                    toast.success('Add to Cart success!')
                })
                .catch((error) => {
                    toast.error('Add to Cart fail!')
                });
        }
    }

    return (
        <div className="men-container">
            {categories &&
                categories.map((item, index) => {
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
                    listDataProduct.map((item, index) => {
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
                                        </div>
                                    </div>
                                </div>
                                <p>{item.productName}</p>
                                <div className="price">
                                    <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                    <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
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
        </div>
    );
}

export default PerfumeInfo;
