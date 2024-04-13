import { useState } from "react";
import "../componentStyle/HeaderStyle.css";
import LoginFormContainer from "./LoginFormContainer";
import { Link } from "react-router-dom";

const Header = () => {
    const [loginBtnClick, setLoginBtnClick] = useState(false);
    return (
        <>
            <header>
                <div className="navContainer">
                    <div className="logo">LOGO</div>
                    <Link
                        to={"../reviewpage"}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <div className="review">리뷰 쓰기</div>
                    </Link>

                    <button
                        className="login"
                        onClick={() => setLoginBtnClick(!loginBtnClick)}
                    >
                        로그인
                    </button>
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
