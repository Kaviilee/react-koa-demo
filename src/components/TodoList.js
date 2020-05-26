import jwt from 'jsonwebtoken'
import React from 'react'
import { Tabs, Input, Button, message } from 'antd'
import axios from '../axios'
const { TabPane } = Tabs
const { Search } = Input
class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleFinish = () => {
        this.props.onFinish(this.props.itemInfo)
    }
    handleDelete = () => {
        this.props.onDelete(this.props.itemInfo)
    }
    render() {
        const { index, itemInfo: {content} } = this.props
        return (
            <div className="item">
                <span className="text">
                    { index + 1 }. { content }
                </span>
                <span className="pullRight">
                    <Button size="small" type="primary" style={{ marginRight: '6px' }} onClick={this.handleFinish}>完成</Button>
                    <Button size="small" danger onClick={this.handleDelete}>删除</Button>
                </span>
            </div>
        )
    }
}
class FinishedItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    handleBack = () => {
        this.props.onBack(this.props.itemInfo)
    }
    render() {
        const { index, itemInfo: {content} } = this.props
        return (
            <div className="item">
                <span className="text finished">
                    {index + 1}. {content}
                </span>
                <span className="pullRight">
                    <Button size="small" type="primary" onClick={this.handleBack}>还原</Button>
                </span>
            </div>
        )
    }
}
export default class TodoList extends React.Component {
    todoRender = data => {
        return data.map((item, index) => {
            return !item.status && <TodoItem key={index} index={index} itemInfo={item} onFinish={this.handleFinish} onDelete={this.handleDelete}></TodoItem>
        })
    }
    fininshRender = data => {
        if (data.length) {
            return data.map((item, index) => {
                return item.status && <FinishedItem key={index} index={index} itemInfo={item} onBack={this.handleBack}></FinishedItem>
            })
        } else {
            return <div>无已完成事项</div>
        }
    }
    constructor(props) {
        super(props)
        this.wrapper = React.createRef();
        this.state = {
            name: 'kavii',
            activeKey: 'todo',
            todos: '',
            list: [],
            id: ''
        }
    }

    componentDidMount() {
        const userInfo = this.getUserInfo()
        this.setState({
            name: userInfo.name,
            id: userInfo.id
        })
    }
    componentWillMount() {
        this.getTodoList()
    }

    handleDelete = data => {
        axios.delete(`/api/todo/${data.user_id}/${data.id}`).then(() => {
            message.info('任务删除')
            this.getTodoList()
        }).catch(err => {
            message.error('删除失败')
        })
    }

    handleFinish = data => {
        const obj = {
            id: data.id,
            user_id: data.user_id,
            status: !data.status
        }
        axios.put('/api/todo', obj).then(() => {
            message.success('任务完成')
            this.getTodoList()
        }).catch(err => {
            message.error('任务完成失败')
        })
    }
    
    handleBack = data => {
        const obj = {
            id: data.id,
            user_id: data.user_id,
            status: !data.status
        }
        axios.put('/api/todo', obj).then(() => {
            message.success('任务还原')
            this.getTodoList()
        }).catch(err => {
            message.error('任务还原失败')
        })
    }

    handleActiveKeyChange = activeKey => {
        this.setState({ activeKey })
    }

    handleChange = event => {
        const { value } = event.target
        this.setState({
            todos: value
        })
    }

    handleInput = value => {
        // console.log(value)
        if (value === '') {
            return
        } else {
            let obj = {
                status: false,
                content: value,
                id: this.state.id
            }
            this.addTodo(obj)
        }
        this.setState({
            todos: ''
        })
    }

    getUserInfo = () => {
        const token = sessionStorage.getItem('demo-token')
        if (token) {
            const decode = jwt.decode(token)
            return decode
        }
        return null
    }
    getTodoList = () => {
        const id = this.state.id
        console.log(id)
        axios.get(`/api/todo/${1}`).then(res => {
            this.setState({
                list: res.data
            })
        }).catch(e => {
            console.log(e.response)
        })
    }

    addTodo = (data) =>{
        axios.post('/api/todo', data).then(res => {
            message.success('任务添加')
            this.getTodoList()
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {
        return (
            <div>
                <span>欢迎: {this.state.name}! 你的待办事项是:</span>
                <Search placeholder="请输入待办事项" type="text" value={this.state.todos} onChange={this.handleChange} onSearch={value => this.handleInput(value)}></Search>
                <Tabs activeKey={this.state.activeKey} onChange={this.handleActiveKeyChange}>
                    <TabPane tab="待办事项" key="todo">
                        <div className="todoList">
                            { this.todoRender(this.state.list) }
                        </div>
                    </TabPane>
                    <TabPane tab="已完成事项" key="finished">
                        <div className="todoList">
                            { this.fininshRender(this.state.list) }
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}