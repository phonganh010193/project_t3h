import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderNav = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState('')
    return (
        <div className="header-nav">
            <div className="container header-nav-content">
                <div className="topnav">
                    <Link to="/">TRANG CHỦ</Link>
                    <Link to="#news">TƯ VẤN</Link>
                    <Link to="#contact">GIỚI THIỆU</Link>
                    <Link to="#about">SẢN PHẨM</Link>
                    <Link to="#about">MỸ PHẨM</Link>
                    <Link to="#about">LIÊN HỆ</Link>
                    <Link to="#about">DỊCH VỤ MỚI</Link>
                </div>
                <div className="search-content">
                    <form className="form-search">
                        <input value={values} type="text" placeholder="perfume..." onChange={(event) => {
                            setValues(event.target.value);
                        }} />
                        <button type="submit" onClick={() => {
                            navigate(`/search/${values.toLowerCase().split(" ").join('')}`)
                        }}>
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;
