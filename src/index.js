import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Layout } from 'antd';
import AppHeader from './components/header/index'
import List from './containers/List'
import Detail from './containers/Detail'
import Login from './components/Login'
import Vip from './containers/Vip'


import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './style.css';
const { Header, Footer, Content } = Layout;



class App extends Component {
  render () {
    const footerWord = "@copyright Hlc 2020<br/>重庆大学"
    return (
      <BrowserRouter>
        <Layout className="container">
          <Header className="header">
            <AppHeader />
            
          </Header>
          <Content className="content">
              <Login />
              <Switch>
                <Route path="/vip" component={Vip}/> 
                <Route path="/detail/:id" component={Detail}/>  
                <Route path="/:id?" component={List}/>   
                
              </Switch> 
          </Content>
          <Footer className="footer" dangerouslySetInnerHTML={{__html: footerWord}}></Footer>
        </Layout>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);