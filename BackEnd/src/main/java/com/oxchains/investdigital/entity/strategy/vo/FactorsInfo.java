package com.oxchains.investdigital.entity.strategy.vo;

import com.oxchains.investdigital.entity.strategy.Benchmark;
import com.oxchains.investdigital.entity.strategy.Brinson;
import com.oxchains.investdigital.entity.strategy.Factors;
import lombok.Data;

import java.util.List;

/**
 * Created by xuqi on 2017/12/15.
 */
@Data
public class FactorsInfo {
    private String time;
    private List<String> factors;
    private String benchmark[];
    private String portfolio[];
    private Brinson brinson;
}
