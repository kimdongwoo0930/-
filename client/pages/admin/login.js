import "../../styles/admin/login.css";



const LoginPage = () => {
  return (
    <>
      <div className="Main">
        <div className="Header">
          <div>
            <div className="SmallRectangle"></div>
            <div className="SmallRectangle"></div>
          </div>
          <div>
            <div className="BigRectangle"></div>
          </div>
          <div>
            <p className="LogoTitle">Heungkuk</p>
            <p className="LogoDescription">예약 관리 페이지</p>
          </div>
        </div>
        <div className="Body">
            <div className="login-box">
                <div className="login-title">로그인</div>
                <input className="login-input"  placeholder="아이디"></input>
                <input className="login-input" placeholder="비밀번호"></input>
                <button  className="login-button">로그인</button>
            </div>

        </div>
    </div>
    </>
  );
};

export default LoginPage;
