import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../pagesStyle/ReviewDetailPageStyle.css";

const ReviewDetailPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const queryDate = searchParams.get("query");
    const [review, setReview] = useState({});
    const getDetailReview = async (query) => {
        try {
            const response = await axios.post(`/api/getdetailreview`, {
                query,
            });
            // console.log(response.data[0].title);
            setReview(response.data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (queryDate) {
            getDetailReview(queryDate);
        }
    }, []);

    return (
        <div className="ReviewDetailPageContainer">
            {review ? (
                <div className="section">
                    <div className="title">{review.title}</div>
                    <div className="content">{review.content}</div>
                    {review.reviewImages &&
                        review.reviewImages.map((image, index) => (
                            <>
                                <div className="imageContainer">
                                    <img
                                        className="detailThumnail"
                                        src={`/images/${image}`}
                                        height="300px"
                                    ></img>
                                    {review.reviewObj[index].checked ? (
                                        <div className="explainStarReview">
                                            <div className="starContainer">
                                                {review.reviewObj[
                                                    index
                                                ].serviceStar.map((item) =>
                                                    item ? (
                                                        <div className="star">
                                                            <img src="/images/trueStar.png"></img>
                                                        </div>
                                                    ) : (
                                                        <div className="star">
                                                            <img src="/images/falseStar.png"></img>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <span>
                                                서비스는
                                                {" " +
                                                    review.reviewObj[
                                                        index
                                                    ].serviceStar.filter(
                                                        (star) => star === true
                                                    ).length}
                                                점 입니다
                                            </span>
                                            <div className="starContainer">
                                                {review.reviewObj[
                                                    index
                                                ].cleanStar.map((item) =>
                                                    item ? (
                                                        <div className="star">
                                                            <img src="/images/trueStar.png"></img>
                                                        </div>
                                                    ) : (
                                                        <div className="star">
                                                            <img src="/images/falseStar.png"></img>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <span>
                                                청결도는
                                                {" " +
                                                    review.reviewObj[
                                                        index
                                                    ].cleanStar.filter(
                                                        (star) => star === true
                                                    ).length}
                                                점 입니다
                                            </span>
                                            <div className="starContainer">
                                                {review.reviewObj[
                                                    index
                                                ].locationStar.map((item) =>
                                                    item ? (
                                                        <div className="star">
                                                            <img src="/images/trueStar.png"></img>
                                                        </div>
                                                    ) : (
                                                        <div className="star">
                                                            <img src="/images/falseStar.png"></img>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                            <span>
                                                접근성은
                                                {" " +
                                                    review.reviewObj[
                                                        index
                                                    ].locationStar.filter(
                                                        (star) => star === true
                                                    ).length}
                                                점 입니다
                                            </span>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="content">
                                    {review.reviewObj[index].content}
                                </div>
                            </>
                        ))}
                </div>
            ) : null}
        </div>
    );
};

export default ReviewDetailPage;
