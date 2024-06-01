import "../componentStyle/ShowReviewStyle.css";

const ShowReview = ({ responseData }) => {
    const reviewClick = (e) => {
        const showReviewDate = e.currentTarget.id;
        console.log(showReviewDate);
    };
    return (
        <div className="showReviewContainer">
            {responseData.map((item, idx) => (
                <div
                    className="reviewFrame"
                    id={item.reviewDate}
                    onClick={(e) => reviewClick(e)}
                >
                    <img
                        src={`/images/${
                            item.reviewImages.filter((item) => item !== "")[0]
                        }`}
                        className="thumnail"
                    ></img>
                    <div className="contentFrame">
                        <div className="title">{item.title}</div>
                        <div className="content">{item.content}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default ShowReview;
