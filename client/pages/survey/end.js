import "../../styles/survey/end.css";

const Endpage = () => {
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
          <p className="introduce">설문에 응하여 주셔서 감사합니다.</p>
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

export default Endpage;
