import { useEffect, useState } from "react";
import "../../styles/survey/end.css";

import useChangeUrl from "@/Hooks/ChangeUrl";

const MakeUrlpage = () => {
    const [name,setName] = useState("");
    const [url,setUrl] = useState("")

    const { Encoding, Decoding } = useChangeUrl();


    useEffect(() => {
        const after = Encoding(name)
        const Url = `http://hka.kr/survey/${after}`
        setUrl(Url);
    },[name])
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
          <p className="introduce">Url 제작화면</p>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          ><input
          style={{
            width: "70%",
            height: 40,
            borderTop: 0,
            borderLeft: 0,
            borderRight: 0,
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={"업체명을 입력해주세요."}
        />
        </div>
        <p>{url}</p>
        </div>
      </div>
    </>
  );
};

export default MakeUrlpage;
