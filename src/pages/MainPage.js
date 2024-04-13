import "../pagesStyle/MainPageStyle.css";
import "../pagesStyle/SignUpPageStyle.css";
import Header from "../component/Header";
import { useState } from "react";
import SearchResultPage from "./SearchResultPage";
import { Link } from "react-router-dom";

const MainPage = () => {
    const [serchWord, setSearchWord] = useState("");
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
    const handelSubmit = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <Header></Header>
            <div className="mainContainer">
                <section className="section1">
                    <h1>어디로 가시나요?</h1>
                </section>
                <section className="searchBtnContainer">
                    <form onSubmit={handelSubmit}>
                        <input
                            type="text"
                            className="searchInput"
                            value={serchWord}
                            onChange={(e) => setSearchWord(e.target.value)}
                        ></input>
                        <Link to={`./searchresultpage`}>
                            <button className="searchBtn">검색</button>
                        </Link>
                    </form>
                </section>
                <h1>여러 후기를 둘러 보세요!</h1>
                <section className="reviewContainer">
                    {dummyData.map((item, idx) => (
                        <div key={idx} className="reviewFrame">
                            <img src={item.thumnail} className="thumnail"></img>
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
