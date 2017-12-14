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
@Entity(name = "contract")
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String contractName;
    private double freightSpace;
    private double avgFreightPrice;

}
