import { ref, remove } from "firebase/database";
import { useState } from "react";
import IMAGE from "../../../contact";
import { database } from "../../../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOrderProduct } from "../orderSlice";
import { useEffect } from "react";
import { Modal } from "antd";

const
    TRtable = ({ item, updateOrder, user, product, dispatch, itemChangeNumberOrder, setIsModalBuyOpen, setMaxQuantity }) => {
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
                    <input disabled={itemChangeNumberOrder(item) === 0 ? true : false} style={{ width: "50px" }} type="number" value={number >= itemChangeNumberOrder(item) ? itemChangeNumberOrder(item) : number} className="text-center" min="1" max={itemChangeNumberOrder(item)} onChange={(text) => {
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
                    }} />
                    <p style={{color: "red", fontSize: "13px"}}>{itemChangeNumberOrder(item) === 0 ? "Hết hàng" : null}</p>
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
