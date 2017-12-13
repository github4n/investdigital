package com.oxchains.investdigital.entity;

import javax.persistence.*;

/**
 * @author ccl
 * @time 2017-12-13 10:25
 * @name FundIssuance
 * @desc:
 */
@Entity
@Table(name = "fund_issuance")
public class FundIssuance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;

    private String investDigitalNo;

    private String mobilephone;

    private Integer assetManageScale;
    private Integer privateIssuanceTime;
    private Integer fundQualification;
    private Integer privateIssuanceStage;
    private Integer fundAssociationRecord;
    private Integer productDistribution;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getInvestDigitalNo() {
        return investDigitalNo;
    }

    public void setInvestDigitalNo(String investDigitalNo) {
        this.investDigitalNo = investDigitalNo;
    }

    public String getMobilephone() {
        return mobilephone;
    }

    public void setMobilephone(String mobilephone) {
        this.mobilephone = mobilephone;
    }

    public Integer getAssetManageScale() {
        return assetManageScale;
    }

    public void setAssetManageScale(Integer assetManageScale) {
        this.assetManageScale = assetManageScale;
    }

    public Integer getPrivateIssuanceTime() {
        return privateIssuanceTime;
    }

    public void setPrivateIssuanceTime(Integer privateIssuanceTime) {
        this.privateIssuanceTime = privateIssuanceTime;
    }

    public Integer getFundQualification() {
        return fundQualification;
    }

    public void setFundQualification(Integer fundQualification) {
        this.fundQualification = fundQualification;
    }

    public Integer getPrivateIssuanceStage() {
        return privateIssuanceStage;
    }

    public void setPrivateIssuanceStage(Integer privateIssuanceStage) {
        this.privateIssuanceStage = privateIssuanceStage;
    }

    public Integer getFundAssociationRecord() {
        return fundAssociationRecord;
    }

    public void setFundAssociationRecord(Integer fundAssociationRecord) {
        this.fundAssociationRecord = fundAssociationRecord;
    }

    public Integer getProductDistribution() {
        return productDistribution;
    }

    public void setProductDistribution(Integer productDistribution) {
        this.productDistribution = productDistribution;
    }
}
