import "../pagesStyle/MainPageStyle.css";
import "../pagesStyle/SignUpPageStyle.css";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
    const koreanImage = "/image/테스트2.jpg";
    const [searchWord, setSearchWord] = useState("");
    const [showData, setShowData] = useState([]);

    useEffect(() => {
        const settingData = async () => {
            try {
                const response = await axios.post("/api/showdata");
                console.log(response.data);
                setShowData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        settingData();
    }, []);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // 검색 결과 페이지로 이동할 때 검색어를 쿼리 문자열로 함께 전달
        if (searchWord.length > 0) {
            navigate(
                `/searchresultpage?query=${encodeURIComponent(searchWord)}`
            );
        } else {
            alert("검색할 단어를 한자리 이상 입력해 주세요.");
        }
    };
    const reviewClick = (e) => {
        const showReviewDate = e.currentTarget.id;
        console.log(showReviewDate);
        navigate(`/reviewdetailpage?query=${showReviewDate}`);
    };
    return (
        <>
            <Header />
            <div className="mainContainer">
                <section className="section1">
                    <h1>어디로 가시나요?</h1>
                </section>
                <section className="searchBtnContainer">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            className="searchInput"
                            value={searchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        />
                        <button className="searchBtn" type="submit">
                            검색
                        </button>
                    </form>
                </section>
                <h1>여러 후기를 둘러 보세요!</h1>
                <section className="reviewContainer">
                    {showData.map((item, idx) => {
                        console.log(item);
                        return (
                            <div
                                key={idx}
                                className="reviewFrame"
                                id={item.reviewDate}
                                onClick={(e) => reviewClick(e)}
                            >
                                <img
                                    src={`/images/${
                                        item.reviewImages.filter(
                                            (item) => item !== ""
                                        )[0]
                                    }`}
                                    className="thumnail"
                                    alt={item.title}
                                />
                                <div className="contentFrame">
                                    <div className="title">{item.title}</div>
                                    <div className="content">
                                        {item.content}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </section>
            </div>
        </>
    );
};

export default MainPage;
