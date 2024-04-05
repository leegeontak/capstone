import { useState } from "react";
import "../componentStyle/HeaderStyle.css";
import LoginFormContainer from "./LoginFormContainer";

const Header = () => {
    const [loginBtnClick, setLoginBtnClick] = useState(false);
    return (
        <>
            <header>
                <div className="navContainer">
                    <div className="logo">LOGO</div>
                    <div className="review">리뷰</div>
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
