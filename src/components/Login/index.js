import React, {Component} from 'react';
import {Button, Modal, Input, message} from 'antd'
// import {Card} from 'antd'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import './style.css'

class Login extends Component {
    constructor (props) {
        super(props)
        this.showModal = this.showModal.bind(this)
        this.hideModal = this.hideModal.bind(this)
        this.changePassword = this.changePassword.bind(this)
        this.changeUser = this.changeUser.bind(this)
        this.checkLogin = this.checkLogin.bind(this)
        this.logout = this.logout.bind(this)
        this.state = {
            login: false,
            modal: false,
            user: '',
            password: ''
        }
    }

    showModal () {
        this.setState({
            modal: true
        })
    }
    hideModal () {
        this.setState({
            modal: false
        })
    }
    changeUser(e) {
        // console.log(e.target.value)
        this.setState({
            user: e.target.value
        })
    }
    changePassword(e) {
        this.setState({
            password: e.target.value
        })
    }
    checkLogin () {
        const {user, password} = this.state
        console.log(user, password)
        const url = `http://www.dell-lee.com/react/api/login.json?user=${user}&password=${password}`
        axios.get(url, {
            withCredentials:true
        })
            .then(res => {
                console.log(res)
                const login = res.data.data.login
                if (login) {
                    message.success('登陆成功')
                    this.setState({login:true, modal: false})
                }else {
                    message.error('登录失败')
                }
            })

    }
    logout () {
        axios.get('http://www.dell-lee.com/react/api/logout.json', {
            withCredentials: true
        })
            .then(res => {
                const data = res.data.data
                if (data.logout) {
                    message.success('退出成功')
                    this.setState({
                        login: false
                    });
                    // console.log(this.props)
                    this.props.history.push('/')
                }
            })
    }
    render () {
        const {login}  = this.state;
        return (
            <div className="login">
                {
                    login?
                    <Button type="primary" 
                    size="large" 
                    onClick={this.logout}
                    >
                        退出
                    </Button>:
                    <Button type="primary" size="large"
                    onClick={this.showModal}
                    >
                        登录
                    </Button>
                }
                <Link to='/vip'>
                    <Button type="primary" size="large" style={{marginLeft: '10px'}}
                    >
                        VIP
                    </Button>
                </Link>
                
                <Modal
                title="登录"
                visible={this.state.modal}
                onOk={this.checkLogin}
                onCancel={this.hideModal}
                >
                <Input placeholder="请输入用户名" 
                style={{marginBottom: '10px'}}
                value={this.state.user}
                onChange={this.changeUser}
                />
                <Input placeholder="请输入密码" 
                type="password"
                value={this.state.password}
                onChange={this.changePassword}
                />
                </Modal>
                
            </div>
            
        )
    }
    componentDidMount () {
        axios.get('http://www.dell-lee.com/react/api/isLogin.json', {
            withCredentials: true
        })
            .then(res => {
                const login = res.data.data.login
                this.setState({
                    login
                })
            })
    }
}

export default withRouter(Login)