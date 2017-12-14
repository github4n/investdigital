package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.EarningInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xuqi on 2017/12/14.
 */
@Repository
public interface EarningInfoDao extends CrudRepository<EarningInfo,Long>{
}
