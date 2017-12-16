package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.EarningInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/14.
 */
@Repository
public interface EarningInfoDao extends CrudRepository<EarningInfo,Long>{
    List<EarningInfo> findAllByStrategyIdAndTimeStampBetween(Long strategyId,long beginTime,long endtime);
}
