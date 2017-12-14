package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.Earning;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/14.
 */
public interface EarningDao extends CrudRepository<Earning,Long> {
    Page<Earning> findAll(Pageable pageable);
    Earning findByStrategyId(Long id);
}
