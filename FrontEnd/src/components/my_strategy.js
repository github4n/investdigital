/**
 * Created by zhangxiaojing on 2017/12/15.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './common/header-all';
import {Table, Pagination} from 'nl-design';
import {fetchUserStrategy} from '../actions/strategy';

class MyStrategy extends Component{
    constructor(props) {
        super(props);
        this.state={
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
    render(){
        const columns = [{
            title: '名称',
            key: 'title',
            headerProps: {className: 'header-style'},
            dataStyle: { fontSize: '14px', lineHeight:"3.428571"},
            render: (id) => {
                return <span>{id}</span>;
            }
        }, {
            title: '分类',
            key: 'strategyType',
            headerProps: {className: 'header-style'},
            dataStyle: { fontSize: '14px', lineHeight:"3.428571"},
        }, {
            title: '备注',
            key: 'description',
            headerProps: {className: 'header-style'},
            dataStyle: { fontSize: '14px', lineHeight:"3.428571", color:"#4374F9"},
        }, {
            title: '最后修改时间',
            key: 'lastUpdateTime',
            headerProps: {className: 'header-style'},
            dataStyle: { fontSize: '14px', lineHeight:"3.428571"},
        }, {
            title: '操作',
            key: 'action',
            headerProps: {className: 'header-style'},
            dataStyle: { fontSize: '14px', lineHeight:"3.428571"},
            render: (id, data) => {
                return(
                    <span>
                        <a className="g-px-20 g-mr-20 strategy-table-btn">开始模拟交易</a>
                        <a className="g-px-20 strategy-table-btn">删除</a>
                    </span>
                );
            },
        }];
        const style = {
            tableProps: { className: 'no-striped text-center'},
        };
        const totalNum = this.props.strategy_user && this.props.strategy_user.rowCount;
        if(this.props.strategy_user===null){
            return(<div className="text-center h3">loading</div>);
        }
        const data=this.props.strategy_user.data;
        data.map((item, index)=>{
            item.lastUpdateTime == new Date(item.lastUpdateTime).toLocaleDateString();
        });
        return(
            <div>
                <Header/>
                <div className="container my-strategy g-py-30">
                    <div className="top">
                        <div>
                            <span className="g-font-size-20 g-mr-20">策略列表</span>
                            <span className="member text-center g-px-20">高级数据会员服务</span>
                        </div>
                        <div className="g-py-20">
                            <div className="strategy-all-set text-center g-px-20 g-mr-10">创建新策略</div>
                            <div className="strategy-all-set text-center g-px-20 g-mr-10">向导式策略生成器</div>
                            <input className="strategy-input pull-right g-px-10" type="text" placeholder="搜索"/>
                        </div>

                    </div>
                    <div className="g-mt-20">
                        <Table columns={columns} dataSource={data} tableStyle={style.tableStyle} tableClass={style.tableProps} />
                    </div>
                    <div className="strategy-table-pagination">
                        <Pagination  defaultPageSize={this.state.pageSize} total={totalNum}/>
                    </div>
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
export default connect(mapStateToProps, {fetchUserStrategy})(MyStrategy);