import "../pagesStyle/MainPageStyle.css";
import "../pagesStyle/SignUpPageStyle.css";
import Header from "../component/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
    const [searchWord, setSearchWord] = useState("");

    const dummyData = [
        {
            title: "타이틀1",
            content: "내용1",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀2",
            content: "내용2",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "/images/picture.png",
        },
    ];

    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        // 검색 결과 페이지로 이동할 때 검색어를 쿼리 문자열로 함께 전달
        navigate(`/searchresultpage?query=${encodeURIComponent(searchWord)}`);
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
                    {dummyData.map((item, idx) => (
                        <div key={idx} className="reviewFrame">
                            <img
                                src={item.thumnail}
                                className="thumnail"
                                alt={item.title}
                            />
                            <div className="contentFrame">
                                <div className="title">{item.title}</div>
                                <div className="content">{item.content}</div>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default MainPage;
