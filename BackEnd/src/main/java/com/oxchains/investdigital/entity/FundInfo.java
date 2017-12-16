package com.oxchains.investdigital.entity;

import javax.persistence.*;

/**
 * @author oxchains
 * @time 2017-12-15 13:42
 * @name FundInfo
 * @desc:
 */
@Entity
@Table(name = "fund_info")
public class FundInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long fundId;
    private Float perFee;
    private Float volume;
    private Float price;
    private Float purchaseAmount;
    private Long deadline;
    private Integer closePeriod;
    private String openday;
    private String custody_user;
    private String brokerCompany;
    private String investAdviserCompany;
    private String investAdviserRegion;

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

    public Float getPerFee() {
        return perFee;
    }

    public void setPerFee(Float perFee) {
        this.perFee = perFee;
    }

    public Float getVolume() {
        return volume;
    }

    public void setVolume(Float volume) {
        this.volume = volume;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getPurchaseAmount() {
        return purchaseAmount;
    }

    public void setPurchaseAmount(Float purchaseAmount) {
        this.purchaseAmount = purchaseAmount;
    }

    public Long getDeadline() {
        return deadline;
    }

    public void setDeadline(Long deadline) {
        this.deadline = deadline;
    }

    public Integer getClosePeriod() {
        return closePeriod;
    }

    public void setClosePeriod(Integer closePeriod) {
        this.closePeriod = closePeriod;
    }

    public String getOpenday() {
        return openday;
    }

    public void setOpenday(String openday) {
        this.openday = openday;
    }

    public String getCustody_user() {
        return custody_user;
    }

    public void setCustody_user(String custody_user) {
        this.custody_user = custody_user;
    }

    public String getBrokerCompany() {
        return brokerCompany;
    }

    public void setBrokerCompany(String brokerCompany) {
        this.brokerCompany = brokerCompany;
    }

    public String getInvestAdviserCompany() {
        return investAdviserCompany;
    }

    public void setInvestAdviserCompany(String investAdviserCompany) {
        this.investAdviserCompany = investAdviserCompany;
    }

    public String getInvestAdviserRegion() {
        return investAdviserRegion;
    }

    public void setInvestAdviserRegion(String investAdviserRegion) {
        this.investAdviserRegion = investAdviserRegion;
    }
}
