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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;
import sun.net.www.http.HttpClient;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    @Resource
    private FundInfoRepo fundInfoRepo;
    @Resource
    private FundCommentRepo fundCommentRepo;
    @Resource
    private PurchaserInfoRepo purchaserInfoRepo;

    public RestResp add(FundIssuance fundIssuance) {
        if (null != fundIssuance) {
            try {
                if (null == fundIssuance.getUsername() || "".equals(fundIssuance.getUsername().trim())) {
                    RestResp.fail("请正确填写申请人名称");
                }
                if (null == fundIssuance.getMobilephone() || "".equals(fundIssuance.getMobilephone().trim())) {
                    RestResp.fail("请正确填写申请人手机");
                }
                if (null == fundIssuance.getInvestDigitalNo() || "".equals(fundIssuance.getInvestDigitalNo().trim())) {
                    RestResp.fail("请正确填写申请编号");
                }
                FundIssuance f = fundIssuanceRepo.findByInvestDigitalNo(fundIssuance.getInvestDigitalNo());
                if (f != null) {
                    RestResp.fail("编号重复,请重新填写");
                }
                FundIssuance issuance = fundIssuanceRepo.save(fundIssuance);
                return RestResp.success("申请提交成功", new FundIssuanceVO(issuance));
            } catch (Exception e) {
                return RestResp.fail("申请提交失败");
            }
        }
        return RestResp.fail("申请提交失败");
    }

    public RestResp getStarFunds() {
        Pageable pager = new PageRequest(0, 6);
        Page<FundReturn> page = fundReturnRepo.findFundReturns(pager);
        List<FundReturn> list = page.getContent();
        if (null == list || list.size() < 1) {
            return RestResp.fail("无数据");
        }
        Iterable<User> users = userRepo.findAll();
        List<List<FundVO>> ll = new ArrayList<>();
        List<FundVO> result = null;
        int i = 0;
        for (FundReturn fundReturn : list) {
            if(i%3==0){
                result =new ArrayList<>();
            }
            Fund fund = fundRepo.findOne(fundReturn.getFundId());
            FundVO fundVO = new FundVO(fund);
            fundVO.setReturns(fundReturn);
            long l = DateUtil.getDateMillis(-180);
            List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(), l);
            fundVO.setTags(getTagsByFundId(fund.getId()));
            //fundVO.setDetails(details);
            fundVO.setEchart(dataToEchart(details));
            for (User user : users) {
                if (user.getId().equals(fund.getIssueUser())) {
                    fundVO.setIssueUserName(user.getLoginname());
                    break;
                }
            }
            result.add(fundVO);
            if(i%3==2){
                ll.add(result);
            }
            i++;
        }
        /*List<FundVO> result = new ArrayList<>();
        for (FundReturn fundReturn : list) {
            Fund fund = fundRepo.findOne(fundReturn.getFundId());
            FundVO fundVO = new FundVO(fund);
            fundVO.setReturns(fundReturn);
            long l = DateUtil.getDateMillis(-180);
            List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(), l);
            fundVO.setTags(getTagsByFundId(fund.getId()));
            fundVO.setDetails(details);
            for (User user : users) {
                if (user.getId().equals(fund.getIssueUser())) {
                    fundVO.setIssueUserName(user.getLoginname());
                    break;
                }
            }

            result.add(fundVO);
        }*/
        return RestResp.success("获取数据成功", ll);
    }

    public List<FundReturnDetail> getFundReturnDetail(Long fundId, Integer day) {
        List<FundReturnDetail> list = null;
        if (day == 0) {//全部
            list = fundReturnDetailRepo.findFundReturnDetailByFundIdOrderByDateAsc(fundId);
        } else if (day == 1) {//今年以来
            list = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fundId, DateUtil.getFromThisYearMillis());
        } else if (day >= 30) {
            list = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fundId, DateUtil.getDateMillis(-day));
        } else {
            list = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fundId, DateUtil.getDateMillis(-180));
        }
        return list;
    }

    public Echart getChangeEChart(Long fundId,Integer day){
        List<FundReturnDetail> list = getFundReturnDetail(fundId,day);
        return dataToEchart(list);
    }

    public RestResp getFunds() {
        Pageable pager = new PageRequest(0, 10);
        Page<FundReturn> page = fundReturnRepo.findFundReturns(pager);
        List<FundReturn> list = page.getContent();
        if (null == list || list.size() < 1) {
            return RestResp.fail("无数据");
        }
        Iterable<Fund> funds = fundRepo.findAll();
        Iterable<User> users = userRepo.findAll();
        List<FundVO> result = new ArrayList<>();
        for (FundReturn fundReturn : list) {
            for (Fund fund : funds) {
                if (fundReturn.getFundId().equals(fund.getId())) {
                    FundVO fundVO = new FundVO(fund);
                    fundVO.setReturns(fundReturn);
                    List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(), DateUtil.getDateMillis(-180));
                    //fundVO.setDetails(details);
                    fundVO.setEchart(dataToEchart(details));
                    fundVO.setTags(getTagsByFundId(fund.getId()));
                    for (User user : users) {
                        if (user.getId().equals(fund.getIssueUser())) {
                            fundVO.setIssueUserName(user.getLoginname());
                            break;
                        }
                    }
                    result.add(fundVO);
                    break;
                }
            }
        }
        return RestResp.success("获取数据成功", result);
    }

    public RestResp getFundInfo(Long fundId) {
        Fund fund = fundRepo.findOne(fundId);
        if (null == fund) {
            return RestResp.fail("无法查询基金详细信息");
        }
        FundVO fundVO = new FundVO(fund);
        User user = userRepo.findOne(fund.getIssueUser());
        if (null != user) {
            fundVO.setIssueUserName(user.getLoginname());
        }
        FundReturn fundReturn = fundReturnRepo.findByFundId(fundId);
        fundVO.setReturns(fundReturn);
        FundInfo fundInfo = fundInfoRepo.findByFundId(fundId);
        fundVO.setInfo(fundInfo);
        List<String> tags = getTagsByFundId(fundId);
        fundVO.setTags(tags);
        List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fundId, DateUtil.getDateMillis(-180));
        //fundVO.setDetails(details);
        fundVO.setEchart(dataToEchart(details));

        return RestResp.success("成功", fundVO);
    }

    public List<String> getTagsByFundId(Long fundId) {
        List<FundOfTag> fundOfTags = fundOfTagRepo.findByFundId(fundId);
        List<String> tags = new ArrayList<>();
        if (null != fundOfTags && fundOfTags.size() > 0) {
            Iterable<FundTag> list = fundTagRepo.findAll();
            for (FundOfTag fundOfTag : fundOfTags) {
                for (FundTag fundTag : list) {
                    if (fundOfTag.getTagId().equals(fundTag.getId())) {
                        tags.add(fundTag.getTagName());
                    }
                }
            }
        }
        return tags;
    }

    public RestResp getMyFunds(Long userId) {
        List<Fund> funds = fundRepo.findByIssueUser(userId);
        if (null != funds && funds.size() > 0) {
            List<Long> fundIds = new ArrayList<>();
            for (Fund fund : funds) {
                fundIds.add(fund.getId());
            }
            List<FundReturn> list = fundReturnRepo.findFundReturnsByFundId(fundIds);
            List<FundVO> result = new ArrayList<>();
            for (FundReturn fundReturn : list) {
                for (Fund fund : funds) {
                    if (fundReturn.getFundId().equals(fund.getId())) {
                        FundVO fundVO = new FundVO(fund);
                        fundVO.setReturns(fundReturn);
                        User user = userRepo.findOne(fund.getIssueUser());
                        fundVO.setIssueUserName(user.getLoginname());
                        List<FundReturnDetail> details = fundReturnDetailRepo.findByFundIdAndDateIsGreaterThanEqualOrderByDateAsc(fund.getId(), DateUtil.getDateMillis(-180));
                        //fundVO.setDetails(details);
                        fundVO.setEchart(dataToEchart(details));
                        fundVO.setTags(getTagsByFundId(fund.getId()));
                        result.add(fundVO);
                        break;
                    }
                }
            }

            return RestResp.success("获取数据成功", result);
        }
        return RestResp.fail("您暂未发行基金");
    }

    public RestResp fundComment(Long fundId) {
        List<FundComment> comments = fundCommentRepo.findByFundId(fundId);
        if (comments != null && comments.size() > 0) {
            Iterable<User> users = userRepo.findAll();
            for (int i = 0; i < comments.size(); i++) {
                for (User user : users) {
                    if (comments.get(i).getUserId().equals(user.getId())) {
                        comments.get(i).setUsername(user.getLoginname());
                        break;
                    }
                }
            }

            return RestResp.success("获取数据成功", comments);
        }
        return RestResp.success("无评论数据", null);
    }

    public RestResp addPurchaser(PurchaserInfo purchaserInfo) {
        if (null != purchaserInfo) {
            PurchaserInfo p = purchaserInfoRepo.save(purchaserInfo);
            return RestResp.success("添加信息成功", p);
        }
        return RestResp.fail("添加信息失败");
    }

    private Echart dataToEchart(List<FundReturnDetail> list){
        Echart echart = null;
        if(null!=list && list.size()>0){
            echart = new Echart();
            List<String> xAxis = new ArrayList<>();
            List<Map<String,Object>> yAxis = new ArrayList<>();
            Map<String,Object> mapFund = new HashMap<>();
            Map<String,Object> mapCsi300 = new HashMap<>();
            //Map<String,Object> mapShIndex = new HashMap<>();

            List<Float> fund = new ArrayList<>();
            List<Float> csi300 = new ArrayList<>();
            //List<Float> shindex = new ArrayList<>();
            for(FundReturnDetail detail:list){
                xAxis.add(detail.getDateStr());

                fund.add(detail.getFundReturn());
                csi300.add(detail.getCsi300());
                //shindex.add(detail.getShcompositeIndex());

            }

            mapFund.put("name",list.get(0).getFundCode());
            mapFund.put("data",fund);
            yAxis.add(mapFund);

            mapCsi300.put("name","沪深300");
            mapCsi300.put("data",csi300);
            yAxis.add(mapCsi300);

            echart.setxAxis(xAxis);
            echart.setyAxis(yAxis);
        }
        return echart;
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
                    String result = EntityUtils.toString(entity);
                    System.out.println("数据长度: " + len);
                    System.out.println("数据内容: " + result);

                    if (null != result && !"".equals(result.trim())) {
                        result = result.split("datas:")[1];
                        result = result.split(",allRecords:")[0];
                        JSONArray jsonArray = JSONArray.parseArray(result);
                        System.out.println(jsonArray);
                        List<String> list = JSONArray.parseArray(result, String.class);
                        List<Fund> funds = new ArrayList<>();
                        List<FundReturn> fundReturns = new ArrayList<>();
                        List<FundOfTag> fundOfTags = new ArrayList<>();
                        for (String str : list) {
                            Fund fund = new Fund();
                            FundReturn fundReturn = new FundReturn();
                            FundOfTag fundOfTag = new FundOfTag();

                            String[] objStr = str.split(",");
                            fund.setFundCode(objStr[0]);
                            fund.setFundName(objStr[1]);
                            fund.setFundSymbol(objStr[2]);
                            fund.setIssueUserName(objStr[2]);
                            fund.setStartTime(DateUtil.getTimeMillis(objStr[16], "yyyy-MM-dd"));
                            fund.setFee(NumberFormatUtil.stringToFloat(objStr[20].replace("%", "")));
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
            for (Fund fund : it) {
                url = "http://fund.eastmoney.com/data/FundPicData.aspx?bzdm=" + fund.getFundCode() + "&n=0&dt=year&vname=ljsylSVG_PicData&r=0.1861039093066288";
                HttpGet httpget = new HttpGet(url);
                // 执行get请求.
                CloseableHttpResponse response = httpclient.execute(httpget);
                try {
                    HttpEntity entity = response.getEntity();
                    if (entity != null) {
                        long len = entity.getContentLength();
                        String result = EntityUtils.toString(entity);

                        if (null != result && !"".equals(result.trim())) {
                            result = result.split("ljsylSVG_PicData=")[1];
                            result = result.replace("\"", "");
                            result = result.replace("|", "#");
                            String[] datas = result.split("#");
                            int ll = datas.length;
                            List<FundReturnDetail> list = new ArrayList<>();
                            for (String str : datas) {
                                FundReturnDetail fundReturnDetail = new FundReturnDetail();
                                fundReturnDetail.setFundCode(fund.getFundCode());
                                fundReturnDetail.setFundId(fund.getId());

                                String[] data = str.split("_");
                                int lll = data.length;
                                if (lll >= 1) {
                                    fundReturnDetail.setDate(DateUtil.getTimeMillis(data[0], "yyyy/MM/dd"));
                                }
                                if (lll >= 2) {
                                    fundReturnDetail.setFundReturn(NumberFormatUtil.stringToFloat(data[1]));
                                }
                                if (lll >= 3) {
                                    fundReturnDetail.setCsi300(NumberFormatUtil.stringToFloat(data[2]));
                                }
                                if (lll >= 4) {
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
