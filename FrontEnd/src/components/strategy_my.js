/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Pagination} from 'nl-design';
import {ROOT_AVATAR} from '../actions/types';
import {fetchUserStrategy} from '../actions/strategy';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
class StrategyMy extends Component{
    constructor(props) {
        super(props);
        this.state={
            index:0,
            pageNum:1,
            pageSize:10,
            desc:'id'
        };
    }
    componentWillMount() {
        const userId=243461;
        const pageNum=this.state.pageNum;
        const pageSize=this.state.pageSize;
        const desc=this.state.desc;
        this.props.fetchUserStrategy({pageSize, pageNum, desc, userId});
    }
    handlePagination(pageNum) {
        const userId=243461;
        const pageSize=this.state.pageSize;
        const desc=this.state.desc;
        this.props.fetchUserStrategy(pageSize, pageNum, desc, userId);
    }
    componentDidUpdate() {
        this.props.strategy_user.data.map((item, i)=> {
            let myChart2 = echarts.init(document.getElementById(`main2${i}`));
            let dataX=[], data=[];
            item.earningInfoList.map((val, index)=>{
                let date=new Date(val.timeStamp).toLocaleDateString();
                let earning = ((val.earning)*100).toFixed(2);
                dataX.push(date);
                data.push(earning);
            });
            // 绘制图表
            myChart2.setOption({
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
                        // boundaryGap : false,
                        axisLabel :{
                            interval:0,
                            rotate: 60
                        },
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
                        name:'收益',
                        type:'line',
                        borderColor:'blue',
                        // smooth:true,
                        itemStyle: {
                            normal: {
                                areaStyle: {type: 'default'},
                                lineStyle:{
                                    color:'blue'
                                }
                            }
                        },
                        data:data
                    }
                ]
            });
        });

    }
    handleClick (index) {
        this.setState({index});
    }
    renderSelect(){
        const selectItem=[
            {title:"我的分享"},
            {title:"我的订阅"}
        ];
        return selectItem.map((item, index)=>{
            return(
                <li className={ index === this.state.index ? "active" : ""} onClick={ this.handleClick.bind(this, index)} key={index}>{item.title}</li>
            );
        });
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
    renderList(){
        return this.props.strategy_user.data.map((item, index)=>{
            return(
                <li className="strate-all-content-item  clearfix g-mt-20" key={index}>
                    <Link to="/strategy/details">
                        <div className="col-sm-2">
                            <img style={{width:"100%"}} className="g-mt-50" src="/public/img/u158.png" alt=""/>
                            <span className="rank">{item.rank}</span>
                        </div>
                        <div className="col-sm-5">
                            <div className="strategy-choiceness-item clearfix" style={{padding:"20px 0"}}>
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
                                    <div className="strategy-choiceness-number row g-pt-10 text-center" style={{fontSize:"12px"}}>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">{((item.totalReturn)*100).toFixed(2)}%</h5>
                                            <h5 className="g-pt-5">累计收益</h5>
                                        </div>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">{((item.annualizedReturn)*100).toFixed(2)}%</h5>
                                            <h5 className="g-pt-5">年化收益</h5>
                                        </div>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">{((item.maxDrawdown)*100).toFixed(2)}%</h5>
                                            <h5 className="g-pt-5">最大回撤</h5>
                                        </div>
                                        <div className="col-sm-3" style={{padding:0}}>
                                            <h5 className="g-pt-5">{new Date(item.beginTime).toLocaleDateString()}</h5>
                                            <h5 className="g-pt-5">开始时间</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-5">
                            <div className="strategy-chart g-mt-20" id={`main2${index}`} style={{height:"180px", width:"248px"}}></div>
                        </div>
                    </Link>
                </li>
            );
        });
    }

    render(){
        const totalNum = this.props.strategy_user && this.props.strategy_user.rowCount;
        if(this.props.strategy_user===null){
           return(<div></div>);
        }
        return(
            <div className="strategy-all-content clearfix">
                <div className="strategy-all-content-filtrate g-py-20 clearfix">
                    <ul>
                        {this.renderSelect()}
                    </ul>
                </div>
                <div className="clearfix">
                    <ul className="clearfix">
                        {this.renderList()}
                    </ul>
                </div>
                <div className="g-my-30">
                    <Pagination  defaultPageSize={this.state.pageSize} total={totalNum}  onChange={e => this.handlePagination(e)}/>
                </div>
            </div>

        );
    }
}
function mapStateToProps(state) {
    return {
        strategy_user:state.strategy.strategy_user
    };
}
export default connect(mapStateToProps, {fetchUserStrategy})(StrategyMy);