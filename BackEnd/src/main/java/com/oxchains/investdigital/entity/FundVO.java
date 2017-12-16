package com.oxchains.investdigital.entity;

import com.oxchains.investdigital.common.DateUtil;

import java.util.List;

/**
 * @author oxchains
 * @time 2017-12-14 14:25
 * @name FundVO
 * @desc:
 */
public class FundVO extends Fund{
    private FundInfo info;
    private FundReturn returns;
    private List<String> tags;
    private List<FundReturnDetail> details;


    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public FundReturn getReturns() {
        return returns;
    }

    public void setReturns(FundReturn returns) {
        this.returns = returns;
    }

    public FundInfo getInfo() {
        return info;
    }

    public void setInfo(FundInfo info) {
        this.info = info;
    }

    public List<FundReturnDetail> getDetails() {
        return details;
    }

    public void setDetails(List<FundReturnDetail> details) {
        this.details = details;
    }

    public FundVO(){}
    public FundVO(Fund fund) {
        setId(fund.getId());
        setFundCode(fund.getFundCode());
        setFundName(fund.getFundName());
        setFundSymbol(fund.getFundSymbol());
        setIssueUser(fund.getIssueUser());
        setStartTime(fund.getStartTime());
        setStartTimeStr(DateUtil.longToString(fund.getStartTime(),"yyyy-MM-dd"));
        setFee(fund.getFee());
    }
}
