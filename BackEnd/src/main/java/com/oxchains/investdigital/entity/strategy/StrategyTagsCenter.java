package com.oxchains.investdigital.entity.strategy;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by xuqi on 2017/12/14.
 */
@Data
@Entity(name = "StrategyTagsCenter")
public class StrategyTagsCenter {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long strategyId;
    private Integer tagId;
}
