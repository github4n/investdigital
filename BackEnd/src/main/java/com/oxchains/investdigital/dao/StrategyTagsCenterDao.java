package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.StrategyTagsCenter;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/14.
 */
@Repository
public interface StrategyTagsCenterDao extends CrudRepository<StrategyTagsCenter,Long> {
    List<StrategyTagsCenter> findByStrategyId(Long id);
}
