import Sidebar from "../SideBar";
import TopBar from "../Topbar";
import "../../utils/styles/content.css";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrderProduct } from "../CartInfo/orderSlice";

const Content = ({children}) => {
    return (
        <div className="content">
            <TopBar />
            <main className="container main-info">
                <Sidebar />
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Content ;
