import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LayoutCart from "../../component/LayoutCart";
import { UserContext } from "../../container/useContext";
import "../../utils/styles/search.css";
import { fetchAddOrderItem, fetchOrderProduct } from "../Cart/orderSlice";
import { fetchSearchProduct } from "./searchSlice";
import 'react-toastify/dist/ReactToastify.css';
import { fetchUserItem } from "../../container/userSlice";

const SearchList = () => {
    const navigate = useNavigate();
    const values = (window.location.href.slice(33))
    const [searchName, setSearchName] = useState('')
    const { user } = useContext(UserContext);
    const userCurrent = useSelector(({ user }) => user.userCurrent)
    const dispatch = useDispatch();
    const listSearch = useSelector(({ search }) => search.searchList)
    useEffect(() => {
        dispatch(fetchSearchProduct(searchName));
        dispatch(fetchOrderProduct(user));
        dispatch(fetchUserItem(user))
    }, [dispatch])

    useEffect(() => {
        if (values) {
            setSearchName(values);
            searchProduct(values);
        }
    }, [values])
    const searchProduct = async (value) => {
        if (!value) {
            toast.warning('Xin hãy nhập thông tin tìm kiếm');
            return;
        } else {
            await dispatch(fetchSearchProduct(value))
            navigate(`/search/${value.toLowerCase().split(" ").join('')}`)
        }
    }

    const addOrderItem = async (item) => {
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
    }
    return (
        <LayoutCart>
            <div className="search-container">
                <div className="input-search">
                    <div className="input-item">
                        <input
                            value={searchName}
                            type="text"
                            placeholder="search ...."
                            onChange={(event) => {
                                setSearchName(event.target.value)
                            }}
                        />
                    </div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        searchProduct(searchName)
                    }}>Search</button>
                </div>
                <div className="search-list">
                    {listSearch.length > 0 ?
                        listSearch.map((item, index) => {
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
                                    <p style={{ textAlign: "center", textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p>
                                    <div className="price">
                                        <p>{Number(item.price.split(" ").join('')).toLocaleString()} VND</p>
                                        <p>{Number(item.sale_price.split(" ").join('')).toLocaleString()} VND</p>
                                    </div>
                                </div>
                            )

                        })
                        : <p>Sản phẩm không tồn tại !</p>
                    }
                </div>

            </div>
        </LayoutCart>
    )
}

export default SearchList;
