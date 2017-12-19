package com.oxchains.investdigital.entity.strategy.vo;
import com.oxchains.investdigital.common.StrategyParam;
import com.oxchains.investdigital.entity.User;
import com.oxchains.investdigital.entity.strategy.*;
import lombok.Data;

import java.util.List;

/**
 * Created by xuqi on 2017/12/13.
 */
@Data
public class StrategyInfo extends Strategy{
    private double annualizedReturn; //年收益
    private double totalReturn;     //累计收益
    private double monthlyReturn;  //月收益
    private double dailyReturn;   //日收益
    private double weeklyReturn; //周收益
    private Integer totalSubscribed; //总可以订阅数
    private Integer alreadySubscribed;//已经订阅数
    private String loginname; //用户名
    private String imageUrl; //头像
    private List<StrategyTags> tags; //标签
    private EarningData earningData;
    private String strategyTypeValue;
    public void setStrategy(Strategy strategy){
        this.setId(strategy.getId());          //策略编号
        this.setBeginTime(strategy.getBeginTime());//发布开始时间
        this.setLastUpdateTime(strategy.getLastUpdateTime());//最后一次修改时间
        this.setMaxDrawdown(strategy.getMaxDrawdown()*100);//最大回撤
        this.setStrategyRunId(strategy.getStrategyRunId());//涨跌图 图片id
        this.setTitle(strategy.getTitle()); //标题
        this.setStrategyType(strategy.getStrategyType());//类型
        this.strategyTypeValue = StrategyParam.StrategyType.getValue(strategy.getStrategyType());
        this.setUserId(strategy.getUserId()); //用户id
        this.setScore(strategy.getScore());
        this.setInitMoney(strategy.getInitMoney());
        this.setDescription(strategy.getDescription());
    }
    public void setTags(List<StrategyTags> tags){
        this.tags = tags;
    }
    public void setUser(User user){
        this.loginname = user.getLoginname();
        this.imageUrl = user.getImage();
    }
    public void setEarning(Earning earning){
        this.weeklyReturn = earning.getWeeklyReturn()*100;
        this.dailyReturn = earning.getDailyReturn()*100;
        this.annualizedReturn = earning.getAnnualizedReturn()*100;
        this.totalReturn = earning.getTotalReturn()*100;
        this.monthlyReturn =earning.getMonthlyReturn()*100;
    }
    public void setSubscribe(Subscribe subscribe){
        this.totalSubscribed = subscribe.getTotalSubscribed();
        this.alreadySubscribed = subscribe.getAlreadySubscribed();
    }
}
