package com.oxchains.investdigital.common;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;

/**
 * Created by huohuo on 2017/10/24.
 */
public class DateUtil {
    /*
    * 获取当前时间精确到毫秒
    * */
    private static String getPresentTime(){
        Calendar Cld= Calendar.getInstance();
        int YY = Cld.get(Calendar.YEAR) ;
        int MM = Cld.get(Calendar.MONTH)+1;
        int DD = Cld.get(Calendar.DATE);
        int HH = Cld.get(Calendar.HOUR_OF_DAY);
        int mm = Cld.get(Calendar.MINUTE);
        int SS = Cld.get(Calendar.SECOND);
        int MI = Cld.get(Calendar.MILLISECOND);
        return ""+YY+MM+DD+HH+mm+SS+MI;
    }
    public static long getDateMillis(int day){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE,day);
        return calendar.getTime().getTime();
    }
    /*
    * 获取当前时间格式为 YY-MM-dd HH:mm:ss
    * */
    public static String getPresentDate(){
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }
    public static String getOrderId(){
        Random r = new Random();
        String randomStr = ""+r.nextInt(9)+r.nextInt(9)+r.nextInt(9)+r.nextInt(9)+r.nextInt(9);
        return getPresentTime()+randomStr;
    }

    public static Date longToDate(long time,String pattern) throws ParseException {
        Date date = new Date(time);
        String str = dateToString(date,pattern);
        return stringToDate(str,pattern);
    }
    public static String longToString(long time,String pattern){
        Date date = new Date(time);
        return dateToString(date,pattern);
    }
    public static String dateToString(Date date, String pattern){
        return new SimpleDateFormat(pattern).format(date);
    }
    public static Date stringToDate(String str, String pattern) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        Date date = sdf.parse(str);
        return date;
    }
    public static long getTimeMillis(String str, String pattern) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        Date date = sdf.parse(str);
        return  date.getTime();
    }
    public static void main(String[] args) {
        System.out.println(getOrderId());
        System.out.println(getOrderId());
        System.out.println(getOrderId());
        System.out.println(getOrderId());
        System.out.println(getOrderId());
    }

}
