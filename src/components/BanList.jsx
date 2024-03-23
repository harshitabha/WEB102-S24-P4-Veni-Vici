import "./BanList.css"

const BanList = ({bannedAttribues, handleRemoveBan}) => {
    return (
        <div className="ban-container">
            <h2 className="div-title">
                Ban List
            </h2>
            <p className="ban-desc">Select an attribute in your listing to ban it</p>

            {bannedAttribues ? bannedAttribues.map((attr) => {
                return <button
                    key={`banAttr-${attr}`}
                    className="ban-attr btn"
                    onClick={handleRemoveBan}>
                        {attr}
                    </button>;
            }): null}
        </div>
    );
}

export default BanList;