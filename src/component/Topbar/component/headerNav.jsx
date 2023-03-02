import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const topBar = [
    {
        id: 1,
        title: "TRANG CHỦ"
    },
    {
        id: 2,
        title: "GIỚI THIỆU"
    },
    {
        id: 3,
        title: "SẢN PHẨM"
    },
    {
        id: 4,
        title: "LIÊN HỆ"
    },
    {
        id: 5,
        title: "DỊCH VỤ MỚI"
    },
]
const HeaderNav = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState('');
    const [active, setActive] = useState(null);

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
                                className={active === index ? "active" : ""}
                                onClick={() => {
                                    setActive(index)
                                }}
                            >{item.title}</Link>
                        )
                    })}
                </div>
                <div className="search-content">
                    <input value={values} type="text" placeholder="Tìm kiếm..." onChange={(event) => {
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
