import Header from "../component/Header";
import ShowMap from "../component/ShowMap";
import ShowReview from "../component/ShowReview";
import "../pagesStyle/SearchResultPageStyle.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SearchResultPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryWord = searchParams.get("query");
    const navigate = useNavigate();
    const [serchWord, setSearchWord] = useState(queryWord);
    const [radioChecked, setRadioChecked] = useState(true);
    const handleSubmit = (event) => {
        event.preventDefault();
        // 입력한 검색어를 쿼리 문자열로 추가하고 새로운 URL로 이동
        navigate(`/searchresultpage?query=${encodeURIComponent(serchWord)}`);
        console.log(serchWord);
    };
    return (
        <>
            <Header></Header>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <section className="searchBtnContainer">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="searchInput"
                            value={serchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        ></input>
                        <button className="searchBtn">검색</button>
                    </form>
                </section>
            </div>

            <div className="SearchResultContainer">
                <div className="radioBtnContainer">
                    <div>
                        <input
                            type="radio"
                            id="showReview"
                            name="mapOrReview"
                            value="후기"
                            checked={radioChecked}
                            onChange={() => setRadioChecked(!radioChecked)}
                        ></input>
                        <label htmlFor="showReview">
                            <img src="/images/review.png"></img>
                        </label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="showMap"
                            name="mapOrReview"
                            value="지도"
                            checked={!radioChecked}
                            onChange={() => setRadioChecked(!radioChecked)}
                        ></input>
                        <label htmlFor="showMap">
                            <img src="/images/map.png"></img>
                        </label>
                    </div>
                </div>
                <div className="showResultsection">
                    {radioChecked ? (
                        <ShowReview></ShowReview>
                    ) : (
                        <ShowMap></ShowMap>
                    )}
                    {/* <ShowReview></ShowReview> */}
                </div>
            </div>
            {/* <ShowReview></ShowReview> */}
        </>
    );
};
export default SearchResultPage;
