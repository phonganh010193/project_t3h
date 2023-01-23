import Content from "../Content"


const Layout = ({children}) => {
    return (
        <div className="layout">
            <Content>{children}</Content>
        </div>
    )
}

export default Layout;
