import axios from "axios";
import Header from "../component/Header";
import ShowMap from "../component/ShowMap";
import ShowReview from "../component/ShowReview";
import "../pagesStyle/SearchResultPageStyle.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const SearchResultPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryWord = searchParams.get("query");
    const navigate = useNavigate();
    const [searchWord, setSearchWord] = useState(queryWord);
    const [radioChecked, setRadioChecked] = useState(true);
    const [responseData, setResponseData] = useState([]);
    useEffect(() => {
        if (queryWord) {
            searchDatabase(queryWord);
        }
    }, [queryWord]);
    const searchDatabase = async (query) => {
        try {
            const response = await axios.post(
                `/api/searchword?query=${encodeURIComponent(query)}`
            );
            setResponseData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // 검색 결과 페이지로 이동할 때 검색어를 쿼리 문자열로 함께 전달
        if (searchWord.length > 0) {
            navigate(
                `/searchresultpage?query=${encodeURIComponent(searchWord)}`
            );
            if (!radioChecked) {
                setRadioChecked(true);
            }
        } else {
            alert("검색할 단어를 한자리 이상 입력해 주세요.");
        }
    };
    console.log(queryWord);
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
                            value={searchWord}
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
                        <ShowReview responseData={responseData}></ShowReview>
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
