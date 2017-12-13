package com.oxchains.investdigital.rest;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.entity.Pojo;
import com.oxchains.investdigital.service.StrategyService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * Created by xuqi on 2017/12/13.
 */
@RestController("/strategy")
public class StrategyController {
    @Resource
    private StrategyService strategyService;

    @PostMapping("/getUserStrategy")
    public RestResp getUserStrategy(@RequestBody  Pojo pojo){
        RestResp userStrategy = strategyService.getUserStrategy(pojo);
        return userStrategy;
    }
    @GetMapping("/getGreatStrategy")
    private RestResp getGreatStrategy(){
        RestResp restResp = strategyService.getGreatStrategy();
        return restResp;
    }
}
