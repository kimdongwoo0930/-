# Survey_Token

- Table : surveyToken
- Description : 설문조사 토큰 존재 여부를 확인하는 테이블

| Field        | Type    | Description |
|--------------|---------|:-----------:|
| id           | long    |  계정 고유 번호   |
| organization | string  |    업체 명     |
| token        | string  |     토큰      |
| expiration   | boolean |  토큰 만료 여부   |

<br>

---

# Survey

- Table : survey
- Description : 설문조사 응답 정보를 저장하는 테이블

| Field        | Type   | Description |
|--------------|--------|:-----------:|
| id           | long   |  계정 고유 번호   |
| organization | string |    업체 명     |
| token        | string |     토큰      |
| answer_1     | String |  설문조사 1번 답  |
| answer_2     | String |  설문조사 2번 답  |
| answer_3     | String |  설문조사 3번 답  |
| answer_4     | String |  설문조사 4번 답  |
| answer_5     | String |  설문조사 5번 답  |
| answer_6     | String |  설문조사 6번 답  |
| answer_7     | String |  설문조사 7번 답  |
| answer_8     | String |  설문조사 8번 답  |
| answer_9     | String |  설문조사 9번 답  |
| answer_10    | String | 설문조사 10번 답  |
| answer_11    | String | 설문조사 11번 답  |



<br>

---


# ACCOUNT

- Table : account
- Description : 계정 관련 정보를 저장하는 테이블

| Field    | Type   | Description |
|----------|--------|:-----------:|
| id       | long   |  계정 고유 번호   |
| username | string |   사용자 이름    |
| password | string |  사용자 비밀번호   |
| role     | string |   사용자 권한    |
| state    | String |  계정 활성화 여부  |

<br>

---

# Record_Reservation_class

- Table : record_reservation_class
- Description : 강의실 예약 정보를 기록하는 테이블

| Field                  | Type   | Description |
|------------------------|--------|:-----------:|
| id                     | long   |     ID      |
| organization           | string |    업체 명     |
| class_room             | string |     강의실     |
| start_reservation_date | string |  예약 시작 날짜   |
| end_reservation_date   | string |   예약 끝 날짜   |
| reservation_id         | string |  예약 고유 번호   |


<br>

---



# Reservation_class

- Table : reservation_class
- Description : 강의실 예약 정보를 저장하는 테이블

| Field          | Type   | Description |
|----------------|--------|:-----------:|
| id             | long   |     ID      |
| organization   | string |    업체 명     |
| class_room     | string |     강의실     |
| start_year     | string |  예약 시작 연도   |
| start_month    | string |   예약 시작 월   |
| start_day      | string |   예약 시작 일   |
| end_year       | string |   예약 끝 연도   |
| end_month      | string |   예약 끝 월    |
| end_day        | string |   예약 끝 일    |
| reservation_id | string |  예약 고유 번호   |
| color_code     | string |   업체 색 코드   |
