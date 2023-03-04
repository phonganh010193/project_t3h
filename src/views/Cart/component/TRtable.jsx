import { ref, remove } from "firebase/database";
import { useState } from "react";
import IMAGE from "../../../contact";
import { database } from "../../../firebase";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOrderProduct } from "../orderSlice";
import { useEffect } from "react";

const
    TRtable = ({ item, updateOrder, user, product }) => {
        const dispatch = useDispatch();
        const [number, setNumber] = useState(item.orderNumber);
        const [isCheckBox, setISCheckBox] = useState(item.isCheckBox);

        useEffect(() => {
            setISCheckBox(item.isCheckBox);
        }, [item.isCheckBox])
        const deleItemOrder = (item) => {
            remove(ref(database, 'Cart/' + item.key))
                .then(() => {
                    toast.success('Delete success!')
                    dispatch(fetchOrderProduct(user));
                })
                .catch((error) => {
                    toast.error('Delete Fail!')
                })
        }

        const itemChangeNumberOrder = (item) => {
            const finfItem = product.find(el => el.id === item.id);
            if (finfItem) {
                return finfItem?.quantity;
            }
        }


        return (
            <tr key={item.id}>
                <td><input type="checkbox" checked={isCheckBox} onChange={() => {
                    const nextValue = !isCheckBox;
                    const value = {
                        item: {
                            ...item,
                            isChanged: true,
                            isCheckBox: nextValue
                        }
                    };
                    setISCheckBox(nextValue);
                    updateOrder(value);
                }} /></td>
                <td className="image-column">
                    <img className="image-cart" src={item.image} alt="" />
                </td>
                <td><p style={{ textAlign: "center", textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p></td>
                <td>{(Number(item.price.split(" ").join(''))).toLocaleString()} VND</td>
                <td>
                    <input style={{ width: "50px" }} type="number" value={number >= itemChangeNumberOrder(item) ? itemChangeNumberOrder(item) : number} className="text-center" min="1" max={itemChangeNumberOrder(item)} onChange={(text) => {
                        setNumber(text.target.value);
                        if (Number(text.target.value) > product.find(el => el.id === item.id).quantity) {
                            toast.warning(`Hiện tại số sản phẩm tối đa bạn có thể mua cho sản phẩm này là ${itemChangeNumberOrder(item)}. Nếu muốn mua số lượng lớn vui lòng liên hệ trực tiếp shop. Xin cảm ơn!`);
                        }
                        const value = {
                            item: {
                                ...item,
                                orderNumber: text.target.value,
                                isChanged: true,
                                isCheckBox: isCheckBox
                            },
                        };
                        updateOrder(value);
                    }} />
                </td>
                <td style={{ width: "250px" }}>{(Number(item.price.split(" ").join('')) * Number(Number(number) > product.find(el => el.id === item.id).quantity ? product.find(el => el.id === item.id).quantity : item.orderNumber)).toLocaleString()} VND</td>
                <td>
                    <img
                        className="image-delete"
                        src={IMAGE.delete} alt=""
                        onClick={() => {
                            deleItemOrder(item)
                        }}
                    />
                </td>
            </tr>
        );
    }

export default TRtable;
