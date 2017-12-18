/**
 * Created by zhangxiaojing on 2017/12/12.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pagination} from 'nl-design';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class MessageBoard extends Component{
    constructor(props) {
        super(props);
        this.state={
            pageSize:10
        };
    }
    componentWillMount() {

    }
    renderList(){
        const data=[
            {
                title:"罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款",
                aa:"wdnn",
                name:"zhang",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:"罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款",
                aa:"wdnn",
                name:"zhang2",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:"罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款",
                aa:"wdnn",
                name:"zhang5",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }, {
                title:"罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款sjfb可就是被罚款被罚款 v部分额办法被罚款",
                aa:"wdnn",
                name:"zhang8",
                youyi:"23%",
                huiche:"23%",
                dingyue:"12%",
                time:"2017-6-30"
            }
        ];
        return data.map((item, index)=>{
            // console.log(item);
            return(
                <li className="message-board-item g-py-20 g-mx-20 clearfix" key={index}>
                    <div className="col-sm-2 photo">
                        <img src="/public/img/touxiang.png" alt=""/>
                    </div>
                    <div className="col-sm-8">
                        <span>{item.name}</span>
                        <div>{item.title}</div>
                    </div>
                    <div className="col-sm-2">
                        {item.time}
                    </div>
                </li>
            );
        });
    }
    render(){
        return(
            <div className="id-boxshadow clearfix g-py-20">
                <ul className="message-board clearfix">
                    <li className="title g-px-20">留言板</li>
                    <li className="col-sm-12">
                        <ul>
                            {this.renderList()}
                        </ul>
                    </li>
                </ul>
                <div className="g-my-30">
                    <Pagination  defaultPageSize={this.state.pageSize} total={100}/>
                </div>
                <div className="col-sm-12">
                    <div className="g-mx-20">
                        <ReactQuill theme="snow" value={ this.state.text } onChange={(val)=>{this.setState({text: val});}}/>
                        <div className="btn pull-right strategy-btn clearfix g-mt-20">确认提交</div>
                    </div>
                </div>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {

    };
}
export default connect(mapStateToProps, {})(MessageBoard);