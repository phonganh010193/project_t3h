import { push, ref, update } from "firebase/database";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { database } from "../../../firebase";
import { fetchCommentListByUser } from "../perfumeDetailSlice";


const PerfumeEvaluate = (props) => {
    const {
        addCommentByUser,
        userCurrent,
        detailList,
        commentList,
    } = props;
    const [comment, setComment] = useState('');
    const [newDate, setnewDate] = useState('');

    useEffect(() => {
        setnewDate(moment(new Date()).format("DD-MM-YYYY HH:mm:ss"))
    }, [comment]);

    return (
        <div className="evaluate-container">
            <p className="title-evaluate">Bình luận:</p>
            <div className="input-evaluate">
                <input
                    type="text"
                    value={comment}
                    onChange={(event) => {
                        setComment(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            if (!comment) {
                                return;
                            } else {
                                addCommentByUser({
                                    user: userCurrent,
                                    dateComment: newDate,
                                    productId: detailList?.id,
                                    comment: comment,
                                });
                                setComment('')
                            }
                        }
                    }}
                />
            </div>
            <div className="evaluate-content">
                <div className="evaluate-item">
                    {commentList && commentList.map((item, index) => {
                        return (
                            <div className="user-comment" key={index}>
                                <img src={item.user?.avatar} alt="" />
                                <div className="comment-info">
                                    <p>{item.user?.name}</p>
                                    <p>
                                        {item.comment}
                                    </p>

                                </div>

                            </div>
                        )
                    })}


                </div>

            </div>
        </div>
    )
}

export default PerfumeEvaluate;
