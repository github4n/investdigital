package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.UserTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xuqi on 2017/12/15.
 */
@Repository
public interface UserTransactionDao extends CrudRepository<UserTransaction,Long>{
    Page<UserTransaction> findAll(Pageable pageable);
    Page<UserTransaction> findByUserId(Long userId,Pageable pageable);
}
