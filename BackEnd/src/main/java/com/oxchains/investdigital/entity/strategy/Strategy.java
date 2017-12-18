package com.oxchains.investdigital.entity.strategy;
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
    //主键id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    //策略名称
    private String title;
    //策略类型
    private Integer strategyType;
    //开始时间也就是策略的发布时间
    private long beginTime;
    //最后修改时间
    private long lastUpdateTime;
    //最大回撤
    private double maxDrawdown;
    //排名
    private Integer rank;
    //用户id
    private Long userId;

    private Integer strategyRunId;

    private double score;

    private Long initMoney;

    private String description;




}
