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
@Entity(name = "subscribe")
public class Subscribe {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long strategyId;
    private Long userId;
}
