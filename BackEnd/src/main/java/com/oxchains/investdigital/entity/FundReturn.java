package com.oxchains.investdigital.entity;

import javax.persistence.*;

/**
 * @author oxchains
 * @time 2017-12-13 17:06
 * @name Fund
 * @desc:
 */
@Entity
@Table(name = "fund_return")
public class FundReturn {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long fundId;
    private String fundCode;
    private Float totalReturn;
    private Float netAssetValue;
    private Float netValue;
    private Float todayChange;
    private Float weekChange;
    private Float monthChange;
    @Column(name = "month3_change")
    private Float month3Change;
    @Column(name = "month6_change")
    private Float month6Change;
    private Float yearChange;
    @Column(name = "year2_change")
    private Float year2Change;
    @Column(name = "year3_change")
    private Float year3Change;
    private Float thisYearChange;
    private Float untilNowChange;

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

    public Float getTodayChange() {
        return todayChange;
    }

    public void setTodayChange(Float todayChange) {
        this.todayChange = todayChange;
    }

    public Float getYear2Change() {
        return year2Change;
    }

    public void setYear2Change(Float year2Change) {
        this.year2Change = year2Change;
    }

    public Float getYear3Change() {
        return year3Change;
    }

    public void setYear3Change(Float year3Change) {
        this.year3Change = year3Change;
    }

    public Float getThisYearChange() {
        return thisYearChange;
    }

    public void setThisYearChange(Float thisYearChange) {
        this.thisYearChange = thisYearChange;
    }

    public Float getUntilNowChange() {
        return untilNowChange;
    }

    public void setUntilNowChange(Float untilNowChange) {
        this.untilNowChange = untilNowChange;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    @Override
    public String toString() {
        return "FundReturn{" +
                "id=" + id +
                ", fundId=" + fundId +
                ", fundCode='" + fundCode + '\'' +
                ", totalReturn=" + totalReturn +
                ", netAssetValue=" + netAssetValue +
                ", netValue=" + netValue +
                ", todayChange=" + todayChange +
                ", weekChange=" + weekChange +
                ", monthChange=" + monthChange +
                ", month3Change=" + month3Change +
                ", month6Change=" + month6Change +
                ", yearChange=" + yearChange +
                ", year2Change=" + year2Change +
                ", year3Change=" + year3Change +
                ", thisYearChange=" + thisYearChange +
                ", untilNowChange=" + untilNowChange +
                '}';
    }
}
