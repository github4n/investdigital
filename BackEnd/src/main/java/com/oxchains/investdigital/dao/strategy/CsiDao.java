package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.Csi;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/19.
 */
@Repository
public interface CsiDao extends CrudRepository<Csi,Long>{
    List<Csi> findByTimeBetween(Long startTime,Long endTime);
}
