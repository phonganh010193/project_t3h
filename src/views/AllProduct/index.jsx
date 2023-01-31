import { push, ref, update } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Layout from "../../component/Layout";
import { database } from "../../firebase";
import "../../utils/styles/allproduct.css";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";
import 'react-toastify/dist/ReactToastify.css';
import { fetchOrderProduct } from "../Cart/orderSlice";
import { UserContext } from "../../container/useContext";

const take = 9;

const AllProduct = () => {
    const dispatch = useDispatch();
    const product = useSelector(({ product }) => product.productList)
    const allproduct = [];
    product.forEach(el => allproduct.unshift(el));
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [page, setPage] = useState(0);
    const [listDataProduct, setListDataProduct] = useState([]);
    const listCart = useSelector(({ order }) => order.orderProduct);
    const { user } = useContext(UserContext);

    useEffect(() => {
        dispatch(fetchProduct());
        dispatch(fetchOrderProduct());
    }, [dispatch]);

    useEffect(() => {
        if (allproduct.length > 0) {
            if (page === 0) {
                setListDataProduct(allproduct.slice(0, take));
            }
            setNumberOfPage(Math.ceil(allproduct.length / take));
        }
    }, []);

    useEffect(() => {
        if (allproduct) {
            setListDataProduct(allproduct.slice(page * take, page * take + take));
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
                orderNumber: 1,
                isCheckBox: false,
            }
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
        <Layout>
            <div className="allproduct-container">
                <p className="allproduct-header">Trang chủ / <span style={{ color: "rgb(45, 131, 86)" }}>Tất cả sản phẩm</span></p>
                <div className="all-product-list">
                    {listDataProduct && listDataProduct.map((item, index) => {
                        return (
                            <div className="men-item">
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
                    })}

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

        </Layout>

    )
}

export default AllProduct;
