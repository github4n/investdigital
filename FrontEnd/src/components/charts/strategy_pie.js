/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/pie';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';


class StratePie extends Component{
    constructor(props) {
        super(props);
        this.state={
            pageSize:10,
            active:0,
        };
    }
    componentWillMount() {

    }
    componentDidMount() {
        var myChart = echarts.init(document.getElementById("pie-figure"));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient:'vertical',
                align:"left",
                y: 'bottom',
                x: 'right',
                itemWidth: 10,             // 图例图形宽度
                itemHeight: 10,
                data:[
                    {
                        name:'直接访问', icon: 'circle'
                    },  {
                        name:'邮件营销', icon: 'circle'
                    }, {
                        name:'联盟广告', icon: 'circle'
                    }, {
                        name:'视频广告', icon: 'circle'
                    }, {
                        name:'搜索引擎', icon: 'circle'
                    }
                ]
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['30%', '70%'],
                    center: ['50%', '40%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '20',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {
                            value:600,
                            name:'直接访问',
                            itemStyle:{
                                normal:{
                                    color:'#d43941',
                                }
                            }
                        }, {
                            value:310,
                            name:'邮件营销',
                            itemStyle:{
                                normal:{
                                    color:'#dd514e',
                                }
                            }
                        }, {
                            value:234,
                            name:'联盟广告',
                            itemStyle:{
                                normal:{
                                    color:'#e07b6d',
                                }
                            }
                        }, {
                            value:135,
                            name:'视频广告',
                            itemStyle:{
                                normal:{
                                    color:'#ffb4a2',
                                }
                            }
                        }, {
                            value:48,
                            name:'搜索引擎',
                            itemStyle:{
                                normal:{
                                    color:'#ffdbd2',
                                }
                            }
                        }
                    ]
                }
            ]
        });
    }

    render(){
        return(
            <div className="col-sm-12 g-pb-20">
                <div className="pie-figure">
                    <div className="strategy-chart" id="pie-figure" style={{height:"300px"}}></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(StratePie);