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
        this.props.onFinish(this.props.index)
    }
    handleDelete = () => {
        this.props.onDelete(this.props.index)
    }
    render() {
        const { index, content } = this.props
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
        this.props.onBack(this.props.index)
    }
    render() {
        const { index, content } = this.props
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
            return !item.status && <TodoItem key={index} index={index} content={item.content} onFinish={this.handleFinish} onDelete={this.handleDelete}></TodoItem>
        })
    }
    fininshRender = data => {
        return data.map((item, index) => {
            return item.status && <FinishedItem key={index} index={index} content={item.content} onBack={this.handleBack}></FinishedItem>
        })
    }
    constructor(props) {
        super(props)
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

    handleDelete = index => {
        const arr = this.state.list
        arr.splice(index, 1)
        message.info('任务删除')
        this.setState({
            list: arr
        })
    }

    handleFinish = index => {
        const arr = this.state.list
        arr[index].status = true
        this.setState({
            list: arr
        })
        message.success('任务完成')
    }
    
    handleBack = index => {
        const arr = this.state.list
        arr[index].status = false
        this.setState({
            list: arr
        })
        message.info('任务还原')
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
                content: value
            }
            this.addTodo(obj)
            // const arr = this.state.list
            // arr.push(obj)
            // this.setState({
            //     list: arr
            // })
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
        axios.get(`/todo/${1}`).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e.response)
        })
    }

    addTodo = (data) =>{
        axios.post('/todo', data).then(res => {
            console.log(res)
            message.success('任务添加')
        }).catch(error => {
            console.log(error.response)
        })
    }

    render() {
        return (
            <div>
                <span>欢迎: {this.state.name + this.state.id}! 你的待办事项是:</span>
                <Search placeholder="请输入待办事项" type="text" value={this.state.todos} onChange={this.handleChange} onSearch={value => this.handleInput(value)}></Search>
                <Tabs activeKey={this.state.activeKey} onChange={this.handleActiveKeyChange}>
                    <TabPane tab="待办事项" key="todo">
                        <div className="todoList">
                            { this.todoRender(this.state.list) }
                        </div>
                    </TabPane>
                    <TabPane tab="已完成事项" key="finished">
                        { this.fininshRender(this.state.list) }
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}