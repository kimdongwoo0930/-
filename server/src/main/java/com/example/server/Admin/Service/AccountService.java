package com.example.server.Admin.Service;

import com.example.server.Admin.Entity.Account.Account;
import com.example.server.Admin.Entity.Account.Dto.ChangeRole;
import com.example.server.Admin.Entity.Account.Dto.ChangeStatus;
import com.example.server.Admin.Entity.Account.Dto.SignupDto;
import com.example.server.Admin.Entity.Account.Dto.UserInfo;
import com.example.server.Admin.Entity.Enum.Status;
import com.example.server.Admin.Entity.ResponseMessage;
import com.example.server.Admin.Repository.AccountRepository;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.aspectj.bridge.Message;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;


    private final BCryptPasswordEncoder pwdEncoder;

    @Transactional
    public ResponseMessage Signup(SignupDto dto) {
        // 데이터의 여부 확인
        if(dto.getUsername() == null || dto.getUsername().isEmpty() || dto.getPassword() == null || dto.getPassword().isEmpty()){
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.BAD_REQUEST);
            message.setMessage("아이디 또는 비밀번호를 확인해주세요.");
            message.setData(null);
            return message;
        }
        if(accountRepository.findByUserId(dto.getUserId()) != null){
            ResponseMessage message = new ResponseMessage();
            message.setStatus(Status.BAD_REQUEST);
            message.setMessage("이미 존재하는 아이디입니다.");
            message.setData(null);
            return message;
        }


        // 회원가입을 위한 Entity 생성 / 비밀번호는 암호화 하여 넣어준다.
        Account account = Account.toEntity(dto.getUsername(),dto.getUserId(), pwdEncoder.encode(dto.getPassword()));
        // DB에 저장
        accountRepository.save(account);
        // 저장 완료 후 성공 메세지 반환
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("관리자에게 권한을 받으면 접속이 가능합니다.");
        message.setData(null);
                return message;
    }

    /**
     * 토큰으로 정보 불러오기
     * @param
     * @return
     */
    public ResponseMessage takeInfo(String userId) {
        Account account = accountRepository.findByUserId(userId);
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("정보를 불러왔습니다.");
        Map<String, String> Data = new HashMap<>();
        Data.put("username", account.getUsername());
        Data.put("role",account.getRole());
        message.setData(Data);
        return message;

    }


    public ResponseMessage makeInfoList() {
        List<Account> accountList = accountRepository.findAll();

        List<UserInfo> list = new ArrayList<>();
        for(Account account : accountList) {
            UserInfo info = new UserInfo();
            info.setUserId(account.getUserId());
            info.setUsername(account.getUsername());
            info.setStatus(account.isState());
            info.setRole(account.getRole());
            list.add(info);
        }

        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("정보를 불러왔습니다.");
        message.setData(list);

        return message;

    }

    /**
     * 승인 여부 변경
     * @param status
     * @return
     */
    @Transactional
    public ResponseMessage changeStatus(ChangeStatus status) {
        Account account = accountRepository.findByUserId(status.getUserId());
        account.setState(status.isStatus());
        accountRepository.save(account);
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("승인 여부가 변경되었습니다.");
        message.setData(null);
        return message;
    }

    /**
     * 권한 변경
     * @param role
     * @return
     */
    @Transactional
    public ResponseMessage changeRole(ChangeRole role) {
        Account account = accountRepository.findByUserId(role.getUserId());
        account.setRole(role.getRole());
        accountRepository.save(account);
        ResponseMessage message = new ResponseMessage();
        message.setStatus(Status.OK);
        message.setMessage("권한이 변경되었습니다.");
        message.setData(null);
        return message;
    }
}
