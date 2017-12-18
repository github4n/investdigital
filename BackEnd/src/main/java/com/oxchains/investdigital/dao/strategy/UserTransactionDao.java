package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.UserTransaction;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/15.
 */
@Repository
public interface UserTransactionDao extends CrudRepository<UserTransaction,Long>{
    List<UserTransaction> findByUserId(Long userId);
}
