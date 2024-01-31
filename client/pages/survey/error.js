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
          <p className="introduce">주소가 만료되었거나 잘못되었습니다.</p>
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
