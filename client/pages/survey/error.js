import "../../styles/survey/end.css";

const Errorpage = () => {
  return (
    <>
      <div className="Main">
        <div className="Header">
          <div style={{}}>
            <div className="SmallRectangle"></div>
            <div className="SmallRectangle"></div>
          </div>
          <div style={{}}>
            <div className="BigRectangle"></div>
          </div>
          <div style={{}}>
            <p className="LogoTitle">Heungkuk</p>
            <p className="LogoDescription">Life Insurance</p>
          </div>
        </div>
        <br />

        <div className="Title">
          <p>흥국생명연수원 이용 만족도 조사</p>
        </div>
        <div className="Body">
          <p className="introduce">데이터에 오류가 발생했습니다. 보내주신 주소로 재접속 부탁드립니다.</p>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Errorpage;
