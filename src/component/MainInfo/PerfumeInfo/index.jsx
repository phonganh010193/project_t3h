
import useSelection from "antd/es/table/hooks/useSelection";
import { push, ref, set } from "firebase/database";
import { addDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import IMAGE from "../../../contact";
import { UserContext } from "../../../container/useContext";
import { database } from "../../../firebase";
import { usePrevious } from "../../../utils/hooks";
import "../../../utils/styles/perfume.css";
import { fetchCategory } from "../../SideBar/sibarSlice";
import { fetchProduct } from "./perfumeInfoSlice";
import OrderData from "../../../mock/order.json";
import { fetchOrderProduct } from "../../CartInfo/orderSlice";
const take = 9;

function PerfumeInfo() {
    const { categoryId } = useParams();
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const product = useSelector(({product}) => product.productList);
    const productLoading = useSelector(({product}) => product.isLoading);
    const preProductLoading = usePrevious(productLoading);
    const categories = useSelector(({category}) => category.categoryList);
    const [productData, setProductData] = useState([]);
    
    const [listDataProduct, setListDataProduct] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(0);

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

    const addOrderItem = (item) => {
        const ob = {
            user: user.email,
            productId: item.id,
            orderNumber: 1
        }
        console.log('ob', ob);
        push(ref(database, 'Cart'), ob)
        .then(() => {
            console.log('add success')
            dispatch(fetchOrderProduct());
        })
        .catch((error) => {
            console.log('add fail')            
        });
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
                                    <p>{item.price}</p>
                                    <p>{item.sale_price}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <ul className="pagination">
                <li className="page-item"><Link className="page-link" to="#" onClick={() => {
                    if (page > 0) {
                        setPage(page -1);
                    }
                }}>Trước</Link></li>
                {_renderPaginate()}
                {/* <li className="page-item"><Link className={`page-link ${page === 0 ? 'active' : ''}`} to="#" onClick={() => {
                    setPage(0);
                }}>1</Link></li>
                <li className="page-item"><Link className={`page-link ${page === 1 ? 'active' : ''}`} to="#" onClick={() => {
                    setPage(1);
                }}>2</Link></li> */}
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
