package com.oxchains.investdigital.entity.strategy.vo;

import com.oxchains.investdigital.entity.strategy.UserTransaction;
import lombok.Data;

import java.util.List;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
public class TxInfo{
    private Long id;
    private Long time;
    private List<UserTransaction> children;
}
