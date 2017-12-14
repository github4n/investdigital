package com.oxchains.investdigital.entity;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by xuqi on 2017/12/13.
 */
@Data
@Entity(name = "strategy")
public class Strategy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    //主键id
    private Long id;
    //策略名称
    private String title;
    //策略类型
    private Integer strategyType;
    /*//累计收益
    private double totalEarning;
    //年收益
    private double annualizedEarning;
    //月收益
    private double monthEarning;
    //日收益
    private double dailyEarning;
    //周收益
    private double weeklyEarning;*/
    //开始时间也就是策略的发布时间
    private String beginTime;
    //最后修改时间
    private String lastUpdateTime;
    //最大回撤
    private double maxDrawdown;
    //排名
    private Integer rank;
    //用户id
    private Long userId;

    private String strategyRunId;




}
