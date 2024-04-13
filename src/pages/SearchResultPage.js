import Header from "../component/Header";
import ShowReview from "../component/ShowReview";
import "../pagesStyle/SearchResultPageStyle.css";
import { useState } from "react";

const SearchResultPage = () => {
    const [serchWord, setSearchWord] = useState("");
    const [radioChecked, setRadioChecked] = useState(true);
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
                    <input
                        type="text"
                        className="searchInput"
                        value={serchWord}
                        onChange={(e) => setSearchWord(e.target.value)}
                    ></input>
                    <button className="searchBtn">검색</button>
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
                        <label htmlFor="showReview">후기</label>
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
                        <label htmlFor="showMap">지도</label>
                    </div>
                </div>
                <div className="showResultsection">
                    {radioChecked ? <ShowReview></ShowReview> : null}
                    {/* <ShowReview></ShowReview> */}
                </div>
            </div>
            {/* <ShowReview></ShowReview> */}
        </>
    );
};
export default SearchResultPage;
