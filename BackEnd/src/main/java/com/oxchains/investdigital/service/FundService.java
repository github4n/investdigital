package com.oxchains.investdigital.service;

import com.oxchains.investdigital.common.RestResp;
import com.oxchains.investdigital.dao.FundIssuanceRepo;
import com.oxchains.investdigital.entity.FundIssuance;
import com.oxchains.investdigital.entity.FundIssuanceVO;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import sun.net.www.http.HttpClient;

import javax.annotation.Resource;
import java.io.IOException;

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

    public RestResp getData(String url){
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


}
