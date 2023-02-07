import { ref, remove } from "firebase/database";
import { useState } from "react";
import IMAGE from "../../../contact";
import { database } from "../../../firebase";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOrderProduct } from "../orderSlice";
import { useEffect } from "react";

const TRtable = ({ item, updateOrder, user }) => {
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
            <td>
                <img className="image-cart" src={item.image} alt="" />
            </td>
            <td><p style={{ textAlign: "center", textTransform: "capitalize" }}>{item.productName.toLowerCase()}</p></td>
            <td>{(Number(item.price.split(" ").join(''))).toLocaleString()} VND</td>
            <td>
                <input style={{ width: "50px" }} type="number" value={number} className="text-center" min="1" max="1000" onChange={(text) => {
                    setNumber(text.target.value);
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
            <td style={{ width: "250px" }}>{(Number(item.price.split(" ").join('')) * Number(item.orderNumber)).toLocaleString()} VND</td>
            <td><img className="image-delete" src={IMAGE.delete} alt="" onClick={() => {
                deleItemOrder(item)
            }} /></td>
        </tr>
    );
}

export default TRtable;
