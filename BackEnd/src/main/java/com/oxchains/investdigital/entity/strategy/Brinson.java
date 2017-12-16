package com.oxchains.investdigital.entity.strategy;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
@Entity(name = "brinson")
public class Brinson {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long strategyId;
    private double activeReturn;
    private double assetAllocation;
    private double stockConfig;
}
