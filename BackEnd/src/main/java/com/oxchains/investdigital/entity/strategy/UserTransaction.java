package com.oxchains.investdigital.entity.strategy;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
@Entity(name = "user_transaction")
public class UserTransaction {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer txType;
    private double txPrice;
    private Long txNum;
    private Long time;
    private Long userId;
    private Long fundId;

    @Transient
    private String fundName;
    @Transient
    private String fundSymbol;
    @Transient
    private String txTypeValue;
    @Transient
    private String date;
}
