package com.oxchains.investdigital.entity.strategy;

import lombok.Data;
import org.springframework.data.annotation.Persistent;

import javax.persistence.*;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
@Entity(name = "user_position")
public class UserPosition {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long fundId;
    private double openAvgPrice;
    private Long num;
    private Long userId;
    private Double totalProfilLoss;
    @Transient
    private String fundName;
    @Transient
    private String fundSymbol;

}
