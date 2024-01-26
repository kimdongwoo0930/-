/*
    설문조사 시작 페이지
*/
import { useRouter } from "next/router";
import "../../../styles/survey/id.css";
import Link from "next/link";

import data from "../../../public/survey/data.js";
import { useEffect, useState } from "react";

import usePostAxios from "../../../Hooks/AxiosApi.js";
const SurveyPage = () => {
  const router = useRouter();
  const { organization, id } = router.query;

  const [checkNum, setCheckNum] = useState();
  const [opinion, setOpinion] = useState();

  const { postdata, posterrer, postloaded, PostAxios } = usePostAxios();
  const [responseData, setResponseData] = useState([organization]);


  const QnA = data?.questions.find(
    (question) => question.num === parseInt(id, 10)
  );

  useEffect(() => {
    setCheckNum("");
    setOpinion("");
  }, []);

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
          {QnA?.question}
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {QnA?.answer.map((ans, index) => (
            <div
              key={index}
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
        {checkNum === QnA?.answer.length - 1 && id <= 4 ? (
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
        ) : id >= 5 && id < 11 ? (
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
              placeholder={" * 불만족 내용은 무엇입니까? "}
            />
          </div>
        ) : (
          <></>
        )}
        {checkNum !== "" || id === "11" ? (
          <div className="next">
            <Link
              href={
                responseData[0] === "" ?
                "/survey/error" : 
                id === "11"
                  ? "/survey/end"
                  : `/survey/${organization}/${parseInt(id, 10) + 1}`
              }
              style={{
                color: "white",
                fontWeight: "bold",
                textDecoration: "none",
              }}
              onClick={() => {
                setCheckNum("");
                setOpinion("");
                const Data = [...responseData];
                Data[id] =
                  id !== "11"
                    ? `${QnA.answer[checkNum]}/${opinion}`
                    : `${opinion}`;
                setResponseData(Data);
                if (id === "11") {
                  const url = process.env.NEXT_PUBLIC_SURVEY_API_URL;
                  const payload = {
                    organization: responseData[0],
                    answer_1: responseData[1],
                    answer_2: responseData[2],
                    answer_3: responseData[3],
                    answer_4: responseData[4],
                    answer_5: responseData[5],
                    answer_6: responseData[6],
                    answer_7: responseData[7],
                    answer_8: responseData[8],
                    answer_9: responseData[9],
                    answer_10: responseData[10],
                    answer_11: opinion,
                  };
                  PostAxios(url, payload);
                }
              }}
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
