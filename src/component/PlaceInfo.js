const PlaceInfo = ({ item, searchCategory }) => {
    return (
        <div className="currentLocation">
            <div className="currentLocationName">
                현재위치: {item.place_name}
            </div>
            <div className="currentLocationBtnContainer">
                <button onClick={() => searchCategory("FD6")}>맛집</button>
                <button onClick={() => searchCategory("CT1")}>문화시설</button>
                <button onClick={() => searchCategory("AT4")}>관광명소</button>
            </div>
        </div>
    );
};
export default PlaceInfo;
