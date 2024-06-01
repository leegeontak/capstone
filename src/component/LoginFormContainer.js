import { useState } from "react";
import "../componentStyle/LoginFormContainerStyle.css";
import { createPortal } from "react-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginFormContainer = ({ toggleModal }) => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const handleFormClick = (e) => {
        // 이벤트가 loginForm 클래스가 있는 div에서 발생한 경우, 모달을 닫지 않음
        e.stopPropagation();
    };
    const handleLogin = async () => {
        try {
            await axios.post("/api/login", { loginEmail, loginPassword });
            console.log(loginEmail, loginPassword);
            alert("로그인 성공!");
            window.sessionStorage.setItem("id", loginEmail);
            setLoginEmail("");
            setLoginPassword("");
            window.location.reload();
        } catch (error) {
            // console.log(loginEmail, loginPw);
            console.error("로그인 실패: ", error);
            alert("로그인에 실패했습니다.");
        }
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
                <input
                    type="email"
                    id="email"
                    placeholder="이메일"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                ></input>
                <label htmlFor="password" style={{ marginTop: 15 }}>
                    패스워드
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="패스워드"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                ></input>
                <button
                    className="login"
                    style={{ width: 200, marginTop: 100, marginLeft: 100 }}
                    onClick={handleLogin}
                >
                    로그인
                </button>
                <div className="signUpBtnContainer">
                    <Link to={"../signuppage"}>
                        <button className="moveSignUpPage">
                            <span style={{ textDecoration: "underLine" }}>
                                회원가입하여
                            </span>
                            <div style={{ marginTop: 5 }}>
                                서비스를 이용해보세요
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
        </div>,
        document.body
    );
};
export default LoginFormContainer;
