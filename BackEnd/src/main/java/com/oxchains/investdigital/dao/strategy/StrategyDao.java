package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.Strategy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/13.
 */
@Repository
public interface StrategyDao extends CrudRepository<Strategy,Long>{
    Page<Strategy> findByUserId(Long userId, Pageable pageable);
    Page<Strategy> findAll(Pageable pageable);
    List<Strategy> findByIdIsIn(Long[] ids);
    List<Strategy> findByIdIn(Long[] ids);
}
