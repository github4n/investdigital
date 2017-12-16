package com.oxchains.investdigital.service;

import com.oxchains.investdigital.common.*;
import com.oxchains.investdigital.dao.*;
import com.oxchains.investdigital.dao.strategy.*;
import com.oxchains.investdigital.entity.*;
import com.oxchains.investdigital.entity.strategy.*;
import com.oxchains.investdigital.entity.strategy.vo.*;
import org.apache.commons.collections.IteratorUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import javax.annotation.Resource;
import javax.transaction.Transactional;
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
    @Resource
    private UserPositionDao userPositionDao;
    @Resource
    private FundRepo fundRepo;
    @Resource
    private UserTransactionDao transactionDao;
    @Resource
    private BenchmarkDao benchmarkDao;
    @Resource
    private ProtfolioDao protfolioDao;
    @Resource
    private FactorsDao factorsDao;
    @Resource
    private BrinsonDao brinsonDao;
    @Resource
    private PlateDao plateDao;
    @Resource
    private SectorsDao sectorsDao;
    @Resource
    private StrategyCommentDao commentDao;
    private static final Long beginTime =1511798400000L ;
    private static final Long endTime = 1512576000000L;
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

                Pojo pojo1 = new Pojo();
                pojo1.setStrategyId(strategy.getId());
                pojo1.setBeginTime(beginTime);
                pojo1.setEndTime(endTime);
                List<EarningInfo> earningInfoList = this.getRunChartAll(pojo1);
                strategyInfo.setEarningInfoList(earningInfoList);

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
                Pojo pojo1 = new Pojo();
                pojo1.setStrategyId(strategy.getId());
                pojo1.setBeginTime(beginTime);
                pojo1.setEndTime(endTime);
                List<EarningInfo> earningInfoList = this.getRunChartAll(pojo1);
                strategyInfo.setEarningInfoList(earningInfoList);
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
        List<Strategy> strategyList1 = null;
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
                strategyList1= this.sortStrategy(strategyList, ids);
            }
            if(pojo.getDesc().equals("score")){
                strategyList = strategyDao.findAll(pageable).getContent();
                strategyList1 = strategyList;
            }
            if(pojo.getDesc().equals("totalReturn")|| pojo.getDesc().equals("annualizedReturn" )|| pojo.getDesc().equals("dailyReturn") || pojo.getDesc().equals("weeklyReturn") ||pojo.getDesc().equals("monthlyReturn")){
                Page<Earning> all = earningDao.findAll(pageable);
                ids = new ArrayList<>(all.getContent().size());
                for (Earning earning:all.getContent()) {
                    ids.add(earning.getStrategyId());
                }
                strategyList = strategyDao.findByIdIsIn(ids.toArray(new Long[ids.size()]));
                strategyList1= this.sortStrategy(strategyList, ids);
            }
            infoList = new ArrayList<>(ids.size());
            for (Strategy strategy:strategyList1) {
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
                Pojo pojo1 = new Pojo();
                pojo1.setStrategyId(strategy.getId());
                pojo1.setBeginTime(beginTime);
                pojo1.setEndTime(endTime);
                List<EarningInfo> earningInfoList = this.getRunChartAll(pojo1);
                strategyInfo.setEarningInfoList(earningInfoList);
                infoList.add(strategyInfo);
            }
        } catch (Exception e) {
            LOG.error("get great strategy faild :{}",e.getMessage(),e);
            return RestRespPage.fail(e.getMessage());
        }
        return RestRespPage.success(infoList,strategyDao.count());
    }
    /*
    *
    * 策略排行榜
    * */
    private Earning getEarningByStrtegyId(List<Earning> content,Long id)throws Exception{
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
    //给策略排序
    private List<Strategy> sortStrategy(List<Strategy> strategyList, List<Long> ids)throws Exception{
        List<Strategy> list = new ArrayList<>(strategyList.size());
        for (int i = 0; i < strategyList.size();i++){
            for (Strategy strategy: strategyList) {
                if (strategy.getId() == ids.get(i).longValue()){
                    list.add(strategy);
                    continue;
                }
            }
        }
        return list;
    }

    //获取brinsion分析
    public RestResp getStrategyBrinsion(Long strategyId){
        Brinson byStrategyId = null;
        try {
            byStrategyId = brinsonDao.findByStrategyId(strategyId);
        } catch (Exception e) {
            LOG.error("get strategy brinsion faild:{}",e.getMessage(),e);
            RestResp.fail();
        }
        return RestResp.success(byStrategyId);
    }

    //获取plate分析
    public RestResp getStrategyPlate(Long strategyId){
        PlateInfo plateInfo = null;
        try {
            Plate plate = plateDao.findByStrategyId(strategyId);
            Iterator<Sectors> iterator = sectorsDao.findAll().iterator();
            List<Sectors> list = IteratorUtils.toList(iterator);
            plateInfo.setSectorsList(list);
            String[] strings = plate.getValue().split(",");
            double[] doubles = new double[strings.length];
           for (int i = 0;i<strings.length;i++){
               doubles[i] = Double.parseDouble(strings[i]);
           }
           plateInfo.setPlateValue(doubles);
        } catch (Exception e) {
            LOG.error("get strategy brinsion faild:{}",e.getMessage(),e);
            return RestResp.fail();
        }
        return RestResp.success(plateInfo);
    }

    //根据策略id获取策略详情
    /**
     * strategyId
     * */
    public RestResp catStrategyInfo(Long  strategyId) {
        StrategyInfo strategyInfo = null;
        try {
            Strategy strategy = strategyDao.findOne(strategyId);
            strategyInfo = new StrategyInfo();
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

            Integer integer = earningDao.countByTotalReturnGreaterThan(earning.getTotalReturn());
            strategyInfo.setRank(integer+1);
        } catch (Exception e) {
            LOG.error("cat strategy info faild :{}",e.getMessage(),e);
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
            return RestResp.fail(e.getMessage());
        }
        return RestResp.success(strategyInfo);
    }

    /*
    *获取动态数据
    * */
    public RestResp getRunChart(Pojo pojo) {
        List<EarningInfo> earningInfos = null;
        try {
            earningInfos = earningInfoDao.findAllByStrategyIdAndTimeStampBetween(pojo.getStrategyId(), pojo.getBeginTime(), pojo.getEndTime());
        } catch (Exception e) {
            LOG.error("get run chart faild :{}",e.getMessage(),e);
            return  RestResp.fail();
        }
        return RestResp.success(earningInfos);
    }
    public  List<EarningInfo> getRunChartAll(Pojo pojo) {
        List<EarningInfo> earningInfos = null;
        try {
            earningInfos = earningInfoDao.findAllByStrategyIdAndTimeStampBetween(pojo.getStrategyId(), pojo.getBeginTime(), pojo.getEndTime());
        } catch (Exception e) {
            LOG.error("get run chart faild :{}",e.getMessage(),e);
        }
        return earningInfos;
    }

    /*
    * 获取用户持仓
    * */
    public RestResp getUserPosition(Pojo pojo){
        List<UserPosition> content = null;
        Page<UserPosition> userPositions = null;
        try {
        Pageable pageable = new PageRequest(pojo.getPageNum()-1,pojo.getPageSize(),new Sort(Sort.Direction.DESC,pojo.getDesc()));
             userPositions = userPositionDao.findAll(pageable);
             content = userPositions.getContent();
            for (UserPosition userPosition:content) {
                Fund fund = fundRepo.findOne(userPosition.getFundId());
                userPosition.setFundName(fund.getFundName());
                userPosition.setFundSymbol(fund.getFundSymbol());
            }
        } catch (Exception e) {
            LOG.error("get user position error : {}",e.getMessage(),e);
        }
        return RestRespPage.success(content,userPositions.getTotalElements());
    }
    /**
     * 获取用户的交易情况
     * */
    public RestResp getUserTransaction(Pojo pojo){
        try {
            Pageable pageable = new PageRequest(pojo.getPageNum()-1,pojo.getPageSize(),new Sort(Sort.Direction.DESC,"time"));
            Page<UserTransaction> page = transactionDao.findByUserId(pojo.getUserId(),pageable);
            List<UserTransaction> content = page.getContent();
            List<TxInfo> infoList = new ArrayList<>(content.size());
            TxInfo txInfo = null;
            for (UserTransaction transaction:content) {
                txInfo = new TxInfo();
                txInfo.setUserTransaction(transaction);
                txInfo.setFund(fundRepo.findOne(transaction.getFundId()));
                infoList.add(txInfo);
            }
            return RestRespPage.success(infoList,page.getTotalElements());
        } catch (Exception e) {
            LOG.error("get user transaction faild : {}",e.getMessage(),e);
        }
        return RestResp.fail();
    }
    /**
     * 获取策略的评论
     * */
    public RestResp getStrategyComment(Long strategyId,Integer pageSize,Integer pageNum){
        List<StrategyCommentInfo> infoList = null;
        Page<StrategyComment> page = null;
        try {
            infoList = new ArrayList<>();
            Pageable pageable = new PageRequest(pageNum-1,pageSize,new Sort(Sort.Direction.DESC,"time"));
            page = commentDao.findByStrategyId(strategyId, pageable);
            List<StrategyComment> content = page.getContent();
            StrategyCommentInfo commentInfo = null;
            for (StrategyComment comment: content) {
                commentInfo = new StrategyCommentInfo();
                commentInfo.setStrategyComment(comment);
                commentInfo.setUser(userRepo.findOne(comment.getUserId()));
                infoList.add(commentInfo);
            }
        } catch (Exception e) {
            LOG.error("get strategy comment faild :{}",e.getMessage(),e);
        }
        return RestRespPage.success(infoList,page.getTotalElements());
    }
    /**
     * 获取当前策略的风格分析
     * */
    public RestResp getStrategyFactors(Long strategyId,Long startTime,Long endTime){
        List<FactorsInfo> factorsInfoList = null;
        try {
            Iterator<Factors> iterator = factorsDao.findAll().iterator();
            List<Factors> list = IteratorUtils.toList(iterator);
            List<Benchmark> benchmarkList = benchmarkDao.findByStrategyIdAndTimeBetween(strategyId, startTime, endTime);
            List<Portfolio> portfolioList = protfolioDao.findByStrategyIdAndTimeBetween(strategyId, startTime, endTime);
            factorsInfoList = new ArrayList<>(benchmarkList.size());
            FactorsInfo factorsInfo = null;
            for (int i = 0; i <benchmarkList.size();i++){
                factorsInfo = new FactorsInfo();
                factorsInfo.setFactors(list);
                factorsInfo.setBenchmark(benchmarkList.get(i).getValue().split(","));
                factorsInfo.setPortfolio(portfolioList.get(i).getValue().split(","));
                factorsInfo.setTime(DateUtil.stampToDate(portfolioList.get(i).getTime(),"yyyy-MM-dd"));
                factorsInfoList.add(factorsInfo);
            }
        } catch (Exception e) {
            LOG.error("get strategy factors faild : {}",e.getMessage(),e);
        }
        return RestRespPage.success(factorsInfoList);
    }
    public String run(){
        List<String> t = new ArrayList<>();
        t.add("很好啊");t.add("不错啊");t.add("还可以");t.add("太坑了");t.add("这什么鬼东西");t.add("我去");t.add("能六个微信么");
        t.add("好厉害");t.add("怎么不回复啊");t.add("楼上的呢");t.add("??");t.add(".....");t.add("这能挣多少钱啊");t.add("膜拜");
        t.add("牛逼");t.add("闷声发大财");t.add("小气");t.add("看他的秘诀");t.add("555");t.add("666");t.add("我的天");
        Random random = new Random();
        Iterator<Strategy> iterator = strategyDao.findAll().iterator();
        List<Strategy> strategyList = IteratorUtils.toList(iterator);
        Iterator<User> iterator1 = userRepo.findAll().iterator();
        List<User> userList = IteratorUtils.toList(iterator1);
        for (Strategy strategy: strategyList) {
             int k = random.nextInt(30);
            for (int i = 0;i<k;i++){
                StrategyComment strategyComment = new StrategyComment();
                strategyComment.setStrategyId(strategy.getId());
                strategyComment.setUserId(userList.get(random.nextInt(40)).getId());
                strategyComment.setContent(t.get(random.nextInt(21)));
                strategyComment.setTime(System.currentTimeMillis());
                commentDao.save(strategyComment);
            }
        }
        return "s";
    }
}
