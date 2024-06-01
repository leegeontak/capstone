import { useState } from "react";
import "../componentStyle/HeaderStyle.css";
import LoginFormContainer from "./LoginFormContainer";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Header = () => {
    const [loginBtnClick, setLoginBtnClick] = useState(false);
    const sessionID = window.sessionStorage.getItem("id");
    const navigate = useNavigate();
    const writeReview = () => {
        if (sessionID) {
            navigate("../reviewpage");
        } else {
            return alert("로그인 후 이용 가능한 서비스입니다");
        }
    };
    return (
        <>
            <header>
                <div className="navContainer">
                    <Link
                        to={"/"}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="logo">LOGO</div>
                    </Link>

                    <div className="review" onClick={writeReview}>
                        리뷰 쓰기
                    </div>
                    {sessionID ? (
                        <button className="profile">
                            <img src="/images/profile.png"></img>
                            <div className="profileDetail">
                                <div
                                    className="myReview"
                                    onClick={() => {
                                        navigate("/myreview");
                                    }}
                                >
                                    내가 쓴 리뷰
                                </div>
                                <div className="myInfo">내 정보</div>
                                <div
                                    className="logout"
                                    onClick={() => {
                                        window.sessionStorage.removeItem("id");
                                        window.location.reload();
                                    }}
                                >
                                    로그아웃
                                </div>
                            </div>
                        </button>
                    ) : (
                        <button
                            className="login"
                            onClick={() => setLoginBtnClick(!loginBtnClick)}
                        >
                            로그인
                        </button>
                    )}
                </div>
            </header>
            {loginBtnClick ? (
                <LoginFormContainer
                    toggleModal={() => setLoginBtnClick(!loginBtnClick)}
                ></LoginFormContainer>
            ) : null}
        </>
    );
};

export default Header;
