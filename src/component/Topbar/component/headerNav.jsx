import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const topBar = [
    {
        id: 1,
        title: "TRANG CHỦ",
        url: "/"
    },
    {
        id: 2,
        title: "GIỚI THIỆU",
        url: "/introduce"
    },
    {
        id: 3,
        title: "SẢN PHẨM",
        url : "/perfume/100"
    },
    {
        id: 4,
        title: "LIÊN HỆ",
        url: "/renraku"
    },
    {
        id: 5,
        title: "DỊCH VỤ MỚI",
        url: "/newservice"
    },
]
const HeaderNav = () => {
    const url = window.location.href;
    const navigate = useNavigate();
    const [values, setValues] = useState('');

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
                    {topBar && topBar.map((item, index) => {
                        return (
                            <Link key={item.id} to={
                                item.id === 1 ? "/" : item.id === 2 ? "/introduce" : item.id === 3 ? "/perfume/100" : item.id === 4 ? "/renraku" : "/newservice"
                            }
                                className={url?.slice(21) === item.url ? "top-active" : ""}
                            >{item.title}</Link>
                        )
                    })}
                </div>
                <div className="search-content">
                    <input 
                        value={values} 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        onChange={(event) => {
                            setValues(event.target.value);
                        }} 
                        onKeyDown={(event) => {
                            if(event.key === "Enter") {
                                event.preventDefault();
                                searchItem(event.target.value);
                            }
                        }}
                    />
                    <button type="submit" onClick={(event) => {
                        event.preventDefault();
                        searchItem(values);
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeaderNav;
