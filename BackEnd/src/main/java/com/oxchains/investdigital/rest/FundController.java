package com.oxchains.investdigital.rest;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.entity.FundIssuance;
import com.oxchains.investdigital.service.FundService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.text.ParseException;

/**
 * @author ccl
 * @time 2017-12-13 15:10
 * @name FundController
 * @desc:
 */
@RestController
@RequestMapping(value = "/fund")
public class FundController {

    @Resource
    private FundService fundService;
    @PostMapping(value = "/issue")
    public RestResp fundIssuance(FundIssuance issuance){
        return fundService.add(issuance);
    }

    @GetMapping(value = "/starFunds")
    public RestResp starFunds(){
        return fundService.getStarFunds();
    }

    @GetMapping(value = "/allFunds")
    public RestResp allFunds(String change,String status, String character, String type, String strategy){
        return fundService.getFunds();
    }
    @GetMapping(value = "/myFunds")
    public RestResp myFunds(Long userId){
        return fundService.getMyFunds(userId);
    }

    @GetMapping(value = "/change")
    public RestResp getChange(Long fundId,int day){
        return RestResp.success(fundService.getFundReturnDetail(fundId,day));
    }

    @GetMapping(value = "/data")
    public RestResp data() throws ParseException {
        String url = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=zzf,20&gs=0&sc=zzf&st=desc&sd=2016-12-13&ed=2017-12-13&qdii=&tabSubtype=,,,,,&pi=1&pn=50&dx=1&v=0.9199814353030342";
        return fundService.getData(url);
    }

    @GetMapping(value = "/detail")
    public RestResp detail() throws ParseException {
        String url = "http://fund.eastmoney.com/data/FundPicData.aspx?bzdm=004315&n=0&dt=year&vname=ljsylSVG_PicData&r=0.1861039093066288";
        return fundService.getDataDetail(url);
    }
}
