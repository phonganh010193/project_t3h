import Sidebar from "../SideBar";
import TopBar from "../Topbar";
import "../../utils/styles/content.css";
import Footer from "../Footer";


const Content = ({ children }) => {
    const url = window.location.href.slice(21);
    return (
        <div className="content">
            <TopBar />
            <main className="container main-info">
                {url === "/" || url?.includes('/perfume/') === true || url === '/newservice' ?
                    <Sidebar />
                : null
                }
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Content;
