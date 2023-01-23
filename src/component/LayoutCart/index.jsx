import ContentCart from "../ContentCart";


const LayoutCart = ({children}) => {
    return (
        <div className="layout">
            <ContentCart>{children}</ContentCart>
        </div>
    )
}

export default LayoutCart;
