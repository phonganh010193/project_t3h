import Footer from "../Footer";
import TopBar from "../Topbar";
import "../../utils/styles/content.css";


const ContentCart = ({children}) => {
    return (
        <div className="content">
            <TopBar />
            <main className="container main-info">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default ContentCart;
