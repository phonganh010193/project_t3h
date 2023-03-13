import { Tabs } from "antd";
import { ref, update } from "firebase/database";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LayoutCart from "../../component/LayoutCart"
import { System } from "../../constants/system.constants";
import { UserContext } from "../../container/useContext";
import { fetchUserItem } from "../../container/userSlice";
import { database } from "../../firebase";
import { usePrevious } from "../../utils/hooks";
import { fetchAbateList, fetchAddAbate, fetchRemoveAbateById } from "../Abate/abateSlice";
import HistoryOrder from "../HistoryOrder";
import { fetchProduct } from "../Perfume/perfumeInfoSlice";
import CartContent from "./CartContent";
import { fetchDeleteOrderItem, fetchOrderProduct, updateListCart } from "./orderSlice";
import "../../utils/styles/cart.container.css";
import 'react-toastify/dist/ReactToastify.css';

const take = 5;
const Cart = () => {
    const { user } = useContext(UserContext);
    const dispatch = useDispatch();
    const userCurrent = useSelector(({ user }) => user.userCurrent);
    const isLoadingAddOrderProduct = useSelector(({ order }) => order.isLoadingAdd)
    const prevIsLoadingAddOrderProduct = usePrevious(isLoadingAddOrderProduct);

    const navigate = useNavigate();
    const listCart = useSelector(({ order }) => order.orderProduct);
    const product = useSelector(({ product }) => product.productList);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const abateList = useSelector(({ abate }) => abate.abateList);
    const isLoading = useSelector(({ abate }) => abate.isLoading);
    const keyAddAbate = useSelector(({ abate }) => abate.keyAddAbate);
    const isLoadingAddAbate = useSelector(({ abate }) => abate.isLoadingAddAbate);
    const prevIsLoading = usePrevious(isLoading);
    const prevIsLoadingAddAbate = usePrevious(isLoadingAddAbate);
    const [listDataOrder, setListDataOrder] = useState([]);
    const [numberOfPage, setNumberOfPage] = useState(0);
    const [page, setPage] = useState(0);
    const orderLoading = useSelector(({ order }) => order.isLoading);
    const prevOrderLoading = usePrevious(orderLoading);
    const isLoadingDelete = useSelector(({ order }) => order.isLoadingDelete);
    const prevDeleteLoading = usePrevious(isLoadingDelete);
    const [isModalBuyOpen, setIsModalBuyOpen] = useState(false);
    const [maxQuantity, setMaxQuantity] = useState(null)

    useEffect(() => {
        if (!isLoadingAddOrderProduct && prevIsLoadingAddOrderProduct) {
            dispatch(fetchOrderProduct(user));
        }
    }, [isLoadingAddOrderProduct]);
    useEffect(() => {
        if (!isLoadingAddAbate && prevIsLoadingAddAbate && keyAddAbate) {
            updateCartOnline();
            navigate(`/abate/${keyAddAbate}`);
        }
    }, [isLoadingAddAbate, prevIsLoadingAddAbate, keyAddAbate]);

    useEffect(() => {
        if (!isLoadingDelete && prevDeleteLoading) {
            dispatch(fetchOrderProduct(user))
        }
    }, [isLoadingDelete]);

    useEffect(() => {
        if (!isLoading && prevIsLoading && abateList) {
            setIsModalOpen(true)
        }
    }, [isLoading, prevIsLoading, abateList])
    useEffect(() => {
        dispatch(fetchOrderProduct(user));
        dispatch(fetchAbateList());
        dispatch(fetchUserItem(user));
        dispatch(fetchProduct());
    }, [dispatch, user]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [dispatch]);

    const updateCartOnline = () => {
        const updates = listCart.filter(el => el.isChanged);
        updates.forEach(item => {
            update(ref(database, "/Cart/" + item.key), {
                orderNumber: item.orderNumber,
                productId: item.productId,
                user: item.user,
                isCheckBox: item.isCheckBox,
            })
                .then((res) => {
                    console.log(res)
                })
                .catch(() => {
                    toast.error('Cập nhật không thành công!')
                })
        })
        dispatch(fetchOrderProduct(user));
    };

    const handleOk = (key) => {
        navigate(`/abate/${key}`)
        setIsModalOpen(false);
    };

    const handleCancel = (key) => {
        try {
            dispatch(fetchRemoveAbateById(key))
            toast.success('Hủy thành công!')
        } catch (error) {
            console.log(error);
            toast.error('Hủy không thành công!')
        }
        setIsModalOpen(false);
    };


    const updateOrder = (value) => {
        dispatch(updateListCart(value));
    }

    const deleteListCart = () => {
        if (user) {
            try {
                dispatch(fetchDeleteOrderItem(user))
                toast.success('Xóa giỏ hàng thành công!')
            } catch (error) {
                toast.success('Xóa giỏ hàng thất bại!')
            }
        }
    }


    const ConfirmListAbate = () => {
        toast.warning('Xin hãy chọn sản phẩm trước khi thanh toán')
        return;
    }

    const BuyListAbate = () => {
        const products = listCart?.filter(el => {
            return el.isCheckBox && el.quantity !== 0;
        });
        if (products.length <= 0) {
            toast.warning('Sản phẩm đã hết. Vui lòng chọn sản phẩm khác');
            return;
        }
        const find = products.find(el => Number(el.orderNumber) === 0)
        if (find) {
            toast.warning('Xin hãy chọn số lượng sản phẩm muốn mua!')
        } else {
            dispatch(fetchAddAbate({
                name: "",
                email: userCurrent.email,
                address: "",
                phone: "",
                note: "",
                pay_dilivery: true,
                products,
                status: System.STATUS.ORDERING,
                dateOrder: "",
            }))
        }

    }

    const isAllCheckbox = () => {
        const findUncheck = listCart.find(el => !el.isCheckBox);
        if (listCart.length === 0) {
            return findUncheck;
        }
        return !findUncheck;
    }

    const handleOnAllCheckbox = () => {
        const findUncheck = listCart.find(el => !el.isCheckBox);
        if (findUncheck) {
            listCart.forEach((el) => {
                const value = {
                    item: {
                        ...el,
                        orderNumber: el.orderNumber,
                        isChanged: true,
                        isCheckBox: true
                    },
                };
                updateOrder(value);
            });
        } else {
            listCart.forEach((el) => {
                const value = {
                    item: {
                        ...el,
                        orderNumber: el.orderNumber,
                        isChanged: true,
                        isCheckBox: false
                    },
                };
                updateOrder(value);
            });
        }
    }

    useEffect(() => {
        if (listCart?.length > 0) {
            setPage(0);
            if (page === 0) {
                setListDataOrder(listCart?.slice(0, take));
            }
            setNumberOfPage(Math.ceil(listCart?.length / take));
        }
    }, []);

    useEffect(() => {
        if (!orderLoading && prevOrderLoading) {
            setListDataOrder(listCart?.slice(0, take));
            setNumberOfPage(Math.ceil(listCart?.length / take));
        }
    }, [orderLoading, prevOrderLoading]);

    useEffect(() => {
        if (listCart) {
            setListDataOrder(listCart?.slice(page * take, page * take + take));
        }
    }, [page, listCart]);

    const _renderPaginate = () => {
        const data = [];
        for (let index = 0; index < numberOfPage; index++) {
            data.push(
                <li key={index} className="page-item-cart"><Link className={`page-link ${page === index ? 'active' : 'normal'}`} to="#" onClick={() => {
                    setPage(index);
                }}>{index + 1}</Link></li>
            )
        }
        return data;
    }
    const itemChangeNumberOrder = (item) => {
        const findItem = product.find(el => el.id === item.id);
        if (findItem) {
            return findItem?.quantity;
        }
    };

    const handleBuyOk = () => {
        setIsModalBuyOpen(false);
    };
    const handleBuyCancel = () => {
        setIsModalBuyOpen(false);
    }
    const onChange = (key) => {
        return key;
    };
    const items = [
        {
            key: '1',
            label: `Giỏ hàng`,
            children:
                <CartContent
                    user={user}
                    dispatch={dispatch}
                    navigate={navigate}
                    abateList={abateList}
                    listCart={listCart}
                    setPage={setPage}
                    page={page}
                    numberOfPage={numberOfPage}
                    product={product}
                    setIsModalBuyOpen={setIsModalBuyOpen}
                    listDataOrder={listDataOrder}
                    isModalBuyOpen={isModalBuyOpen}
                    maxQuantity={maxQuantity}
                    setMaxQuantity={setMaxQuantity}
                    isModalOpen={isModalOpen}
                    updateCartOnline={updateCartOnline}
                    isAllCheckbox={isAllCheckbox}
                    handleOnAllCheckbox={handleOnAllCheckbox}
                    updateOrder={updateOrder}
                    itemChangeNumberOrder={itemChangeNumberOrder}
                    _renderPaginate={_renderPaginate}
                    deleteListCart={deleteListCart}
                    ConfirmListAbate={ConfirmListAbate}
                    BuyListAbate={BuyListAbate}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    handleBuyOk={handleBuyOk}
                    handleBuyCancel={handleBuyCancel}
                />,
        },
        {
            key: '2',
            label: `Lịch sử mua hàng`,
            children: <HistoryOrder userCurrent={userCurrent} dispatch={dispatch} />,
        }

    ];

    return (
        <LayoutCart>
            <div className="cart-container">
                <div className="header-cart">
                    <p>Trang chủ/ <span style={{ color: "rgb(45, 131, 86)" }}>Giỏ hàng</span></p>
                </div>
                <div className="detail-indo">
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                </div>
            </div>

        </LayoutCart>
    )
}

export default Cart;
