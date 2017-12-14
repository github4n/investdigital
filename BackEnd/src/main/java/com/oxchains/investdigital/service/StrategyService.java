package com.oxchains.investdigital.service;

import com.oxchains.investdigital.common.*;
import com.oxchains.investdigital.dao.*;
import com.oxchains.investdigital.entity.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import javax.annotation.Resource;
import javax.transaction.Transactional;
import java.text.ParseException;
import java.util.*;

/**
 * Created by xuqi on 2017/12/13.
 */
@Service
@Transactional(rollbackOn = Exception.class)
public class StrategyService {
    private final Logger LOG = LoggerFactory.getLogger(this.getClass());
    @Resource
    private StrategyDao strategyDao;
    @Resource
    private EarningDao earningDao;
    @Resource
    private SubscribeDao subscribeDao;
    @Resource
    private StrategyTagsDao tagsDao;
    @Resource
    private UserRepo userRepo;
    @Resource
    private StrategyTagsCenterDao centerDao;
    @Resource
    private EarningInfoDao earningInfoDao;
    /**
     * 我的策略
     * */
    public RestRespPage getUserStrategy(Pojo pojo){
        Page<Strategy> page = null;
        List<Strategy> strategyList = null;
        List<StrategyInfo> strategyInfoList = null;
        try {
            Pageable pageable = new PageRequest(pojo.getPageNum()-1,pojo.getPageSize(),new Sort(Sort.Direction.DESC,pojo.getDesc()));
            page = strategyDao.findByUserId(pojo.getUserId(),pageable);
            strategyList = page.getContent();
            strategyInfoList = new ArrayList<>(strategyList.size());
            for (Strategy strategy:strategyList) {
                StrategyInfo strategyInfo = new StrategyInfo();
                strategyInfo.setStrategy(strategy);

                List<StrategyTagsCenter> byStrategyId = centerDao.findByStrategyId(strategy.getId());
                List<StrategyTags> tagsList = new ArrayList<>(byStrategyId.size());
                for (StrategyTagsCenter tagsCenter: byStrategyId) {
                    tagsList.add(tagsDao.findOne(tagsCenter.getTagId()));
                }
                strategyInfo.setTags(tagsList);

                Optional<User> userOptional = Optional.of(userRepo.findOne(strategy.getUserId()));
                strategyInfo.setUser(userOptional.get());

                Optional<Subscribe> subscribeOptional = Optional.of(subscribeDao.findByStrategyId(strategy.getId()));
                strategyInfo.setSubscribe(subscribeOptional.get());

                Earning earning = this.getEarningByStrtegyId(null, strategy.getId());
                strategyInfo.setEarning(earning);

                strategyInfoList.add(strategyInfo);
            }

        } catch (Exception e) {
            LOG.error("get user strategy faild",e);
            return RestRespPage.fail();
        }
        return RestRespPage.success(strategyInfoList,page.getTotalElements());
    }
    /**
     * 获取精英策略
     * */
    public RestResp getGreatStrategy(Pojo pojo){
        List<Strategy> strategyList = null;
        Page<Earning> page = null;
        List<StrategyInfo> infoList = null;
        try {
            Pageable pageable = new PageRequest(0,pojo.getPageSize(),new Sort(Sort.Direction.DESC,"totalReturn"));
            page = earningDao.findAll(pageable);
            List<Earning> content = page.getContent();
            List<Long> ids = new ArrayList<>(content.size());
            for(Earning e:content){
                ids.add(e.getStrategyId());
            }
            strategyList = strategyDao.findByIdIsIn(ids.toArray(new Long[ids.size()]));
            infoList = new ArrayList<>(ids.size());
            for (Strategy strategy:strategyList) {
                StrategyInfo strategyInfo = new StrategyInfo();
                strategyInfo.setStrategy(strategy);

                List<StrategyTagsCenter> byStrategyId = centerDao.findByStrategyId(strategy.getId());
                List<StrategyTags> tagsList = new ArrayList<>(byStrategyId.size());
                for (StrategyTagsCenter tagsCenter: byStrategyId) {
                    tagsList.add(tagsDao.findOne(tagsCenter.getTagId()));
                }
                strategyInfo.setTags(tagsList);

                Optional<User> userOptional = Optional.of(userRepo.findOne(strategy.getUserId()));
                strategyInfo.setUser(userOptional.get());

                Optional<Subscribe> subscribeOptional = Optional.of(subscribeDao.findByStrategyId(strategy.getId()));
                strategyInfo.setSubscribe(subscribeOptional.get());

                Earning earning = this.getEarningByStrtegyId(content, strategy.getId());
                strategyInfo.setEarning(earning);
                infoList.add(strategyInfo);
            }
        } catch (Exception e) {
            LOG.error("get great strategy faild :{}",e.getMessage(),e);
            return RestRespPage.fail(e.getMessage());
        }
        return RestRespPage.success(infoList,page.getTotalElements());
    }
    /**
     * 获取全部策略
     * */
    public RestResp getAllStrategy(Pojo pojo){
        List<Strategy> strategyList = null;
        List<StrategyInfo> infoList = null;
        Pageable pageable = null;
        Page page = null;
        try {
            List<Long> ids = new ArrayList<>();
            pageable = new PageRequest(pojo.getPageNum()-1,pojo.getPageSize(),new Sort(Sort.Direction.DESC,pojo.getDesc()));
            if(pojo.getDesc().equals("alreadySubscribed")){
                Page<Subscribe> all = subscribeDao.findAll(pageable);
                ids = new ArrayList<>(all.getContent().size());
                for (Subscribe sub:all.getContent()) {
                    ids.add(sub.getStrategyId());
                }
                Long[] array = ids.toArray(new Long[ids.size()]);
                strategyList = strategyDao.findByIdIn(array);
            }
            if(pojo.getDesc().equals("score")){
                strategyList = strategyDao.findAll(pageable).getContent();

            }
            if(pojo.getDesc().equals("totalReturn")|| pojo.getDesc().equals("annualizedReturn")){
                Page<Earning> all = earningDao.findAll(pageable);
                ids = new ArrayList<>(all.getContent().size());
                for (Earning earning:all.getContent()) {
                    ids.add(earning.getStrategyId());
                }
                strategyList = strategyDao.findByIdIsIn(ids.toArray(new Long[ids.size()]));
            }
            infoList = new ArrayList<>(ids.size());
            for (Strategy strategy:strategyList) {
                StrategyInfo strategyInfo = new StrategyInfo();
                strategyInfo.setStrategy(strategy);

                List<StrategyTagsCenter> byStrategyId = centerDao.findByStrategyId(strategy.getId());
                List<StrategyTags> tagsList = new ArrayList<>(byStrategyId.size());
                for (StrategyTagsCenter tagsCenter: byStrategyId) {
                    tagsList.add(tagsDao.findOne(tagsCenter.getTagId()));
                }
                strategyInfo.setTags(tagsList);

                Optional<User> userOptional = Optional.of(userRepo.findOne(strategy.getUserId()));
                strategyInfo.setUser(userOptional.get());

                Optional<Subscribe> subscribeOptional = Optional.of(subscribeDao.findByStrategyId(strategy.getId()));
                strategyInfo.setSubscribe(subscribeOptional.get());

                Earning earning = this.getEarningByStrtegyId(null, strategy.getId());
                strategyInfo.setEarning(earning);
                infoList.add(strategyInfo);
            }
        } catch (Exception e) {
            LOG.error("get great strategy faild :{}",e.getMessage(),e);
            return RestRespPage.fail(e.getMessage());
        }
        return RestRespPage.success(infoList,strategyDao.count());
    }

    private Earning getEarningByStrtegyId(List<Earning> content,Long id){
        if(content == null){
            return earningDao.findByStrategyId(id);
        }
        for (Earning e: content) {
            if(e.getStrategyId() == id.longValue()){
                return e;
            }
        }
     return earningDao.findByStrategyId(id);
    }
    private List<Strategy> sortStrategy(){return null;}
}
