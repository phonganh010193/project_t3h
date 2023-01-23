import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../utils/styles/sidebar.css";
import SidebarContent from "./sidebar-content";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCategory } from "./sibarSlice";

function Sidebar() {
    const [visible, setViSible] = useState(false);
    const {categoryId} = useParams();
    console.log('categoryId from sidebar', categoryId);
    const dispatch = useDispatch();
    const categoryData = useSelector(({category}) => category.categoryList)
    console.log('category from sidebar', categoryData);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);
    return (
        <div>
            <div className="sidebar">
                <div className="sidebar-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                    </svg>
                    <h5>Danh Mục Sản Phẩm</h5>
                </div>
                <div className="sidebar-content">
                {categoryData &&
                    categoryData.map((item, index) => {
                        return (
                            <Link key={item.id} to={`/perfume/${item.id}`} className={categoryId === item.id ? "active" : ""}>
                                {item.categoryName}
                            </Link>
                        )
                    })
                }
                </div>
                
            </div>
            <SidebarContent />
            <SidebarContent />
        </div>

    );
}

export default Sidebar;
