/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { DatePicker } from 'antd';
const { RangePicker} = DatePicker;
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/dataZoom';


class StrateTimeLine extends Component{
    constructor(props) {
        super(props);
        this.state={
            pageSize:10,
            active:0,
        };
    }
    componentWillMount() {

    }
    handleChange(date, dateString){
        console.log(date, dateString);
    }
    componentDidMount() {
        var base = +new Date(1968, 9, 3);
        var oneDay = 24 * 3600 * 1000;
        var date = [];

        var data = [Math.random() * 300];
        var data2 = [Math.random() * 10];

        for (var i = 1; i < 20000; i++) {
            var now = new Date(base += oneDay);
            date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
            data2.push(Math.round((Math.random() - 1) + data2[i - 1]));
        }
        console.log(date, data);
            var myChart = echarts.init(document.getElementById("earning-figure"));
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    position: function (pt) {
                        return [pt[0], '10%'];
                    },
                },
                grid:{
                    y:10
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis: {
                    type: 'value',
                    show: true,
                    boundaryGap: [0, '100%'],
                    name:"sdfdef",
                },
                dataZoom: [{
                    show:true,
                    type: 'inside',
                    start: 0,
                    end: 10
                }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series: [
                    {
                        name:'模拟数据',
                        type:'line',
                        smooth:false,
                        symbol: 'none',
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: 'rgb(255, 70, 131)'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(255, 158, 68)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(255, 70, 131)'
                                }])
                            }
                        },
                        data: data
                    },
                    {
                        name:'模拟数据',
                        type:'line',
                        smooth:false,
                        sampling: 'average',
                        data: data2,
                        itemStyle: {
                            normal: {
                                color: 'blue'
                            }
                        },
                    }
                ]
            });
    }
    handleClick (index) {
        this.setState({index});
    }
    renderSelect(){
        const selectItem=[
            {title:"1月"},
            {title:"3月"},
            {title:"6月"},
            {title:"1年"},
            {title:"全部"}
        ];
        return selectItem.map((item, index)=>{
            return(
                <div className={index === this.state.index ? "active btn btn-default g-mr-5" : "btn btn-default g-mr-5"} onClick={ this.handleClick.bind(this, index)} key={index}>{item.title}</div>
            );
        });
    }
    render(){
        return(
            <div className="col-sm-12 g-py-20">
                <div className="earning-figure">
                    <div className="earning-figure-select text-left clearfix">
                        <div className="pull-left">
                            {this.renderSelect()}
                        </div>
                        <div className="pull-right">
                            <RangePicker onChange={this.handleChange.bind(this)} />
                        </div>
                    </div>
                    <div className="strategy-chart g-mt-20" id="earning-figure" style={{height:"350px"}}></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(StrateTimeLine);