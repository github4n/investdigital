/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';



class EarningsDay extends Component{
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    renderList(){
        const data=[
            {
                title:2,
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:3,
                aa:"wdnn",
                name:"zhang2",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:1111,
                aa:"wdnn",
                name:"zhang5",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:1111,
                aa:"wdnn",
                name:"zhang8",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }
        ];
        return data.map((item, index)=>{
            console.log(item);
            return(
                <li className="strate-earnings-content-item  strategy-choiceness-item clearfix" key={index}>
                    <div className="col-sm-2">1</div>
                    <div className="col-sm-8 photo">
                        <img  src="/public/img/touxiang.png" alt=""/>
                        <span className="g-pl-10">{item.name}</span>
                    </div>
                    <div className="col-sm-2">
                        {item.huiche}
                    </div>
                </li>
            );
        });
    }

    render(){
        return(
            <div className="strategy-all-content clearfix">
                <div className="strategy-all-content-filtrate g-py-20">
                    <div className="text-center">您当前暂未上榜</div>
                    <hr/>
                </div>
                <div className="clearfix">
                    <ul className="clearfix">
                        {this.renderList()}
                    </ul>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}

export default connect(mapStateToProps, {})(EarningsDay);