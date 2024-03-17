package com.example.server.Admin.Service;

import com.example.server.Admin.Entity.Account.Account;
import com.example.server.Admin.Entity.Account.Dto.CustomUserDetails;
import com.example.server.Admin.Repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Account account = accountRepository.findByUserId(userId);

        if(account == null){
            throw new UsernameNotFoundException("해당 유저를 찾을 수 없습니다.");
        }
        return new CustomUserDetails(account);
    }
}
