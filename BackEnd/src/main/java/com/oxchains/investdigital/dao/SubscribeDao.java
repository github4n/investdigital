package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.Subscribe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by xuqi on 2017/12/13.
 */
@Repository
public interface SubscribeDao extends CrudRepository<Subscribe,Long>{
    Subscribe findByStrategyId(Long id);
    Page<Subscribe> findAll(Pageable pageable);
}
