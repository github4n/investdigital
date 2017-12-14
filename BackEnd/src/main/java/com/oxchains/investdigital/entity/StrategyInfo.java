package com.oxchains.investdigital.entity;
import lombok.Data;

import java.util.List;

/**
 * Created by xuqi on 2017/12/13.
 */
@Data
public class StrategyInfo {
    private Long id;
    private Integer strategyRunID;
    private String strategyType;
    private double score;
    private double annualizedReturn;
    private double totalReturn;
    private Long shareTimestamp;
    private double monthlyReturn;
    private double dailyReturn;
    private double maxDrawdown;
    private Long userId;
    private Long beginTime;
    private double weeklyReturn;
    private Integer rank;
    private Integer totalSubscribed;
    private Integer alreadySubscribed;
    private String title;
    private boolean isCanSubscribed;
    private boolean isCanBackTest;
    private boolean isSubscribed;
    private String loginname;
    private String imageUrl;
    private Long lastUpdateTime;
    private List<StrategyTags> tags;
    public void setStrategy(Strategy strategy){
        this.id = strategy.getId();
        this.beginTime = strategy.getBeginTime();
        this.lastUpdateTime = strategy.getLastUpdateTime();
        this.maxDrawdown =strategy.getMaxDrawdown();
        this.rank =strategy.getRank();
        this.strategyRunID = strategy.getStrategyRunId();
        this.title = strategy.getTitle();
        this.strategyType = strategy.getStrategyType().toString();
    }
    public void setTags(List<StrategyTags> tags){
        this.tags = tags;
    }
    public void setUser(User user){
        this.userId = user.getId();
        this.loginname = user.getLoginname();
        this.imageUrl = user.getImage();
    }
    public void setEarning(Earning earning){
        this.weeklyReturn = earning.getWeeklyReturn();
        this.dailyReturn = earning.getDailyReturn();
        this.annualizedReturn = earning.getAnnualizedReturn();
        this.totalReturn = earning.getTotalReturn();
    }
    public void setSubscribe(Subscribe subscribe){
        this.totalSubscribed = subscribe.getTotalSubscribed();
        this.alreadySubscribed = subscribe.getAlreadySubscribed();
    }



}
