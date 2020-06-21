import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import logo from './logo.png';

import { Menu } from 'antd';
import axios from 'axios'
import './style.css';

import {QqOutlined, AppleOutlined,WindowsOutlined,WeiboOutlined,ZhihuOutlined,GithubOutlined} from '@ant-design/icons';

class AppHeader extends Component {
    constructor (props) {
        super(props)
        this.state ={
            list:[],
            icons: [
                <QqOutlined />,
                <AppleOutlined />,
                <WindowsOutlined />,
                <WeiboOutlined />,
                <ZhihuOutlined />,
                <GithubOutlined />
            ]
        }
    }
    getMenuItems(){
        return this.state.list.map(item => {
            return (
                <Menu.Item key={item.id} icon={this.state.icons[item.id - 1]}>
                    <Link to={`/${item.id}`}>
                        {item.title}    
                    </Link>
                </Menu.Item>
            )
        })
    }
    componentDidMount () {
        axios.get('http://www.dell-lee.com/react/api/header.json')
            .then(res=>{
                console.log(res.data.data)
                this.setState({
                    list: res.data.data
                })
            })
    }
    render() {
        return (
            <Fragment>
                <Link to="/">
                    <img src={logo} className='app-header-logo' alt="logo"/>
                </Link>
                <Menu mode="horizontal" className="app-header-menu">

                    {this.getMenuItems()}
                   
                </Menu>
            </Fragment>
            
        )
    }
}

export default AppHeader