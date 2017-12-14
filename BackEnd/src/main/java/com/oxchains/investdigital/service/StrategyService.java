package com.oxchains.investdigital.service;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.common.RestRespPage;
import com.oxchains.investdigital.dao.StrategyDao;
import com.oxchains.investdigital.entity.Pojo;
import com.oxchains.investdigital.entity.Strategy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by xuqi on 2017/12/13.
 */
@Service
public class StrategyService {
    private final Logger LOG = LoggerFactory.getLogger(this.getClass());
    @Resource
    private StrategyDao strategyDao;
    public RestRespPage getUserStrategy(Pojo pojo){
        Page<Strategy> page = null;
        List<Strategy> strategyList = null;
        try {
            Pageable pageable = new PageRequest(pojo.getPageNum()-1,pojo.getPageSize(),new Sort(Sort.Direction.DESC,pojo.getDesc()));
            page = strategyDao.findByUserId(pojo.getUserId(),pageable);
            strategyList = page.getContent();
        } catch (Exception e) {
            LOG.error("get user strategy faild",e);
            return RestRespPage.fail();
        }
        return RestRespPage.success(strategyList,page.getTotalElements());
    }
    public RestRespPage getGreatStrategy(){
        return RestRespPage.success();
    }
}
