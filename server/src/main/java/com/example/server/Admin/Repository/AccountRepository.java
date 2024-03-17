package com.example.server.Admin.Repository;

import com.example.server.Admin.Entity.Account.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account,Long> {
    Boolean existsByUsername(String name);
    
    Account findByUserId(String userId);
}
