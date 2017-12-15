/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {Pagination} from 'nl-design';
import {fetchAllStrategy} from '../actions/strategy';
import {ROOT_AVATAR} from '../actions/types';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/line';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
class StrategyAll extends Component{
    constructor(props) {
        super(props);
        this.state={
            index:0,
            pageNum:1,
            pageSize:8,
            desc:'alreadySubscribed'
        };
    }
    componentWillMount() {
        const pageNum=this.state.pageNum;
        const pageSize=this.state.pageSize;
        const desc=this.state.desc;
        this.props.fetchAllStrategy({pageSize, pageNum, desc});
    }
    handlePagination(pageNum) {
        const pageSize=this.state.pageSize;
        const desc=this.state.desc;
        this.props.fetchAllStrategy({pageSize, pageNum, desc});
    }
    componentDidUpdate() {
        this.props.strategy_all.data.map((item, i)=> {
            let myChart1 = echarts.init(document.getElementById(`main1${i}`));
            let dataX=[], data=[];
            item.earningInfoList.map((val, index)=>{
                let date=new Date(val.timeStamp).toLocaleDateString();
                let earning = ((val.earning)*100).toFixed(2);
                dataX.push(date);
                data.push(earning);
            });
            // 绘制图表
            myChart1.setOption({
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
    }
    handleClick (index) {
        this.setState({index});
        if(index == 0){
            this.setState({desc:'alreadySubscribed'});
        }
        if(index == 1){
            this.setState({desc:'score'});
        }
        if(index == 2){
            this.setState({desc:'totalReturn'});
        }
        if(index == 3){
            this.setState({desc:'annualizedReturn'});
        }
        const pageNum=this.state.pageNum;
        const pageSize=this.state.pageSize;
        const desc=this.state.desc;
        this.props.fetchAllStrategy({pageSize, pageNum, desc});
    }
    renderSelect(){
        const selectItem=[
            {title:"订阅数量"},
            {title:"评分策略"},
            {title:"累计收益"},
            {title:"年化收益"}
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
        return this.props.strategy_all.data.map((item, index)=>{
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
                            <div className="strategy-chart g-mt-20" id={`main1${index}`} style={{height:"180px"}}></div>
                        </div>
                    </Link>
                </li>
            );
        });
    }

    render(){
        const totalNum = this.props.strategy_all && this.props.strategy_all.rowCount;
        if(this.props.strategy_all===null){
            return(<div></div>);
        }
        return(
            <div className="strategy-all-content clearfix">
                <div className="strategy-all-content-filtrate g-py-20 clearfix">
                    <ul>
                        {this.renderSelect()}
                    </ul>
                    <div className="strategy-all-set pull-right text-center g-px-20">设置</div>
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
        strategy_all:state.strategy.strategy_all
    };
}
export default connect(mapStateToProps, {fetchAllStrategy})(StrategyAll);