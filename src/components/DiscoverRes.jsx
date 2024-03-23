import "./DiscoverRes.css"

const DiscoverRes = ({img, title, keywords, handleBtnClick}) => {
    return (
        <>
            <p className="imgTitle">{title}</p>
            <img src={img} alt={title} className="apiImg" />
            <div className="keywords-div">
                {keywords ? keywords.map((keyword, id) => {
                    return (
                        <button 
                            className="keyword btn"
                            id={`keyword-${id}`}
                            onClick={(keyword) => handleBtnClick(keyword)}>
                                {keyword}
                        </button>);
                }): null}
            </div>
        </>
    );
}

export default DiscoverRes;