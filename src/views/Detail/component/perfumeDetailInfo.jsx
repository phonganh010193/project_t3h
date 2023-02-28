
const PerfumeDetailInfo = (props) => {
    const { detailList } = props;
    return (
        <div className="perfume-detail-info">
            <p>
                {detailList?.detail_product?.title_1}
            </p>
            <img src={detailList?.detail_product?.image_detail_1} alt="" />
            <p>
                {detailList?.detail_product?.title_2}
                {detailList?.detail_product?.title_3}
                {detailList?.detail_product?.title_4}
            </p>
            <img src={detailList?.detail_product?.image_detail_2} alt="" />
            <p>
                {detailList?.detail_product?.title_5}
                {detailList?.detail_product?.title_6}
                {detailList?.detail_product?.title_7}
                {detailList?.detail_product?.title_8}
                {detailList?.detail_product?.title_9}
            </p>
        </div>
    )
}

export default PerfumeDetailInfo;
