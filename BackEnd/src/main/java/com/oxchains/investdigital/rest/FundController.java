package com.oxchains.investdigital.rest;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.entity.FundIssuance;
import com.oxchains.investdigital.service.FundService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

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

    @PostMapping(value = "/data")
    public RestResp data(){
        String url = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=zzf,20&gs=0&sc=zzf&st=desc&sd=2016-12-13&ed=2017-12-13&qdii=&tabSubtype=,,,,,&pi=1&pn=50&dx=1&v=0.9199814353030342";
        return fundService.getData(url);
    }
}
