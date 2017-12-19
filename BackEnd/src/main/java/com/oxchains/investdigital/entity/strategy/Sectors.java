package com.oxchains.investdigital.entity.strategy;

import lombok.Data;

import javax.persistence.*;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
@Entity(name = "sectors")
public class Sectors {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    @Transient
    private double value;
}
