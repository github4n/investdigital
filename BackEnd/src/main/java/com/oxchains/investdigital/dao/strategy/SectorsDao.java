package com.oxchains.investdigital.dao.strategy;

import com.oxchains.investdigital.entity.strategy.Sectors;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xuqi on 2017/12/15.
 */
@Repository
public interface SectorsDao extends CrudRepository<Sectors,Integer>{
}
