import "../componentStyle/ShowReviewStyle.css";

const ShowReview = () => {
    return (
        <div className="showReviewContainer">
            <div className="reviewFrame">
                <img src="/images/picture.png" className="thumnail"></img>
                <div className="title">타이틀1</div>
                <div className="content">내용1</div>
            </div>
            <div className="reviewFrame">
                <img src="/images/picture.png" className="thumnail"></img>
                <div className="title">타이틀1</div>
                <div className="content">내용1</div>
            </div>
        </div>
    );
};
export default ShowReview;
