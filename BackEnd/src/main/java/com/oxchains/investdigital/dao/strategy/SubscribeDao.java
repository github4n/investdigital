package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.Subscribe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xuqi on 2017/12/13.
 */
@Repository
public interface SubscribeDao extends CrudRepository<Subscribe,Long>{
    Subscribe findByStrategyId(Long id);
    Page<Subscribe> findAll(Pageable pageable);
}
