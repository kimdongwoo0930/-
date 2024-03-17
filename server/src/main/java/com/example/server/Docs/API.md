# 설문조사 토큰 생성 ( 개발완료 )

- 도메인 : /api/v1/survey/generate-token/{organization}
- Method : GET
- Token : false
- Response
    - 200 : 성공
        - organization : String
        - token : String

<br>

---
# 토큰 만료 여부 확인 ( 개발완료 )

- 도메인 : /api/v1/survey/check-token/{token}
- Method : GET
- Token : false
- Response
    - 200 : 성공
        - oranization : String
        - token : String
        - expired : boolean


---
# 설문조사 응답 제출 ( 개발완료 )

- 도메인 : /api/v1/survey/submit-survey-response
- Method : POST
- Token : false
- Request
    - token : String
    - answer_1 : String
    - answer_2 : String
    - answer_3 : String
    - answer_4 : String
    - answer_5 : String
    - answer_6 : String
    - answer_7 : String
    - answer_8 : String
    - answer_9 : String
    - answer_10 : String
    - answer_11 : String


- Response
  - 200 : 성공
      - id : long
      - organization : String
      - token : String
      - expired : boolean

    

---

# 회원가입 ( 개발완료 )

- 도메인 : /api/v1/auth/signup
- Method : POST
- Token : false
- Request
    - username : string
    - password : string
  

- Response
  - 200 : 성공
      - status : 200
      - message : "관리자에게 권한부여를 받으면 접속이 가능합니다."
      - data : null
    
    <br>
  - 200 : 실패
      - status : 400
      - message : "아이디 또는 비밀번호를 확인해주세요."
      - data : null
---
# 로그인 ( 개발 완료 )
- 도메인 : /api/v1/auth/login
- Method : POST
- Token : false
- Request
    - username : string
    - password : string
  

- Response
  - 200 : 성공
  - 401 : 권한 미부여
    - message : "권한을 부여받지 못했습니다."
  - 404 : 로그인 실패
---

# 강의실 예약 정보 (  개발 완료 )
- 도메인 : /api/v1/check/reservation/class
- Method : POST
- Token : true
- Request
    - Heders : 
        - Authorization : Bearer Token
    - year : int
    - month : int
  

- Response
  - 200 : 성공
      - status : 200
      - message : "예약 정보를 불러왔습니다."
      - data : 
          - organization : String
          - reservation_start_date: String
          - reservation_end_date: String
          - class_room : String
          - color_code : String

---

# 권한 여부 확인
- 도메인 : /api/v1/check/admin
- Method : GET
- Token : true
- Request
    - Heders : 
        - Authorization : Bearer Token

- Response
  - 200 : 성공
      - status : 200
      - message : "권한이 확인되었습니다."
      - data : 
          - result : boolean

<br>

---


# 강의실 예약 정보 등록  (개발 완료)
- 도메인 : /api/v1/admin/reservation/class
- Method : POST
- Token : true
- Request
    - Heders : 
        - Authorization : Bearer Token
    - organization : String
    - reservation_start_date: String
    - reservation_end_date: String
    - class_number : String
    - color_code : String

- Response
    - 200 : 성공
        - status : 200
        - message : "예약 정보를 등록하였습니다."
        - data : null

<br>

---

성공 : 200
토큰 만료 : 401
접근 권한 불가 : 403