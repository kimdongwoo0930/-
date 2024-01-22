/*
    설문조사 시작 페이지
*/

import { useRouter } from "next/router";
import "../../../styles/survey/index.css";
import Link from "next/link";

const SurveyMainPage = () => {
  const router = useRouter();
  const { organization } = router.query;
  const address = "./" + organization + "/1";

  return (
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
        <p className="introduce">
          저희 흥국생명연수원을 찾아주신 {organization} 고객님께 감사드립니다.{" "}
          <br />
          <br />
          고객님께 보다 나은 서비스를 제공해드리기 위해 이용 만족도 조사를
          실시하고자 합니다.
          <br />
          <br />
          고객님의 소중한 의견을 통해 더욱 발전하는 흥국 생명 연수원이 되도록
          하겠습니다.
        </p>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="start">
            <Link
              href={address}
              replace
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              설문 시작
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyMainPage;
