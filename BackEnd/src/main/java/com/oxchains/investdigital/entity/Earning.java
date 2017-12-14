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
@Entity(name = "earning")
public class Earning {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long strategyId; //策略编号
    private String time;   //时间
    private double worth; //价值
}
