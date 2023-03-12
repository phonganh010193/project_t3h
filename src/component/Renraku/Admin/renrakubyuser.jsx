import { ref, update } from "firebase/database"
import { useContext, useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { System } from "../../../constants/system.constants"
import { UserContext } from "../../../container/useContext"
import { fetchUserItem } from "../../../container/userSlice"
import { database } from "../../../firebase"
import { usePrevious } from "../../../utils/hooks"
import Footer from "../../Footer"
import HeaderRegister from "../../Topbar/component/headerRegister"
import { fetchDeleteRenrakuByKey, fetchRenraku } from "../renrakuSlice"

const RenrakuByUser = () => {
    const dispatch = useDispatch();
    const { user } = useContext(UserContext);
    const userCurrent = useSelector(({ user }) => user.userCurrent);
    const renrakuList = useSelector(({ renraku }) => renraku.renrakuList);
    const isLoadingDelete = useSelector(({ renraku }) => renraku.isLoadingDelete);
    const prevIsLoadingDelete = usePrevious(isLoadingDelete);

    useEffect(() => {
        if (!isLoadingDelete && prevIsLoadingDelete) {
            console.log('renraku list', renrakuList)
            dispatch(fetchRenraku());
        }
    }, [dispatch, isLoadingDelete, prevIsLoadingDelete]);

    useEffect(() => {
        dispatch(fetchRenraku());
        dispatch(fetchUserItem(user));
    }, [dispatch, user]);
    const handleChangeStatus = (value) => {
        console.log('value', value)
        renrakuList?.forEach(el => {
            if (el.key === value.item.key) {
                update(ref(database, "/Renraku/" + el.key), {
                    renraku: {
                        email: el.renraku?.email,
                        name: el.renraku?.name,
                        phone: el.renraku?.phone,
                        introduction: el.renraku?.introduction
                    },
                    status: value.values
                })
                    .then((res) => {
                        return res
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            }
        });
        dispatch(fetchRenraku());
    };

    const deleteRenrakuByKey = (key) => {
        try {
            dispatch(fetchDeleteRenrakuByKey(key));
            toast.success('Xóa thành công');
        } catch (error) {
            toast.error('Xóa thất bại');
        }
    }


    return (
        <div className="container-fluid m-0 p-0">
            <HeaderRegister />
            <div className="container mt-3 mb-5">
                <h4>Thông tin liên hệ từ khách hàng</h4>
                {userCurrent.roles === System.ROLESUSER.ADMIN ||
                    userCurrent.roles === System.ROLESUSER.MEMBER ?
                    <div className="renrakubyuser-info">
                        <ul className="ml-5">
                            {renrakuList ? renrakuList.map((item, index) => {
                                return (
                                    <li style={{ listStyleType: "decimal", marginBottom: "10px" }} key={item.key}>
                                        <div className="d-flex flex-row justify-content-between">
                                            <div>
                                                <p style={{ fontWeight: "bold" }}>{item.renraku.name}</p>
                                                <p>Email: {item.renraku.email}</p>
                                                <p>Số điện thoại: {item.renraku.phone}</p>
                                                <p>Lời nhắn: {item.renraku.introduction}</p>
                                            </div>
                                            {item.status === "complete" ?
                                                <p style={{
                                                    color: "red", fontSize: "30px", fontWeight: "600",
                                                    textAlign: "center", fontFamily: "Times New Roman, Times, serif", border: "2px solid red", borderRadius: "5px", height: "50px"
                                                }}>Hoàn thành</p>
                                                : item.status === "processing" ?
                                                    <p style={{
                                                        color: "#d2d270", fontSize: "30px",
                                                        fontWeight: "600", textAlign: "center", fontFamily: "Times New Roman, Times, serif", border: "2px solid #d2d270", borderRadius: "5px", height: "50px"
                                                    }}>Đang hỗ trợ</p>
                                                    :
                                                    <p style={{
                                                        color: "green", fontSize: "30px",
                                                        fontWeight: "600", textAlign: "center", fontFamily: "Times New Roman, Times, serif", border: "2px solid green", borderRadius: "5px", height: "50px"
                                                    }}>Mới</p>
                                            }
                                        </div>
                                        <div>
                                            <span>Trạng thái: </span><select
                                                onChange={(event) => {
                                                    handleChangeStatus({
                                                        item: item,
                                                        values: event.target.value
                                                    });

                                                }}
                                                defaultValue={item.status === "processing" ? "processing" :
                                                    item.status === "complete" ? "complete" : "new"
                                                }
                                            >
                                                <option value="new">Mới</option>
                                                <option value="processing" >Đang hỗ trợ</option>
                                                <option value="complete">Hoàn thành</option>
                                            </select>
                                            {item.status === "complete" ?
                                                <button style={{ width: "80px", borderRadius: "5px", marginLeft: "10px" }} onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteRenrakuByKey(item.key)
                                                }}>Xóa</button>
                                                : null
                                            }
                                        </div>
                                    </li>
                                )
                            }) : <p>Chưa có thông tin!</p>}
                        </ul>
                    </div> 
                :
                    <p style={{ color: "red" }}>Bạn không được quyền truy cập chức năng này</p>
                }
                <Link to='/'>Quay về Trang chủ</Link>
            </div>
        </div >
    )
}

export default RenrakuByUser;