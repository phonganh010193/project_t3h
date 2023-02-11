import IMAGE from "../../../contact";

const GuideShopping = () => {
    return (
        <div className="guide-container">
            <p>Bước 1:</p>
            <img src={IMAGE.step1} alt="" />
            <p>Bước 2:</p>
            <img src={IMAGE.step2} alt="" />
            <p>Bước 3:</p>
            <img src={IMAGE.step3} alt="" />
        </div>
    )
}

export default GuideShopping;
