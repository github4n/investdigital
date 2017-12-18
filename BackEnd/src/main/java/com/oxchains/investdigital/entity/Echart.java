package com.oxchains.investdigital.entity;

import java.util.List;
import java.util.Map;

/**
 * @author ccl
 * @time 2017-12-16 16:45
 * @name Echart
 * @desc:
 */
public class Echart {
    private List<String> xAxis;
    private List<Map<String,Object>> yAxis;

    public List<String> getxAxis() {
        return xAxis;
    }

    public void setxAxis(List<String> xAxis) {
        this.xAxis = xAxis;
    }

    public List<Map<String, Object>> getyAxis() {
        return yAxis;
    }

    public void setyAxis(List<Map<String, Object>> yAxis) {
        this.yAxis = yAxis;
    }
}
