package com.oxchains.investdigital.dao;


import com.oxchains.investdigital.entity.FundComment;
import com.oxchains.investdigital.entity.PurchaserInfo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * @author ccl
 * @time 2017-12-12 17:10
 * @name UserRepo
 * @desc:
 */
@Repository
public interface PurchaserInfoRepo extends CrudRepository<PurchaserInfo,Long> {
}
