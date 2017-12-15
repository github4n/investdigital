/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/radar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';


class StrateRadar extends Component{
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
        var myChart = echarts.init(document.getElementById("radar-figure"));
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            legend: {
                orient:'vertical',
                align:"left",
                y: 'bottom',
                x: 'right',
                data: [
                    {
                        name:'预算分配', icon: 'circle'
                    }, {
                        name:'实际开销', icon: 'circle'
                    }
                ],
                itemWidth: 10,             // 图例图形宽度
                itemHeight: 10,
            },
            radar: {
                // shape: 'circle',
                // name: {
                //     textStyle: {
                //         // color: '#fff',
                //         // backgroundColor: '#999',
                //         // borderRadius: 2,
                //         // padding: [3, 3]
                //     }
                // },
                indicator: [
                    { name: '销售', max: 6500},
                    { name: '管理', max: 16000},
                    { name: '信息技术', max: 30000},
                    { name: '客服', max: 38000},
                    { name: '研发', max: 52000},
                    { name: '市场', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 2800, 35000, 50000, 19000],
                        name : '预算分配',
                        itemStyle:{
                            normal:{
                                color:'#e07b6d',
                            }
                        }
                    },
                    {
                        value : [5000, 10000, 28000, 3100, 32000, 21000],
                        name : '实际开销',
                        itemStyle:{
                            normal:{
                                color:'#8da6e0',
                            }
                        }
                    }
                ]
            }]
        });
    }

    render(){
        return(
            <div className="col-sm-12 g-pb-20">
                <div className="radar-figure">
                    <div className="strategy-chart" id="radar-figure" style={{height:"380px"}}></div>
                </div>
            </div>


        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(StrateRadar);