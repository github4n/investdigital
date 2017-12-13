package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.FundIssuance;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author ccl
 * @time 2017-12-12 17:10
 * @name UserRepo
 * @desc:
 */
@Repository
public interface FundIssuanceRepo extends CrudRepository<FundIssuance,Long> {

}
