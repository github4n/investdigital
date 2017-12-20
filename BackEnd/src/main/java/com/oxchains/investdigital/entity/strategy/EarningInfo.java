package com.oxchains.investdigital.entity.strategy;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by xuqi on 2017/12/14.
 */
@Data
@Entity
public class EarningInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private double earning;
    private Long strategyId;
    private Long timeStamp;
}
