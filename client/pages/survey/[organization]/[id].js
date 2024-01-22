/*
    설문조사 시작 페이지
*/
import { useRouter } from "next/router";
import "../../../styles/survey/id.css";
import Link from "next/link";

import data from "../../../public/survey/data.js";
import { useEffect, useState } from "react";

const SurveyPage = () => {
  const router = useRouter();
  const { organization, id } = router.query;

  const [checkNum, setCheckNum] = useState();
  const [opinion, setOpinion] = useState();

  console.log(id);
  console.log(checkNum);

  useEffect(() => {
    setCheckNum("");
  }, []);

  const QnA = data.questions.find(
    (question) => question.num === parseInt(id, 10)
  );
  console.log(QnA);

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
        <p
          style={{
            fontWeight: "bold",
            marginBottom: 30,
            textAlign: "left",
            marginLeft: 5,
            marginRight: 5,
          }}
        >
          {QnA.question}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {QnA.answer.map((ans, index) => (
            <div
              style={{
                display: "flex",
                width: "30%",
                //background: "red",
                alignItems: "center",
              }}
            >
              <input
                type={"checkbox"}
                style={{ background: "red", marginLeft: 10, marginRight: 15 }}
                onChange={() => setCheckNum(index)}
                checked={checkNum === index ? true : false}
              />
              <p className="answerStyle" onClick={() => setCheckNum(index)}>
                {ans}
              </p>
            </div>
          ))}
        </div>
        {/* 이부분은 1 ~ 4번 까지의 질문에는 기타가 있기때문에 존재하는 칸입니다.  */}
        {/* 11번 입력칸 부분 */}
        {checkNum === QnA.answer.length - 1 && id <= 4 ? (
          <input
            className="opinion"
            onChange={(e) => setOpinion(e.target.value)}
            value={opinion}
            placeholder={"기타사항을 작성해 주세요."}
          />
        ) : id === "11" ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <input
              style={{
                width: "70%",
                height: 40,
                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
              }}
              onChange={(e) => setOpinion(e.target.value)}
              value={opinion}
              placeholder={"자유롭게 작성해주세요."}
            />
          </div>
        ) : (
          <></>
        )}
        {checkNum !== "" || id === "11" ? (
          <div className="next">
            <Link
              href={
                id === "11"
                  ? "/survey/end"
                  : `/survey/${organization}/${parseInt(id, 10) + 1}`
              }
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
              onClick={() => setCheckNum("")}
            >
              {id !== "11" ? "다음" : "끝내기"}
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default SurveyPage;
