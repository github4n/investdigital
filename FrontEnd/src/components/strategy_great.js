/**
 * Created by zhangxiaojing on 2017/12/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import {ROOT_AVATAR} from '../actions/types';
import { Link } from 'react-router-dom';
import {fetchGreatStrategy} from '../actions/strategy';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';

class StrategyGreat extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount(){
        this.props.fetchGreatStrategy();
    }
    componentDidUpdate(){
        let array=this.props.strategy_great;
        array=this.sliceArray(array, 3);
        console.log(array);
        array.map((item, i)=>{
            item.map((item, index)=> {
                let dataX=[], data=[];
                item.earningInfoList.map((val, index)=>{
                    let date=new Date(val.timeStamp).toLocaleDateString();
                    let earning = ((val.earning)*100).toFixed(2);
                    dataX.push(date);
                    data.push(earning);
                });
                const myChart = echarts.init((document.getElementById(`strategy${i}`).getElementsByClassName(`main${index}`))[0]);
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis'
                    },
                    grid: {
                        x: 40,
                        y:40
                    },
                    backgroundColor:"#E2EFF9",
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : true,
                            data : dataX
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'成交',
                            type:'line',
                            borderColor:'blue',
                            // smooth:true,
                            itemStyle: {
                                normal: {
                                    areaStyle: {type: 'default'},
                                    lineStyle:{
                                        color:'red'
                                    }
                                }
                            },
                            data:data
                        }
                    ]
                });
            });
        });
    }
    sliceArray(array, size){
        var result = [];
        for (var x = 0; x < Math.ceil(array.length / size); x++) {
            var start = x * size;
            var end = start + size;
            result.push(array.slice(start, end));
        }
        return result;
    }
    renderTags(item){
        return item.tags.map((item, index)=>{
            return(
                <div className="g-my-10" key={index}>
                    <span className="strategy-choiceness-tip g-px-5 g-py-5 g-mr-10">{item.tagName}</span>
                </div>
            );
        });
    }
    renderList2(item){
        return item.map((item, index)=>{
            return(
                <Link className="col-sm-3 strategy-choiceness-item strategy-choiceness-up id-boxshadow g-mb-20 g-mt-10" to="/strategy/details" key={index}>
                    <div className="strategy-choiceness-title">
                        <span className="h4">{item.title}</span>
                        {this.renderTags(item)}
                        <div className="g-py-10 strategy-choiceness-user">
                            <div className="photo">
                                <img src={`${ROOT_AVATAR}/${item.imageUrl}`} alt=""/>
                                <span className="g-pl-5">{item.loginname}</span>
                            </div>
                            <span className="strategy-choiceness-title-line"></span>
                        </div>
                        <div className={`strategy-chart main${index}`} style={{height:"180px", width:"240px"}}></div>
                        <div className="strategy-choiceness-number row g-pt-10 text-center">
                            <div className="col-sm-4">
                                <h5 className="g-pt-5">{((item.totalReturn)*100).toFixed(2)}%</h5>
                                <h5 className="g-pt-5">累计收益</h5>
                            </div>
                            <div className="col-sm-4">
                                <h5 className="g-pt-5">{((item.maxDrawdown)*100).toFixed(2)}%</h5>
                                <h5 className="g-pt-5">最大回撤</h5>
                            </div>
                            <div className="col-sm-4">
                                <h5 className="g-pt-5">{item.alreadySubscribed}</h5>
                                <h5 className="g-pt-5">订阅人数</h5>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        });
    }
    renderList(){
        let array=this.props.strategy_great;
        array=this.sliceArray(array, 3);
        console.log(array);
        return array.map((item, index)=>{
            return(
                <div id={`strategy${index}`} key={index}>
                    {this.renderList2(item)}
                </div>
            );
        });
    }
    render(){
        if(this.props.strategy_great === null){
            return(<div className="text-center h3">loading</div>);
        }
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        console.log(this.props.strategy_great);
        return(
            <div className="id-boxshadow g-pb-20 clearfix">
                <div className="col-sm-12 title text-center g-py-20">InvestDigital策略精选</div>
                <div className="col-sm-12 g-pb-20">
                    <div className="col-sm-1"></div>
                    <Slider {...settings}>
                        {this.renderList()}
                    </Slider>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        strategy_great:state.strategy.strategy_great
    };
}
export default connect(mapStateToProps, {fetchGreatStrategy})(StrategyGreat);