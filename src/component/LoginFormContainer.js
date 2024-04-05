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
                <h1>어서 오세요.</h1>
                <span>이메일 주소</span>
                <input type="email"></input>
                <span>패스워드</span>
                <input type="password"></input>
                <button>로그인</button>
            </div>
        </div>,
        document.body
    );
};
export default LoginFormContainer;
