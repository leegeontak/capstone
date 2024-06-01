import { useEffect, useState } from "react";
import axios from "axios";
import "../pagesStyle/MyReviewStyle.css";
import { useNavigate } from "react-router-dom";

const MyReview = () => {
    const [reviewData, setReviewData] = useState([]);
    const [radioChecked, setRadioChecked] = useState(true);
    const navigate = useNavigate();
    const getAllReview = async (userID, radioChecked) => {
        try {
            const response = await axios.post("/api/getreview", {
                id: userID,
                checked: radioChecked,
            });
            setReviewData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    const deleteMyReview = async (reviewDate) => {
        try {
            await axios.post("/api/deletereview", { reviewDate: reviewDate });
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };
    useEffect(() => {
        const userID = sessionStorage.getItem("id");
        if (userID) {
            console.log("돌아가는중");
            getAllReview(userID, radioChecked);
        } else {
            console.log("아이디없음");
        }
    }, [radioChecked]);
    console.log(reviewData);
    const reviewClick = (e) => {
        const targetClass = e.currentTarget.className;
        const detailTargetReview = targetClass.split(" ")[1];
        console.log(detailTargetReview);
        navigate(`/reviewdetailpage?query=${detailTargetReview}`);
    };
    const reviewDelete = (e) => {
        const targetClass = e.currentTarget.className;
        const deleteTargetReview = targetClass.split(" ")[1];
        console.log(deleteTargetReview);
        if (window.confirm("이 리뷰를 삭제하시겠습니까?")) {
            deleteMyReview(deleteTargetReview);
            window.location.reload();
        } else {
            return;
        }
    };
    return (
        <div className="headerContainer">
            <h1
                style={{
                    textAlign: "center",
                    paddingTop: "50px",
                    paddingBottom: "50px",
                }}
            >
                작성하신 글들을 확인해보세요!
            </h1>
            <div className="myReviewRadioBtnContainer">
                <input
                    type="radio"
                    id="new"
                    name="time"
                    value="최신순"
                    checked={radioChecked}
                    onChange={() => {
                        setRadioChecked(!radioChecked);
                        console.log(radioChecked);
                    }}
                ></input>
                <label htmlFor="new">
                    <span>최신순</span>
                </label>

                <input
                    type="radio"
                    id="old"
                    name="time"
                    value="오래된순"
                    checked={!radioChecked}
                    onChange={() => {
                        setRadioChecked(!radioChecked);
                        console.log(radioChecked);
                    }}
                ></input>
                <label htmlFor="old">
                    <span>오래된순</span>
                </label>
            </div>

            <div className="MyReviewContainer">
                <div className="wholeBody">
                    {reviewData.map((item, idx) => {
                        return (
                            <div className={`MyReviewFrameContainer`}>
                                <div
                                    key={idx}
                                    className={`reviewFrame ${item.reviewDate}`}
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
                                        <div className="title">
                                            {item.title}
                                        </div>
                                        <div className="content">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                                <div className="MyReviewBtnContainer">
                                    <div className={`edit ${item.reviewDate}`}>
                                        <img src="/images/edit.png"></img>
                                    </div>
                                    <div
                                        className={`remove ${item.reviewDate}`}
                                        onClick={(e) => reviewDelete(e)}
                                    >
                                        <img src="/images/trash.png"></img>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
export default MyReview;
