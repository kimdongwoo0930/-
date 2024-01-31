import { useEffect, useState } from "react";
import "../../styles/survey/make-url.css";

import useAxiosApi from "@/Hooks/AxiosApi";


const MakeUrlpage = () => {
    const [name,setName] = useState("");
    const [url,setUrl] = useState("")
    const { data, errer, loaded, GetAxios } = useAxiosApi();

    const handleGenerate = async() => {
      if( name.trim() === "" ) { setUrl("업체명을 입력해주세요.") }
      else{ await GetAxios(`http://localhost:8001/api/v1/generate-token/${name}`) } 
    }

    useEffect(() => {
      if(loaded){
        setUrl(`http://www.hka.kr/survey/${data.token}`)
      }
    },[loaded])


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
            <p className="LogoDescription">Life Insurance</p>
          </div>
        </div>
        <br />

        <div className="Title">
          <p>흥국생명연수원 이용 만족도 조사</p>
        </div>
        <div className="Body">
          <p className="introduce">설문조사 토큰을 생성합니다.</p>
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
        <button className="submit-button" onClick={handleGenerate}>생성</button>
        <p>{url}</p>
        </div>
      </div>
    </>
  );
};

export default MakeUrlpage;
