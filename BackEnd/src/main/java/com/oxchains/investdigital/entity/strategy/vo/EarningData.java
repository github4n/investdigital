package com.oxchains.investdigital.entity.strategy.vo;

import com.oxchains.investdigital.common.DateUtil;
import com.oxchains.investdigital.entity.strategy.Csi;
import com.oxchains.investdigital.entity.strategy.EarningInfo;
import lombok.Data;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by xuqi on 2017/12/19.
 */
@Data
public class EarningData {
   private String[] time;
   private String[] data;
   private String[] csiData;
   public void setEarningInfo(List<EarningInfo> earningInfo, List<Csi> csiList){
       DecimalFormat df = new DecimalFormat("#.##");
       List<String> timeList = new ArrayList<>(earningInfo.size());
       List<String> dataList = new ArrayList<>(earningInfo.size());
       List<String> csiStrList = new ArrayList<>(csiList.size());

       for (EarningInfo info: earningInfo) {
           timeList.add(DateUtil.stampToDate(info.getTimeStamp(),"yyyy-MM-dd HH:mm:ss"));
           dataList.add(df.format(info.getEarning()*100));
       }
       for (Csi csi: csiList) {
           csiStrList.add(df.format(csi.getEarning()*100));
       }
       time = timeList.toArray(new String[earningInfo.size()]);
       data = dataList.toArray(new String[earningInfo.size()]);
       csiData = csiStrList.toArray(new String[csiList.size()]);
   };
}
