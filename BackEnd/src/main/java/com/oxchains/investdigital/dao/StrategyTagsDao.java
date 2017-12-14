package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.StrategyTags;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/13.
 */
@Repository
public interface StrategyTagsDao extends CrudRepository<StrategyTags,Integer>{
}
