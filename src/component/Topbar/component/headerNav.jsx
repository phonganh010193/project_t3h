import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HeaderNav = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState('')
    const searchItem = (value) => {
        if (!value) {
            toast.warning('Xin hãy nhập thông tin tìm kiếm');
            return;
        } else {
            navigate(`/search/${value.toLowerCase().split(" ").join('')}`)
        }
    }
    return (
        <div className="header-nav">
            <div className="container header-nav-content">
                <div className="topnav">
                    <Link to="/">TRANG CHỦ</Link>
                    <Link to="/introduce">GIỚI THIỆU</Link>
                    <Link to="/perfume/100">SẢN PHẨM</Link>
                    <Link to="/reraku">LIÊN HỆ</Link>
                    <Link to="#about">DỊCH VỤ MỚI</Link>
                </div>
                <div className="search-content">
                    <input value={values} type="text" placeholder="perfume..." onChange={(event) => {
                        setValues(event.target.value);
                    }} />
                    <button type="submit" onClick={() => {
                        searchItem(values);
                    }}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;
