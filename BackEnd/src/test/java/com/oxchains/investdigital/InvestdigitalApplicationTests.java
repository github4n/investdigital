package com.oxchains.investdigital;

import com.oxchains.investdigital.dao.FundOfTagRepo;
import com.oxchains.investdigital.dao.FundRepo;
import com.oxchains.investdigital.dao.FundTagRepo;
import com.oxchains.investdigital.entity.Fund;
import com.oxchains.investdigital.entity.FundOfTag;
import com.oxchains.investdigital.entity.FundTag;
import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class InvestdigitalApplicationTests {

	@Test
	public void contextLoads() {
		get("http://fund.eastmoney.com/data/rankhandler.aspx?op=ph&dt=kf&ft=all&rs=zzf,20&gs=0&sc=zzf&st=desc&sd=2016-12-13&ed=2017-12-13&qdii=&tabSubtype=,,,,,&pi=1&pn=50&dx=1&v=0.9199814353030342");
	}

	@Resource
	FundRepo fundRepo;
	@Resource
	FundTagRepo fundTagRepo;
	@Resource
	FundOfTagRepo fundOfTagRepo;
	@Test
	public void createTags(){
		Iterable<Fund> funds = fundRepo.findAll();
		Iterable<FundTag> fundTags = fundTagRepo.findAll();

		List<FundOfTag> list = new ArrayList<>();
		for(Fund fund:funds){
			int n = fund.getId().intValue() % 4;
			int i = 0;
			for(FundTag fundTag : fundTags){
				if(i>n){
					break;
				}
				FundOfTag fundOfTag = new FundOfTag();
				fundOfTag.setFundId(fund.getId());
				fundOfTag.setTagId(fundTag.getId());

				list.add(fundOfTag);
				i++ ;
			}

		}
		fundOfTagRepo.save(list);
	}
	/**
	 * 发送 get请求
	 */
	private void get(String url) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try {
			// 创建httpget.
			HttpGet httpget = new HttpGet(url);
			System.out.println("executing request " + httpget.getURI());
			// 执行get请求.
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				// 获取响应实体
				HttpEntity entity = response.getEntity();
				System.out.println("--------------------------------------");
				// 打印响应状态
				System.out.println(response.getStatusLine());
				if (entity != null) {
					// 打印响应内容长度
					System.out.println("Response content length: " + entity.getContentLength());
					// 打印响应内容
					System.out.println("Response content: " + EntityUtils.toString(entity));
				}
				System.out.println("------------------------------------");
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
	}
}
