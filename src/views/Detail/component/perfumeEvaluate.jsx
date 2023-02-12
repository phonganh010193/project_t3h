import { ref, update } from "firebase/database";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
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
    const userLike = [];

    useEffect(() => {
        setnewDate(moment(new Date()).format("DD-MM-YYYY HH:mm:ss"))
    },[comment])
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
                        if(event.key === "Enter") {
                           if(!comment) {
                            return;
                           } else {
                                addCommentByUser({
                                    user: userCurrent,
                                    dateComment: newDate,
                                    productId: detailList?.id,
                                    comment: {
                                        info: comment,
                                        like: false,
                                        numberLike: 0,
                                        userLike: userLike
                                    }
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
                                        {item.comment.info}
                                        {item.comment.like ?
                                            <span className="icon-like">
                                                <img src="https://static.vecteezy.com/system/resources/previews/000/425/828/original/like-icon-vector-illustration.jpg" alt="" />
                                            </span>
                                        : null
                                    }
                                    </p>
                                    <div className="comment-interact">
                                        <span>Thích</span>
                                        <span>Phản hồi</span>
                                    </div>
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
