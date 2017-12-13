package com.oxchains.investdigital.dao;


import com.oxchains.investdigital.entity.Fund;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author ccl
 * @time 2017-12-12 17:10
 * @name UserRepo
 * @desc:
 */
@Repository
public interface FundRepo extends CrudRepository<Fund,Long> {

}
