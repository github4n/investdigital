package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.Earning;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

/**
 * Created by xuqi on 2017/12/14.
 */
public interface EarningDao extends CrudRepository<Earning,Long> {
    Page<Earning> findAll(Pageable pageable);
    Earning findByStrategyId(Long id);
    Integer countByTotalReturnGreaterThan(double totalReturn);
}
