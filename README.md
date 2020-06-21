# 用React打造英语新闻小项目

下载依赖

```
npm install
```

运行服务create-react-app所提供的服务

```
npm run start
```

## 你可能想知道的一些细节

### react可以直接import图片

```js
import logo from './logo.png'
//调用
<img src={logo}></img>
```

### jsx占位符

```jsx
<fragment></fragment>
```

### 自定义组件，第三方插件，图片，css文件等都是通过CommonJs模块化语法引入

```js
import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom'
import logo from './logo.png';
import { Menu } from 'antd';
import axios from 'axios'
import './style.css';
```

### 使用路由

```js
import {BrowserRouter, Rounte} from 'react-router-dom'
import List from './containers/List'
import Detail from './containers/Detail'
```

```jsx
<BrowserRouter> 
    <Fragment>
    	<Route path="/" component={List} />
		<Route path="/detail" component={Detail} />  
    </Fragment>
</BrowserRouter>
```

`<BrowserRouter>` 里边只能包裹一个元素所以用`<Fragment>`；

但是/detail这个路径两个路由都能命中，所以引入以下组件`Switch`

有`<Switch>`标签，则其中的`<Route>`在路径相同的情况下，只匹配第一个，这个可以避免重复匹配；

```js
import {BrowserRouter, Rounte, Switch} from 'react-router-dom'
import List from './containers/List'
import Detail from './containers/Detail'
```

```jsx
<BrowserRouter> 
    <Switch>
        <Route path="/detail" component={Detail} />  
    	<Route path="/" component={List} />
    </Switch>
</BrowserRouter>
```

这样就可以进入正确的路由了

### 关于目录的层级

公用的组件我们一般放在根目录下的components下

使用组件时要注意名字之间的冲突

### 点击跳转

使用`link`组件

```jsx
<Menu.Item key={item.id} icon={this.state.icons[item.id - 1]}>
    <Link to='/ccc'>
        {item.title}    
    </Link>
</Menu.Item>
```

然后有一个报错，会让新手抓狂哦

`Error: Invariant failed: You should not use <Link> outside a <Router>`

注意的点就是让你在使用Link标签的子组件（我这里是`<AppHeader />`）位于父组件`<browserRounter>`内,

```jsx
<BrowserRouter>
        <Layout className="container">
          <Header className="header">
            <AppHeader />
          </Header>
          <Content className="content">
              <Switch>
                <Route path="/detail" component={Detail}/>  
                <Route path="/" component={List}/>     
              </Switch> 
          </Content>
          <Footer className="footer" dangerouslySetInnerHTML={{__html: footerWord}}></Footer>
        </Layout>
      </BrowserRouter>
```

### 使用动态路由获取不同列表的内容

```jsx
{/*header item*/}
<Link to={`/${item.id}`}>
    {item.title}    
</Link>

{/*路由控制界面，以动态id获取后传递给List组件*/}
<Route path="/:id?" component={List}/>   
```

`/:id?`表示接收一个参数作为id的值，?表示可传可不传

```js
// List 通过props属性获得传过来的值
console.log(this.props.match.params.id)
```

然后在发送ajax请求的时候你可以通过queryString的方式传递值过去

但你可能会遇到这样的问题：首次加载页面时发送了ajax请求，之后点击导航栏就没反应了。原因涉及到两个生命周期函数

```js
componentDidMount () {
    const id = this.props.match.params.id
    axio.get('http://www.dell-lee.com/react/api/list.json?id=' + id)
        .then(res => {
        console.log(res.data.data)
        this.setState({
            data: res.data.data
        })
    })
}
componentWillReceiveProps (nextProps) {
    console.log(nextProps)
}
```

`componentDidMount`首次挂载的时候执行，之后不再执行

`componentWillReceiveProps`它的props属性改变时会执行，接收一个参数，改变后的props值



### jsx语法

在jsx中使用js表达式记得要加{}

如果想把后端接收到的数据渲染成html

```jsx
<Card title={this.state.title}>
	<div dangerouslySetInnerHTML={{__html: this.state.content}}</div>
</Card>
```



### 登录/注册

关键点数据没有Vue那样的双向绑定，只能通过`this.setState({})`来进行改变数据

#### axios中的withCredentials是干嘛的？

开启`withCredentials`后，服务器才能拿到你的`cookie`，当然后端服务器也要设置允许你获取你开启了才有用。

文档的描述是 “表示跨域请求时是否需要使用凭证”。

这个“凭证”是在withCredentials开启时自动生成并保存在cookie中然后在http请求的时候带上

### 路由权限

要用到路由，要实现页面间的跳转，但是我的组件却不在`<Route/>`中，调动`withRouter`

```js
import {withRouter} from 'react-router-dom'

class Login extends Component {
    //...
}
export default withRouter(Login)
```

这样在以上组件中`this.props`就会携带路由相关的内容，否则，`this.props`为空对象

### 关于React进阶知识

Redux Flux