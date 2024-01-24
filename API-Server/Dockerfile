# 사용할 베이스 이미지를 선택
FROM openjdk:17

# 작업 디렉토리 설정

# JAR 파일 복사
ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar


# 컨테이너가 시작될 때 실행할 명령
ENTRYPOINT ["java", "-jar", "/app.jar"]