package com.oxchains.investdigital.rest;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.common.RestRespPage;
import com.oxchains.investdigital.entity.FundIssuance;
import com.oxchains.investdigital.entity.PurchaserInfo;
import com.oxchains.investdigital.service.FundService;
import org.springframework.web.bind.annotation.*;

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
    public RestResp fundIssuance(@RequestBody FundIssuance issuance){
        return fundService.add(issuance);
    }

    @GetMapping(value = "/starFunds")
    public RestResp starFunds(){
        return fundService.getStarFunds();
    }

    @GetMapping(value = "/allFunds")
    public RestResp allFunds(String change, String status, String character, String type, String strategy, Integer pageSize, Integer pageNum){
        return fundService.getFunds(pageSize,pageNum);
    }
    @GetMapping(value = "/myFunds")
    public RestResp myFunds(Long userId,Integer pageSize,Integer pageNum){
        return fundService.getMyFunds(userId,pageSize,pageNum);
    }

    @GetMapping(value = "/change")
    public RestResp getChange(Long fundId,Integer day){
        return RestResp.success(fundService.getFundReturnDetail(fundId,day));
    }

    @GetMapping(value = "/fundInfo")
    public RestResp fundInfo(Long fundId){
        return fundService.getFundInfo(fundId);
    }
    @GetMapping(value = "/comment")
    public RestResp fundComment(Long fundId,Integer pageSize,Integer pageNum){
        return fundService.fundComment(fundId,pageSize,pageNum);
    }
    @PostMapping(value = "/buyer")
    public RestResp purchaserInfo(@RequestBody PurchaserInfo purchaserInfo){
        return fundService.addPurchaser(purchaserInfo);
    }

    @GetMapping(value = "/data")
    public RestResp data() throws ParseException {
        String url = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=zzf,20&gs=0&sc=zzf&st=desc&sd=2016-12-13&ed=2017-12-13&qdii=&tabSubtype=,,,,,&pi=1&pn=50&dx=1&v=0.9199814353030342";
        String xrl = "http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=&gs=0&sc=zzf&st=desc&sd=2016-12-14&ed=2017-12-14&qdii=&tabSubtype=,,,,,&pi=1&pn=50&dx=1&v=0.8905995665989086";//全部
        return fundService.getData(url);
    }

    @GetMapping(value = "/detail")
    public RestResp detail() throws ParseException {
        String url = "http://fund.eastmoney.com/data/FundPicData.aspx?bzdm=004315&n=0&dt=year&vname=ljsylSVG_PicData&r=0.1861039093066288";
        return fundService.getDataDetail(url);
    }
}
