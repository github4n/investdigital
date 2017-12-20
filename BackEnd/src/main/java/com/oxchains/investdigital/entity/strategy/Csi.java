package com.oxchains.investdigital.entity.strategy;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Created by xuqi on 2017/12/19.
 */
@Data
@Entity(name = "Csi")
public class Csi {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Double earning;
    private Long time;

}
