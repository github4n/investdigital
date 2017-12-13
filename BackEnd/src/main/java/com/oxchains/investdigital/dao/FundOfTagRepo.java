package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.FundOfTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author ccl
 * @time 2017-12-12 17:10
 * @name UserRepo
 * @desc:
 */
@Repository
public interface FundOfTagRepo extends CrudRepository<FundOfTag,Long> {

}
