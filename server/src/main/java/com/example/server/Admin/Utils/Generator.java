package com.example.server.Admin.Utils;

import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.UUID;


@Component
public class Generator implements UniqueIdGenerator{

    @Override
    public  String generateUniqueId() {
        // UUID 생성
        UUID uuid = UUID.randomUUID();

        // UUID를 문자열로 변환하여 '-' 제거
        String uuidString = uuid.toString().replace("-", "");

        // 48자리로 잘라내기 (UUID의 길이는 36이므로, 나머지 12자리를 랜덤으로 생성)
        String randomPart = generateRandomString(12);

        // 최종적으로 48자리의 고유번호 생성
        return uuidString + randomPart;
    }

    private static String generateRandomString(int length) {
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            int randomNumber = random.nextInt(62); // 0부터 61 사이의 랜덤 숫자 선택
            int ascii;
            if (randomNumber < 10) {
                ascii = 48 + randomNumber; // 숫자 0부터 9까지
            } else if (randomNumber < 36) {
                ascii = 65 + (randomNumber - 10); // 대문자 A부터 Z까지
            } else {
                ascii = 97 + (randomNumber - 36); // 소문자 a부터 z까지
            }
            sb.append((char) ascii);
        }
        return sb.toString();
    }
}
