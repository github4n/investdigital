package com.oxchains.investdigital.dao;

import com.oxchains.investdigital.entity.Tags;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by xuqi on 2017/12/13.
 */
@Repository
public interface TagsDao extends CrudRepository<Tags,Integer>{
}
