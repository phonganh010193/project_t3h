
const PerfumeDetailInfo = (props) => {
    const { detailList } = props;
    return (
        <div className="perfume-detail-info">
            <p>
                {detailList?.description}
            </p>

        </div>
    )
}

export default PerfumeDetailInfo;
