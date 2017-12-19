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
    private CsiDao csiDao;
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
    /**
     * 我的策略
     * */
    public RestRespPage getUserStrategy(Pojo pojo){
        Page<Strategy> page = null;
        List<StrategyInfo> strategyInfoList = null;
        try {
            page = strategyDao.findByUserId(pojo.getUserId(),this.getPageable(pojo));
            strategyInfoList = this.getStrategyInfoAndEaringInfo(page.getContent(),pojo);
        } catch (Exception e) {
            LOG.error("get user strategy faild",e);
            return RestRespPage.fail();
        }
        return RestRespPage.success(strategyInfoList,page.getTotalElements());
    }
    private Pageable getPageable(Pojo pojo){
        if(pojo != null){
            Pageable pageable = new PageRequest(pojo.getPageNum()-1,pojo.getPageSize(),new Sort(Sort.Direction.DESC,pojo.getDesc()));
            return pageable;
        }
        return null;
    };
    private List<StrategyInfo> getStrategyInfoAndEaringInfo(List<Strategy> strategyList,Pojo pojo){
        List<StrategyInfo>  infoList = null;
        try {
            if(strategyList != null){
                infoList = new ArrayList<>(strategyList.size());
                StrategyInfo strategyInfo = null;
                for (Strategy strategy:strategyList) {
                    strategyInfo = new StrategyInfo();
                    strategyInfo.setStrategy(strategy);
                    //添加标签
                    List<StrategyTagsCenter> centerList = centerDao.findByStrategyId(strategy.getId());
                    List<StrategyTags> tagsList = new ArrayList<>(centerList.size());
                    for (StrategyTagsCenter tagsCenter: centerList) {
                        tagsList.add(tagsDao.findOne(tagsCenter.getTagId()));
                    }
                    strategyInfo.setTags(tagsList);
                    //添加用户信息
                    User user = userRepo.findOne(strategy.getUserId());
                    strategyInfo.setUser(user);
                    //添加订阅信息
                    Subscribe subscribe = subscribeDao.findByStrategyId(strategy.getId());
                    strategyInfo.setSubscribe(subscribe);
                    //获取收益信息
                    Earning earning = earningDao.findByStrategyId(strategy.getId());
                    strategyInfo.setEarning(earning);

                    if(pojo != null){
                        strategyInfo.setRank((strategyList.indexOf(strategy)+1)+(pojo.getPageNum()-1)*8);
                        EarningData earningData = new EarningData();
                        //获取收益详情涨跌幅数据
                        pojo.setStrategyId(strategy.getId());
                        List<EarningInfo> earningInfoList = this.getRunChartAll(pojo);
                        //获取沪深300指数
                        List<Csi> csiList = csiDao.findByTimeBetween(pojo.getBeginTime(), pojo.getEndTime());
                        earningData.setEarningInfo(earningInfoList,csiList);
                        strategyInfo.setEarningData(earningData);
                        infoList.add(strategyInfo);
                    }
                    else{
                         strategyInfo.setRank(earningDao.countByTotalReturnGreaterThan(earning.getTotalReturn()));
                    }
                }
            }
        } catch (Exception e) {
            LOG.error("get strategyInfo and earningInfo faild:{}",e.getMessage(),e);
            return null;
        }
        return infoList;
    }

    /**
     * 获取精英策略
     * */
    public RestResp getGreatStrategy(Pojo pojo){
        Page<Earning> page = null;
        List<StrategyInfo> infoList = null;
        try {
            page = earningDao.findAll(this.getPageable(pojo));
            List<Earning> earningList = page.getContent();
            List<Long> ids = new ArrayList<>(earningList.size());
            earningList.stream().forEach(earning -> {ids.add(earning.getStrategyId());});
            List<Strategy> strategyList = strategyDao.findByIdIsIn(ids.toArray(new Long[ids.size()]));
            infoList = this.getStrategyInfoAndEaringInfo(strategyList,pojo);
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
        try {
            final List<Long> ids = new ArrayList<>();
            Pageable pageable = this.getPageable(pojo);
            if(pojo.getDesc().equals("alreadySubscribed")){
                List<Subscribe> subscribeList = subscribeDao.findAll(pageable).getContent();
                subscribeList.stream().forEach(subscribe -> {ids.add(subscribe.getStrategyId());});
                Long[] array = ids.toArray(new Long[ids.size()]);
                strategyList = strategyDao.findByIdIn(array);
                strategyList1= this.sortStrategy(strategyList, ids);
            }
            if(pojo.getDesc().equals("score")){
                strategyList1 = strategyDao.findAll(pageable).getContent();
            }
            if(pojo.getDesc().equals("totalReturn")|| pojo.getDesc().equals("annualizedReturn" )){
                List<Earning> earningList = earningDao.findAll(pageable).getContent();
                earningList.stream().forEach(earning -> {ids.add(earning.getStrategyId());});
                strategyList = strategyDao.findByIdIsIn(ids.toArray(new Long[ids.size()]));
                strategyList1= this.sortStrategy(strategyList, ids);
            }
            infoList = this.getStrategyInfoAndEaringInfo(strategyList1,pojo);
        } catch (Exception e) {
            LOG.error("get great strategy faild :{}",e.getMessage(),e);
            return RestRespPage.fail(e.getMessage());
        }
        return RestRespPage.success(infoList,strategyDao.count());
    }
    /**
     * 获取全部策略
     * */
    public RestResp getStrategyTrunk(Pojo pojo){
        try {
            List<Earning> earningList = earningDao.findAll(this.getPageable(pojo)).getContent();
            List<Long> ids = new ArrayList<>(earningList.size());
            earningList.stream().forEach(earning -> {ids.add(earning.getStrategyId());});
            List<Strategy> strategyList = strategyDao.findByIdIsIn(ids.toArray(new Long[ids.size()]));
            List<Strategy> strategyList1= this.sortStrategy(strategyList, ids);
            List<StrategyInfo> infoList = new ArrayList<>(strategyList1.size());
            strategyList1.stream().forEach(strategy -> {
                StrategyInfo strategyInfo = new StrategyInfo();
                User user = userRepo.findOne(strategy.getUserId());
                strategyInfo.setUser(user);
                Earning earning = earningDao.findByStrategyId(strategy.getId());
                strategyInfo.setEarning(earning);
                infoList.add(strategyInfo);
            });
            return RestRespPage.success(infoList,strategyDao.count());
        } catch (Exception e) {
            LOG.error("get great strategy faild :{}",e.getMessage(),e);
            return RestRespPage.fail(e.getMessage());
        }
    }
    //给策略排序
    private List<Strategy> sortStrategy(List<Strategy> strategyList, List<Long> ids)throws Exception{
        if(strategyList != null && ids!= null){
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
        return null;
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
        PlateInfo plateInfo = new PlateInfo();
        try {
            Plate plate = plateDao.findByStrategyId(strategyId);
            Iterator<Sectors> iterator = sectorsDao.findAll().iterator();
            List<Sectors> sectorsList = IteratorUtils.toList(iterator);
            String[] strings = plate.getValue().split(",");
            for (int i = 0;i<strings.length;i++){
                sectorsList.get(i).setValue( Double.parseDouble(strings[i]));
            }
            plateInfo.setSectorsList(sectorsList);
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
    public RestResp catStrategyInfo(Long strategyId) {
        StrategyInfo strategyInfo = null;
        try {
            Strategy strategy = strategyDao.findOne(strategyId);
            List<Strategy> strategyList = new ArrayList<>(1);
            strategyList.add(strategy);
            strategyInfo = this.getStrategyInfoAndEaringInfo(strategyList, null).get(0);
        } catch (Exception e) {
            LOG.error("cat strategy info faild :{}",e.getMessage(),e);
            return RestResp.fail(e.getMessage());
        }
        return RestResp.success(strategyInfo);
    }

    /*
    *获取动态数据
    * */
    public RestResp getRunChart(Pojo pojo) {
        StrategyInfo strategyInfo = null;
        try {
            List<EarningInfo> earningInfos = earningInfoDao.findAllByStrategyIdAndTimeStampBetween(pojo.getStrategyId(), pojo.getBeginTime(), pojo.getEndTime());
            EarningData earningData = new EarningData();
            List<Csi> csiList = csiDao.findByTimeBetween(pojo.getBeginTime(), pojo.getEndTime());
            earningData.setEarningInfo(earningInfos,csiList);
            strategyInfo = new StrategyInfo();
            strategyInfo.setEarningData(earningData);
        } catch (Exception e) {
            LOG.error("get run chart faild :{}",e.getMessage(),e);
            return  RestResp.fail();
        }
        return RestResp.success(strategyInfo);
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
        List<UserPosition> userPositions = null;
        try {
            Strategy strategy = strategyDao.findOne(pojo.getStrategyId());
            userPositions = userPositionDao.findByUserId(strategy.getUserId());
            userPositions.stream().forEach(userPosition -> {
                Fund fund = fundRepo.findOne(userPosition.getFundId());
                userPosition.setFundName(fund.getFundName());
                userPosition.setFundSymbol(fund.getFundSymbol());
            });
        } catch (Exception e) {
            LOG.error("get user position error : {}",e.getMessage(),e);
            return RestResp.fail();
        }
        return RestResp.success(userPositions);
    }
    /**
     * 获取用户的交易情况
     * */
    public RestResp getUserTransaction(Pojo pojo){
        try {
            Strategy strategy = strategyDao.findOne(pojo.getStrategyId());
            List<UserTransaction> transactionList = transactionDao.findByUserId(strategy.getUserId());
            List<TxInfo> infoList = new ArrayList<>(transactionList.size());
            transactionList.stream().forEach(userTransaction -> {
                Fund fund = fundRepo.findOne(userTransaction.getFundId());
                userTransaction.setFundName(fund.getFundName());
                userTransaction.setFundSymbol(fund.getFundSymbol());
                TxInfo txInfo = new TxInfo();
                userTransaction.setTxTypeValue(userTransaction.getTxType() == 1?"买入":"卖出");
                txInfo.setTime(userTransaction.getTime());

                List<UserTransaction> userTransactions = new ArrayList<>();
                userTransactions.add(userTransaction);
                txInfo.setChildren(userTransactions);
                txInfo.setId(userTransaction.getId());
                infoList.add(txInfo);
            });
            return RestResp.success(infoList);
        } catch (Exception e) {
            LOG.error("get user transaction faild : {}",e.getMessage(),e);
        }
        return RestResp.fail();
    }
    /**
     * 获取策略的评论
     * */
    public RestResp getStrategyComment(Long strategyId,Integer pageSize,Integer pageNum){
        try {
            Pageable pageable = new PageRequest(pageNum-1,pageSize,new Sort(Sort.Direction.DESC,"time"));
            Page<StrategyComment> page = commentDao.findByStrategyId(strategyId, pageable);
            List<StrategyComment> commentList = page.getContent();
            List<StrategyCommentInfo> infoList = new ArrayList<>(commentList.size());
            commentList.stream().forEach(strategyComment -> {
                StrategyCommentInfo commentInfo = new StrategyCommentInfo();
                commentInfo.setStrategyComment(strategyComment);
                commentInfo.setUser(userRepo.findOne(strategyComment.getUserId()));
                infoList.add(commentInfo);
            });
            return RestRespPage.success(infoList,page.getTotalElements());
        } catch (Exception e) {
            LOG.error("get strategy comment faild :{}",e.getMessage(),e);
            return RestResp.fail();
        }
    }
    /**
     * 获取当前策略的风格分析
     * */
    public RestResp getStrategyFactors(Long strategyId,Long startTime,Long endTime){
        List<FactorsInfo> factorsInfoList = null;
        try {
            Iterator<Factors> iterator = factorsDao.findAll().iterator();
            List<Factors> factorsList = IteratorUtils.toList(iterator);
            List<Benchmark> benchmarkList = benchmarkDao.findByStrategyIdAndTimeBetween(strategyId, startTime, endTime);
            List<Portfolio> portfolioList = protfolioDao.findByStrategyIdAndTimeBetween(strategyId, startTime, endTime);
            factorsInfoList = new ArrayList<>(benchmarkList.size());
            FactorsInfo factorsInfo = null;
            List<String> stringList = new ArrayList<>(factorsList.size());
            factorsList.stream().forEach(factors -> {stringList.add(factors.getName());});
            for (int i = 0; i <benchmarkList.size();i++){
                factorsInfo = new FactorsInfo();
                factorsInfo.setFactors(stringList);
                factorsInfo.setBenchmark(benchmarkList.get(i).getValue().split(","));
                factorsInfo.setPortfolio(portfolioList.get(i).getValue().split(","));
                factorsInfo.setTime(DateUtil.stampToDate(portfolioList.get(i).getTime(),"yyyy-MM-dd"));
                factorsInfoList.add(factorsInfo);
            }
        } catch (Exception e) {
            LOG.error("get strategy factors faild : {}",e.getMessage(),e);
            return RestResp.fail();
        }
        return RestRespPage.success(factorsInfoList);
    }
}
