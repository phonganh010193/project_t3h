import { ref, remove, update } from "firebase/database";
import { useState } from "react";
import IMAGE from "../../../contact";
import { database } from "../../../firebase";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchOrderProduct } from "../orderSlice";

const TRtable = ({ item, updateOrder }) => {
    const dispatch = useDispatch();
    const [number, setNumber] = useState(item.orderNumber);
    const [isCheckBox, setISCheckBox] = useState(false);
    const deleItemOrder = (item) => {
        remove(ref(database, 'Cart/' + item.key))
            .then(() => {
                toast.success('Delete success!')
                dispatch(fetchOrderProduct());
            })
            .catch((error) => {
                toast.error('Delete Fail!')
            })
    }

    return (
        <tr key={item.id}>

            <td><input type="checkbox" checked={isCheckBox} onChange={() => {
                setISCheckBox(!isCheckBox);
                const value = {
                    item: {
                        ...item,
                        isCheckBox: !isCheckBox
                    }
                };
                updateOrder(value);
            }} /></td>
            <td>
                <img className="image-cart" src={item.image} alt="" />
            </td>
            <td>{item.productName}</td>
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
