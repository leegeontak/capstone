import Header from "../component/Header";
import ShowMap from "../component/ShowMap";
import ShowReview from "../component/ShowReview";
import "../pagesStyle/SearchResultPageStyle.css";
import { useState } from "react";
const SearchResultPage = () => {
    const [serchWord, setSearchWord] = useState("");
    const [radioChecked, setRadioChecked] = useState(true);
    const handelSubmit = (event) => {
        event.preventDefault();
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
                    <form onSubmit={handelSubmit}>
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
