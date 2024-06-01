import { useState } from "react";
import "../pagesStyle/SignUpPageStyle.css";
import axios from "axios";
const SignUpPage = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [userPasswordCheck, setUserPasswordCheck] = useState("");
    const [userTel, setUserTel] = useState("");

    const handleSubmit = async () => {
        try {
            if (userPassword !== userPasswordCheck) {
                return alert("비밀번호가 다릅니다");
            }
            await axios.post("/api/signup", {
                userName,
                userEmail,
                userPassword,
                userTel,
            });
            alert("회원가입 성공!");
            setUserName("");
            setUserEmail("");
            setUserPassword("");
            setUserPasswordCheck("");
            setUserTel("");
        } catch (error) {
            console.error("회원가입 실패: ", error);
            alert("회원가입에 실패했습니다.");
        }
    };
    return (
        <div className="signUpContainer">
            <div className="signUpFormSection">
                <div className="logo0">LOGO</div>
                <h1 style={{ paddingBottom: 20 }}>
                    회원가입하고 <br></br>서비스를 이용해보세요
                </h1>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpName">이름</label>
                </div>
                <input
                    type="text"
                    placeholder="이 사이트에서 사용할 이름을 정해주세요"
                    id="signUpName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpEmail">이메일</label>
                </div>
                <input
                    type="email"
                    placeholder="로그인 할 때 필요한 이메일을 적어주세요"
                    id="signUpEmail"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpPassword">패스워드</label>
                </div>
                <input
                    type="password"
                    placeholder="패스워드를 생성해주세요"
                    id="signUpPassword"
                    value={userPassword}
                    onChange={(e) => setUserPassword(e.target.value)}
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="checkPassword">패스워드 확인</label>
                </div>
                <input
                    type="password"
                    placeholder="패스워드를 다시 한 번 입력해주세요"
                    id="checkPassword"
                    value={userPasswordCheck}
                    onChange={(e) => setUserPasswordCheck(e.target.value)}
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpTel">전화번호</label>
                </div>
                <input
                    type="tel"
                    placeholder="전화번호를 입력해주세요"
                    id="signUpTel"
                    value={userTel}
                    onChange={(e) => setUserTel(e.target.value)}
                ></input>
                <button
                    className="signUpBtn"
                    style={{ width: 200 }}
                    onClick={handleSubmit}
                >
                    가입하기
                </button>
            </div>
        </div>
    );
};
export default SignUpPage;
