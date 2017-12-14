package com.oxchains.investdigital.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.oxchains.investdigital.common.DateUtil;
import com.oxchains.investdigital.common.NumberFormatUtil;
import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.dao.*;

import com.oxchains.investdigital.entity.*;
import com.sun.org.apache.xpath.internal.compiler.FunctionTable;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import sun.net.www.http.HttpClient;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author ccl
 * @time 2017-12-13 14:44
 * @name FundService
 * @desc:
 */
@Slf4j
@Service
public class FundService {
    @Resource
    private FundIssuanceRepo fundIssuanceRepo;
    @Resource
    private FundRepo fundRepo;
    @Resource
    private FundReturnRepo fundReturnRepo;
    @Resource
    private FundReturnDetailRepo fundReturnDetailRepo;
    @Resource
    private FundOfTagRepo fundOfTagRepo;
    @Resource
    private FundTagRepo fundTagRepo;
    @Resource
    private UserRepo userRepo;

    public RestResp add(FundIssuance fundIssuance){
        if (null != fundIssuance){
            try {
                FundIssuance issuance = fundIssuanceRepo.save(fundIssuance);
                return RestResp.success("申请提交成功", new FundIssuanceVO(issuance));
            }catch (Exception e){
                return RestResp.fail("申请提交失败");
            }
        }
        return RestResp.fail("申请提交失败");
    }

    public RestResp getStarFunds(){
        Pageable pager = new PageRequest(0,3);
        Page<FundReturn>  page = fundReturnRepo.findFundReturns(pager);
        List<FundReturn> list = page.getContent();
        if(null == list || list.size() < 1){
            return RestResp.fail("无数据");
        }
        Iterable<User> users = userRepo.findAll();
        List<FundVO> result = new ArrayList<>();
        for(FundReturn fundReturn : list){
            Fund fund = fundRepo.findOne(fundReturn.getFundId());
            FundVO fundVO = new FundVO(fund);
            fundVO.setReturns(fundReturn);
            long l = DateUtil.getDateMillis( -90);
            List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(),l);
            fundVO.setTags(getTagsByFundId(fund.getId()));
            fundVO.setDetails(details);
            for(User user : users){
                if(user.getId().equals(fund.getIssueUser())){
                    fundVO.setIssueUserName(user.getLoginname());
                    break;
                }
            }

            result.add(fundVO);
        }
        return RestResp.success("获取数据成功",result);
    }

    public List<FundReturnDetail> getFundReturnDetail(Long fundId,int day){
        List<FundReturnDetail> list = null;
        if(day <= 0){
            list = fundReturnDetailRepo.findFundReturnDetailByFundIdOrderByDateAsc(fundId);
        }else {
            list = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fundId,DateUtil.getDateMillis(day));
        }
        return list;
    }
    public RestResp getFunds(){
        Pageable pager = new PageRequest(0,20);
        Page<FundReturn>  page = fundReturnRepo.findFundReturns(pager);
        List<FundReturn> list = page.getContent();
        if(null == list || list.size() < 1){
            return RestResp.fail("无数据");
        }
        Iterable<Fund> funds = fundRepo.findAll();
        Iterable<User> users = userRepo.findAll();
        List<FundVO> result = new ArrayList<>();
        for(FundReturn fundReturn : list){
            for(Fund fund : funds){
                if(fundReturn.getFundId().equals(fund.getId())){
                    FundVO fundVO = new FundVO(fund);
                    fundVO.setReturns(fundReturn);
                    List<FundReturnDetail> details =fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(),DateUtil.getDateMillis(-90));
                    fundVO.setDetails(details);
                    fundVO.setTags(getTagsByFundId(fund.getId()));
                    for(User user : users){
                        if(user.getId().equals(fund.getIssueUser())){
                            fundVO.setIssueUserName(user.getLoginname());
                            break;
                        }
                    }
                    result.add(fundVO);
                    break;
                }
            }
        }
        return RestResp.success("获取数据成功",result);
    }

    public List<FundTag> getTagsByFundId(Long fundId){
        List<FundOfTag> fundOfTags = fundOfTagRepo.findByFundId(fundId);
        List<FundTag> tags = new ArrayList<>();
        if(null!=fundOfTags && fundOfTags.size()>0){
            Iterable<FundTag> list = fundTagRepo.findAll();
            for(FundOfTag fundOfTag : fundOfTags){
                for(FundTag fundTag : list){
                    if(fundOfTag.getTagId().equals(fundTag.getId())){
                        tags.add(fundTag);
                    }
                }
            }
        }
        return tags;
    }

    public RestResp getMyFunds(Long userId){
        List<Fund> funds = fundRepo.findByIssueUser(userId);
        if(null!=funds && funds.size()>0){
            List<Long> fundIds = new ArrayList<>();
            for(Fund fund : funds){
                fundIds.add(fund.getId());
            }
            List<FundReturn> list = fundReturnRepo.findFundReturnsByFundId(fundIds);
            List<FundVO> result = new ArrayList<>();
            for(FundReturn fundReturn : list){
                for(Fund fund : funds){
                    if(fundReturn.getFundId().equals(fund.getId())){
                        FundVO fundVO = new FundVO(fund);
                        fundVO.setReturns(fundReturn);
                        User user = userRepo.findOne(fund.getIssueUser());
                        fundVO.setIssueUserName(user.getLoginname());
                        List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(),DateUtil.getDateMillis(-90));
                        fundVO.setDetails(details);
                        result.add(fundVO);
                        break;
                    }
                }
            }

            return RestResp.success("获取数据成功",result);
        }
        return RestResp.fail("您暂未发行基金");
    }

    public RestResp getData(String url) throws java.text.ParseException {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
            // 创建httpget.
            HttpGet httpget = new HttpGet(url);
            System.out.println("executing request " + httpget.getURI());
            // 执行get请求.
            CloseableHttpResponse response = httpclient.execute(httpget);
            try {
                HttpEntity entity = response.getEntity();
                if (entity != null) {
                    long len = entity.getContentLength();
                    String  result = EntityUtils.toString(entity);
                    System.out.println("数据长度: " + len);
                    System.out.println("数据内容: " + result);

                    if(null !=result && !"".equals(result.trim())){
                        result = result.split("datas:")[1];
                        result = result.split(",allRecords:")[0];
                        JSONArray jsonArray = JSONArray.parseArray(result);
                        System.out.println(jsonArray);
                        List<String> list =JSONArray.parseArray(result,String.class);
                        List<Fund> funds = new ArrayList<>();
                        List<FundReturn> fundReturns = new ArrayList<>();
                        List<FundOfTag> fundOfTags = new ArrayList<>();
                        for(String str : list){
                            Fund fund = new Fund();
                            FundReturn fundReturn = new FundReturn();
                            FundOfTag fundOfTag = new FundOfTag();

                            String[] objStr =  str.split(",");
                            fund.setFundCode(objStr[0]);
                            fund.setFundName(objStr[1]);
                            fund.setFundSymbol(objStr[2]);
                            fund.setIssueUserName(objStr[2]);
                            fund.setStartTime(DateUtil.getTimeMillis(objStr[16],"yyyy-MM-dd"));
                            fund.setFee(NumberFormatUtil.stringToFloat(objStr[20].replace("%","")));
                            funds.add(fund);

                            fundReturn.setFundCode(objStr[0]);
                            fundReturn.setNetAssetValue(NumberFormatUtil.stringToFloat(objStr[4]));
                            fundReturn.setNetValue(NumberFormatUtil.stringToFloat(objStr[5]));
                            fundReturn.setTotalReturn(NumberFormatUtil.stringToFloat(objStr[5]));
                            fundReturn.setTodayChange(NumberFormatUtil.stringToFloat(objStr[6]));
                            fundReturn.setWeekChange(NumberFormatUtil.stringToFloat(objStr[7]));
                            fundReturn.setMonthChange(NumberFormatUtil.stringToFloat(objStr[8]));
                            fundReturn.setMonth3Change(NumberFormatUtil.stringToFloat(objStr[9]));
                            fundReturn.setMonth6Change(NumberFormatUtil.stringToFloat(objStr[10]));
                            fundReturn.setYearChange(NumberFormatUtil.stringToFloat(objStr[11]));
                            fundReturn.setYear2Change(NumberFormatUtil.stringToFloat(objStr[12]));
                            fundReturn.setYear3Change(NumberFormatUtil.stringToFloat(objStr[13]));
                            fundReturn.setThisYearChange(NumberFormatUtil.stringToFloat(objStr[14]));
                            fundReturn.setUntilNowChange(NumberFormatUtil.stringToFloat(objStr[15]));

                            System.out.println(fund);
                            System.out.println(fundReturn);

                            fundReturns.add(fundReturn);
                            fundOfTags.add(fundOfTag);
                        }
                        fundRepo.save(funds);
                        fundReturnRepo.save(fundReturns);

                    }
                    return RestResp.success(result);
                }
            } finally {
                response.close();
            }
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public RestResp getDataDetail(String url) throws java.text.ParseException {
        CloseableHttpClient httpclient = HttpClients.createDefault();
        try {
            Iterable<Fund> it = fundRepo.findAll();
            for (Fund fund : it){
                url = "http://fund.eastmoney.com/data/FundPicData.aspx?bzdm="+fund.getFundCode()+"&n=0&dt=year&vname=ljsylSVG_PicData&r=0.1861039093066288";
                HttpGet httpget = new HttpGet(url);
                // 执行get请求.
                CloseableHttpResponse response = httpclient.execute(httpget);
                try {
                    HttpEntity entity = response.getEntity();
                    if (entity != null) {
                        long len = entity.getContentLength();
                        String  result = EntityUtils.toString(entity);

                        if(null !=result && !"".equals(result.trim())){
                            result = result.split("ljsylSVG_PicData=")[1];
                            result = result.replace("\"","");
                            result = result.replace("|","#");
                            String[] datas = result.split("#");
                            int ll = datas.length;
                            List<FundReturnDetail> list = new ArrayList<>();
                            for(String str: datas){
                                FundReturnDetail fundReturnDetail = new FundReturnDetail();
                                fundReturnDetail.setFundCode(fund.getFundCode());
                                fundReturnDetail.setFundId(fund.getId());

                                String[] data = str.split("_");
                                int lll = data.length;
                                if (lll >= 1) {
                                    fundReturnDetail.setDate(DateUtil.getTimeMillis(data[0], "yyyy/MM/dd"));
                                }
                                if(lll >= 2) {
                                    fundReturnDetail.setFundReturn(NumberFormatUtil.stringToFloat(data[1]));
                                }
                                if(lll >= 3) {
                                    fundReturnDetail.setCsi300(NumberFormatUtil.stringToFloat(data[2]));
                                }
                                if(lll >= 4){
                                    fundReturnDetail.setShcompositeIndex(NumberFormatUtil.stringToFloat(data[3]));
                                }
                                list.add(fundReturnDetail);
                            }
                            fundReturnDetailRepo.save(list);
                            System.out.println(list);
                        }
                        //return RestResp.success(result);
                    }
                } finally {
                    response.close();
                }

            }
        } catch (ClientProtocolException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            // 关闭连接,释放资源
            try {
                httpclient.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return RestResp.success();
    }

}
