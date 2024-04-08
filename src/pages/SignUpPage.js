import "../pagesStyle/SignUpPageStyle.css";

const SignUpPage = () => {
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
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpEmail">이메일</label>
                </div>
                <input
                    type="email"
                    placeholder="로그인 할 때 필요한 이메일을 적어주세요"
                    id="signUpEmail"
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpPassword">패스워드</label>
                </div>
                <input
                    type="password"
                    placeholder="패스워드를 생성해주세요"
                    id="signUpPassword"
                ></input>
                <div className="signUpLabelContainer">
                    <label htmlFor="signUpTel">전화번호</label>
                </div>
                <input
                    type="tel"
                    placeholder="전화번호를 입력해주세요"
                    id="signUpTel"
                ></input>
                <button className="signUpBtn" style={{ width: 200 }}>
                    가입하기
                </button>
            </div>
        </div>
    );
};
export default SignUpPage;
