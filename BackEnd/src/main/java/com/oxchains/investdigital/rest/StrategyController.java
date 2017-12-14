package com.oxchains.investdigital.rest;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.entity.Pojo;
import com.oxchains.investdigital.service.StrategyService;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.text.ParseException;

/**
 * Created by xuqi on 2017/12/13.
 */
@RestController()
@EnableTransactionManagement
@RequestMapping(value = "/strategy")
public class StrategyController {
    @Resource
    private StrategyService strategyService;

    @PostMapping("/getUserStrategy")
    public RestResp getUserStrategy(@RequestBody  Pojo pojo){
        RestResp userStrategy = strategyService.getUserStrategy(pojo);
        return userStrategy;
    }
    @PostMapping("/getGreatStrategy")
    public  RestResp getGreatStrategy(@RequestBody Pojo pojo){
        RestResp restResp = strategyService.getGreatStrategy(pojo);
        return restResp;
    }
    @PostMapping("/getAllStrategy")
    public  RestResp getAllStrategy(@RequestBody Pojo pojo){
        RestResp restResp = strategyService.getAllStrategy(pojo);
        return restResp;

    }
    @GetMapping("/data")
    public String fulldata() throws ParseException {
        return "success";
    }
}
