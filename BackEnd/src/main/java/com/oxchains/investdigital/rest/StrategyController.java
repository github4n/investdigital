package com.oxchains.investdigital.rest;
import com.oxchains.investdigital.common.DateUtil;
import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.entity.strategy.vo.Pojo;
import com.oxchains.investdigital.service.StrategyService;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.xml.crypto.Data;
import java.text.ParseException;
/**
 * Created by xuqi on 2017/12/13.
 */
@RestController
@EnableTransactionManagement
@RequestMapping(value = "/strategy")
public class StrategyController {
    @Resource
    private StrategyService strategyService;
   //我的策略
    @RequestMapping("/getUserStrategy/{pageSize}/{pageNum}/{desc}/{userId}")
    public RestResp getUserStrategy(@PathVariable("pageSize") Integer pageSize,@PathVariable("pageNum")Integer pageNum,@PathVariable("desc")String desc,@PathVariable("userId")Long userId){
        Pojo pojo = new Pojo();
        pojo.setPageSize(pageSize);
        pojo.setPageNum(pageNum);
        pojo.setDesc(desc);
        pojo.setUserId(userId);
        this.checkPojo(pojo);
        RestResp userStrategy = strategyService.getUserStrategy(pojo);
        return userStrategy;
    }
    //获取精英策略
    @RequestMapping("/getGreatStrategy/{pageSize}/{pageNum}")
    public  RestResp getGreatStrategy(@PathVariable("pageSize") Integer pageSize,@PathVariable("pageNum")Integer pageNum){
        Pojo pojo = new Pojo();
        pojo.setPageSize(pageSize);
        pojo.setPageNum(pageNum);
        pojo.setDesc("totalReturn");
        this.checkPojo(pojo);
        RestResp restResp = strategyService.getGreatStrategy(pojo);
        return restResp;
    }
    //获取所有策略
    @RequestMapping("/getAllStrategy/{pageSize}/{pageNum}/{desc}")
    public  RestResp getAllStrategy(@PathVariable("pageSize") Integer pageSize,@PathVariable("pageNum")Integer pageNum,@PathVariable("desc")String desc){
        Pojo pojo = new Pojo();
        pojo.setPageSize(pageSize);
        pojo.setPageNum(pageNum);
        pojo.setDesc(desc);
        this.checkPojo(pojo);
        RestResp restResp = strategyService.getAllStrategy(pojo);
        return restResp;

    }
    //获取所有策略
    @RequestMapping("/getStrategyTrunk/{desc}")
    public  RestResp getStrategyTrunk(@PathVariable("desc")String desc){
        Pojo pojo = new Pojo();
        pojo.setPageSize(20);
        pojo.setPageNum(1);
        pojo.setDesc(desc);
        this.checkPojo(pojo);
        RestResp restResp = strategyService.getStrategyTrunk(pojo);
        return restResp;

    }
    //根据策略id获取策略详情
    @RequestMapping("/catStrategyInfo/{strategyId}")
    public RestResp catStrategyInfo(@PathVariable("strategyId")Long strategyId){
        return strategyService.catStrategyInfo(strategyId);
    }
    //获取策略的收益详情 涨跌幅
    @RequestMapping("/getRunChart/{strategyId}/{beginTime}/{endTime}")
    public RestResp getRunChart(@PathVariable("strategyId") Long strategyId,@PathVariable("beginTime") Long beginTime,@PathVariable("endTime") Long endTime){
        Pojo pojo = new Pojo();
        pojo.setStrategyId(strategyId);
        pojo.setBeginTime(beginTime);
        pojo.setEndTime(endTime);
        if(beginTime == 0){
            pojo.setBeginTime(1492963200000L);
        }
        if(beginTime == 0){
            pojo.setEndTime(1513180800000L);
        }

        this.checkPojo(pojo);
        return strategyService.getRunChart(pojo);
    }

    //获取用户持仓
    @RequestMapping("/getUserPosition/{strategyId}")
    public RestResp getUserPosition(@PathVariable("strategyId")Long strategyId){
        Pojo pojo = new Pojo();
        pojo.setStrategyId(strategyId);
        this.checkPojo(pojo);
        return strategyService.getUserPosition(pojo);
    }
    //获取用户评论
    @RequestMapping("/getStrategyComment/{strategyId}/{pageSize}/{pageNum}")
    public RestResp getStrategyComment(@PathVariable("strategyId") Long strategyId,@PathVariable("pageSize") Integer pageSize,@PathVariable("pageNum")Integer pageNum){
        Pojo pojo = new Pojo();
        pojo.setStrategyId(strategyId);
        pojo.setPageNum(pageNum);
        pojo.setPageSize(pageSize);
        this.checkPojo(pojo);
        return strategyService.getStrategyComment(strategyId,pageSize,pageNum);
    }
    //获取用户最近交易
    @RequestMapping("/getUserTransaction/{strategyId}")
    public RestResp getStrategyTransaction(@PathVariable("strategyId")Long  strategyId){
        Pojo pojo = new Pojo();
        pojo.setStrategyId(strategyId);
        this.checkPojo(pojo);
        return strategyService.getUserTransaction(pojo);
    }
    @RequestMapping("/getStrategyFactors/{strategyId}/{startTime}/{endTime}")
    public RestResp getStrategyFactors(@PathVariable("strategyId") Long strategyId,@PathVariable("startTime") Long startTime,@PathVariable("endTime")Long endTime){
        if(endTime == 0){
            endTime = 1493568000000L;
        }
        if(startTime == 0){
            startTime = 1488297600000L;
        }
        return strategyService.getStrategyFactors(strategyId,startTime,endTime);
    }
    //获取策略brinsion分析
    @RequestMapping("/getStrategyBrinsion/{strategyId}")
    public RestResp getStrategyBrinsion(@PathVariable("strategyId") Long strategyId){
        return strategyService.getStrategyBrinsion(strategyId);
    }
    //获取策略板块分析
    @RequestMapping("/getStrategyPlate/{strategyId}")
    public RestResp getStrategyPlate(@PathVariable("strategyId") Long strategyId){
        return strategyService.getStrategyPlate(strategyId);
    }
    private void checkPojo(Pojo pojo){
       if(pojo.getPageNum() == null || pojo.getPageNum() == 0){
           pojo.setPageNum(1);
       }
       if(pojo.getPageSize() == null || pojo.getPageSize() == 0){
           pojo.setPageSize(8);
       }
       if(pojo.getDesc() == null || pojo.getDesc().equals("0")){
           pojo.setDesc("id");
       }
       if(pojo.getBeginTime() == 0){
           pojo.setBeginTime(1506787200000L);
       }
        if(pojo.getEndTime() == 0){
            pojo.setEndTime(1512057600000L);
        }
    }
}
