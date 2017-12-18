package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.UserPosition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/15.
 */
@Repository
public interface UserPositionDao extends CrudRepository<UserPosition,Long>{
    Page<UserPosition> findAll(Pageable pageable);
   List<UserPosition> findByUserId(Long userId);
    List<UserPosition> findByUserIdAndAndFundId(Long userId,Long fundId);

}
