import "../pagesStyle/MainPageStyle.css";
import Header from "../component/Header";

const MainPage = () => {
    const dummyData = [
        {
            title: "타이틀1",
            content: "내용1",
            thumnail: "이미지1",
        },
        {
            title: "타이틀2",
            content: "내용2",
            thumnail: "이미지2",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
        {
            title: "타이틀3",
            content: "내용3",
            thumnail: "이미지3",
        },
    ];
    return (
        <>
            <Header></Header>
            <div className="mainContainer">
                <section className="section1">
                    <h1>어디로 가시나요?</h1>
                </section>
                <section className="searchBtnContainer">
                    <input type="text" className="searchInput"></input>
                    <button className="searchBtn">검색</button>
                </section>
                <h1>여러 후기를 둘러 보세요!</h1>
                <section className="reviewContainer">
                    {dummyData.map((item, idx) => (
                        <div key={idx} className="reviewFrame">
                            <div className="thumnail">{item.thumnail}</div>
                            <div className="title">{item.title}</div>
                            <div className="content">{item.content}</div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default MainPage;
