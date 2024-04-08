import { useState } from "react";
import "../componentStyle/LoginFormContainerStyle.css";
import { createPortal } from "react-dom";

const LoginFormContainer = ({ toggleModal }) => {
    const handleFormClick = (e) => {
        // 이벤트가 loginForm 클래스가 있는 div에서 발생한 경우, 모달을 닫지 않음
        e.stopPropagation();
    };
    return createPortal(
        <div className="loginFormWrapper" onClick={() => toggleModal()}>
            <div className="loginForm" onClick={(e) => handleFormClick(e)}>
                <div className="loginCloseBtnContainer">
                    <button
                        className="loginCloseBtn"
                        onClick={() => toggleModal()}
                    >
                        X
                    </button>
                </div>

                <h1>어서 오세요.</h1>
                <label htmlFor="email">이메일 주소</label>
                <input type="email" id="email" placeholder="이메일"></input>
                <label htmlFor="password" style={{ marginTop: 15 }}>
                    패스워드
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="패스워드"
                ></input>
                <button
                    className="login"
                    style={{ width: 200, marginTop: 100, marginLeft: 100 }}
                >
                    로그인
                </button>
                <div className="signUpBtnContainer">
                    <button className="signUpBtn">
                        <span style={{ textDecoration: "underLine" }}>
                            회원가입하여
                        </span>{" "}
                        즐겨보세요
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
};
export default LoginFormContainer;
