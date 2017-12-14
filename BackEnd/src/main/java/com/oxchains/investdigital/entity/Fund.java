package com.oxchains.investdigital.entity;

import javax.persistence.*;

/**
 * @author ccl
 * @time 2017-12-13 17:06
 * @name Fund
 * @desc:
 */
@Entity
@Table(name = "fund")
public class Fund {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String fundCode;
    private String fundSymbol;
    private String fundName;
    private Long issueUser;
    @Transient
    private String issueUserName;
    private Long startTime;
    @Transient
    private String startTimeStr;

    private Float price;
    private Float volume;
    private Float fee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFundCode() {
        return fundCode;
    }

    public void setFundCode(String fundCode) {
        this.fundCode = fundCode;
    }

    public String getFundSymbol() {
        return fundSymbol;
    }

    public void setFundSymbol(String fundSymbol) {
        this.fundSymbol = fundSymbol;
    }

    public String getFundName() {
        return fundName;
    }

    public void setFundName(String fundName) {
        this.fundName = fundName;
    }

    public Long getIssueUser() {
        return issueUser;
    }

    public void setIssueUser(Long issueUser) {
        this.issueUser = issueUser;
    }

    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getVolume() {
        return volume;
    }

    public void setVolume(Float volume) {
        this.volume = volume;
    }

    public Float getFee() {
        return fee;
    }

    public void setFee(Float fee) {
        this.fee = fee;
    }

    @Override
    public String toString() {
        return "Fund{" +
                "id=" + id +
                ", fundCode='" + fundCode + '\'' +
                ", fundSymbol='" + fundSymbol + '\'' +
                ", fundName='" + fundName + '\'' +
                ", issueUser='" + issueUser + '\'' +
                ", startTime=" + startTime +
                ", price=" + price +
                ", volume=" + volume +
                ", fee=" + fee +
                '}';
    }

    public String getStartTimeStr() {
        return startTimeStr;
    }

    public void setStartTimeStr(String startTimeStr) {
        this.startTimeStr = startTimeStr;
    }

    public String getIssueUserName() {
        return issueUserName;
    }

    public void setIssueUserName(String issueUserName) {
        this.issueUserName = issueUserName;
    }
}
