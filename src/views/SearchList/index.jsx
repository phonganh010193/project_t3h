import { push, ref, update } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchOrderProduct } from "../../component/CartInfo/orderSlice";
import LayoutCart from "../../component/LayoutCart";
import { UserContext } from "../../container/useContext";
import { database } from "../../firebase";
import "../../utils/styles/search.css";
import { fetchSearchProduct } from "./searchSlice";
const SearchList = () => {
    const values = window.location.href.slice(29)
    const [searchName, setSearchName] = useState(values)
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const listSearch = useSelector(({ search }) => search.searchList)
    const listCart = useSelector(({ order }) => order.orderProduct)
    const [orderNumber, setOrderNumber] = useState(1);
    useEffect(() => {
        dispatch(fetchSearchProduct(searchName));
        dispatch(fetchOrderProduct());
    }, [dispatch])


    const searchProduct = async (value) => {
        await dispatch(fetchSearchProduct(value))
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
        <LayoutCart>
            <div className="search-container">
                <div className="input-search">
                    <input value={searchName} type="text" placeholder="search ...." onChange={(event) => {
                        setSearchName(event.target.value)
                    }} />
                    <button onClick={() => {
                        searchProduct(searchName)
                    }}><Link to={`/search/${searchName}`}>Search</Link></button>
                </div>
                <div className="search-list">
                    {listSearch && listSearch.map((item, index) => {
                        return (
                            <div key={item.id} className="search-list-item">
                                <div className="list-detail">
                                    <img src={item.image} className="list-image" alt="" />
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
                                    <p>{item.price.split(" ").join('.')} VND</p>
                                    <p>{item.sale_price.split(" ").join('.')} VND</p>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </LayoutCart>
    )
}

export default SearchList;
