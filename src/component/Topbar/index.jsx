import HeaderLogo from "./component/HeaderLogo";
import HeaderNav from "./component/headerNav";
import HeaderRegister from "./component/headerRegister";
import "../../utils/styles/topbar.css";

const TopBar = () => {
    return (
        <div className="topbar-content">
            <HeaderRegister />
            <HeaderLogo />
            <HeaderNav />
        </div>
    );
};

export default TopBar;
