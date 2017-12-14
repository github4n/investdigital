package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.Subscribe;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xuqi on 2017/12/13.
 */
@Repository
public interface SubscribeDao extends CrudRepository<Subscribe,Long>{
}
