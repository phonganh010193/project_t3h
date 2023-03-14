import { ref, remove } from "firebase/database";
import { useState } from "react";
import IMAGE from "../../../contact";
import { database } from "../../../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOrderProduct } from "../orderSlice";
import { useEffect } from "react";

const
    TRtable = ({ item, updateOrder, user, dispatch, itemChangeNumberOrder, setIsModalBuyOpen, setMaxQuantity }) => {
        const [number, setNumber] = useState(1);
        const [isCheckBox, setISCheckBox] = useState(false);
        useEffect(() => {
            setISCheckBox(item.isCheckBox);
            setNumber(Number(item.orderNumber))
        }, [item.isCheckBox, item.orderNumber])
        const deleItemOrder = (item) => {
            remove(ref(database, 'Cart/' + item.key))
                .then(() => {
                    toast.success('Xóa thành công!')
                    dispatch(fetchOrderProduct(user));
                })
                .catch((error) => {
                    toast.error('Xóa không thành công!')
                })
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
                    <input
                        style={{ width: "50px" }}
                        type="number"
                        value={number >= itemChangeNumberOrder(item) ? itemChangeNumberOrder(item) : number}
                        className="text-center"
                        min="1"
                        max={itemChangeNumberOrder(item)}
                        onChange={(text) => {
                            setNumber(text.target.value);

                            if (Number(text.target.value) >= itemChangeNumberOrder(item)) {
                                setIsModalBuyOpen(true);
                                setMaxQuantity(itemChangeNumberOrder(item))
                            }
                            const value = {
                                item: {
                                    ...item,
                                    orderNumber: Number(text.target.value) > itemChangeNumberOrder(item) ? itemChangeNumberOrder(item) : text.target.value,
                                    isChanged: true,
                                    isCheckBox: isCheckBox
                                },
                            };
                            updateOrder(value);
                        }}
                    />
                </td>
                <td style={{ width: "250px" }}>{(Number(item.price.split(" ").join('')) * Number(Number(number) > itemChangeNumberOrder(item) ? itemChangeNumberOrder(item) : item.orderNumber)).toLocaleString()} VND</td>
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
