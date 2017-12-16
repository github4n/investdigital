package com.oxchains.investdigital.entity.strategy.vo;

import com.oxchains.investdigital.entity.Fund;
import com.oxchains.investdigital.entity.strategy.UserTransaction;
import lombok.Data;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
public class TxInfo extends UserTransaction {
    private String fundName;
    private String fundSymbol;
    public void setUserTransaction(UserTransaction userTransaction){
        this.setId(userTransaction.getId());
        this.setTime(userTransaction.getTime());
        this.setTxNum(userTransaction.getTxNum());
        this.setTxPrice(userTransaction.getTxPrice());
        this.setTxType(userTransaction.getTxType());
        this.setUserId(userTransaction.getUserId());
        this.setFundId(userTransaction.getFundId());
    }
    public void setFund(Fund fund){
        this.fundName = fund.getFundName();
        this.fundSymbol = fund.getFundSymbol();
    }
}
