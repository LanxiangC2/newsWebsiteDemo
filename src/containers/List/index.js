import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {List} from 'antd';
import axio from 'axios'

class PageList extends Component {
    constructor (props) {
        super(props);
        this.state = {
            data: []
        }
    }
   
    render () {
        return (
            <List
            style={{background: '#fff'}}
            borderd="true"
            dataSource={this.state.data}
            renderItem={item => (
                <List.Item style={{paddingLeft: '10px'}}>
                    <Link to={`/detail/${item.id}`}>
                        {item.title}    
                    </Link>
                </List.Item>
            )}
            />
        )
    }

    componentDidMount () {
        const id = this.props.match.params.id
        let url = 'http://www.dell-lee.com/react/api/list.json'
        if (id) {
            url = url + '?id=' + id
        }
        axio.get(url)
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    data: res.data.data
                })
            })
    }
    UNSAFE_componentWillReceiveProps (nextProps) {
        // console.log(nextProps.match.params.id)
        const id = nextProps.match.params.id
        axio.get('http://www.dell-lee.com/react/api/list.json?id=' + id)
            .then(res => {
                console.log(res.data.data)
                this.setState({
                    data: res.data.data
                })
            })
    }
} 

export default PageList