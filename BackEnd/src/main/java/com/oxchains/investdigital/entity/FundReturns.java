package com.oxchains.investdigital.entity;

import javax.persistence.*;

/**
 * @author oxchains
 * @time 2017-12-13 17:06
 * @name Fund
 * @desc:
 */
@Entity
@Table(name = "fund_returns")
public class FundReturns {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long fundId;
    private Float totalReturn;
    private Float netAssetValue;
    private Float netValue;
    private Float weekChange;
    private Float monthChange;
    private Float month3Change;
    private Float month6Change;
    private Float yearChange;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFundId() {
        return fundId;
    }

    public void setFundId(Long fundId) {
        this.fundId = fundId;
    }

    public Float getTotalReturn() {
        return totalReturn;
    }

    public void setTotalReturn(Float totalReturn) {
        this.totalReturn = totalReturn;
    }

    public Float getNetAssetValue() {
        return netAssetValue;
    }

    public void setNetAssetValue(Float netAssetValue) {
        this.netAssetValue = netAssetValue;
    }

    public Float getNetValue() {
        return netValue;
    }

    public void setNetValue(Float netValue) {
        this.netValue = netValue;
    }

    public Float getWeekChange() {
        return weekChange;
    }

    public void setWeekChange(Float weekChange) {
        this.weekChange = weekChange;
    }

    public Float getMonthChange() {
        return monthChange;
    }

    public void setMonthChange(Float monthChange) {
        this.monthChange = monthChange;
    }

    public Float getMonth3Change() {
        return month3Change;
    }

    public void setMonth3Change(Float month3Change) {
        this.month3Change = month3Change;
    }

    public Float getMonth6Change() {
        return month6Change;
    }

    public void setMonth6Change(Float month6Change) {
        this.month6Change = month6Change;
    }

    public Float getYearChange() {
        return yearChange;
    }

    public void setYearChange(Float yearChange) {
        this.yearChange = yearChange;
    }
}
