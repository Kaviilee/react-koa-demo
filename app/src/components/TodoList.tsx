import jwt from 'jsonwebtoken'
import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Input, Button, message } from 'antd'
import axios from '../axios'
const { TabPane } = Tabs
const { Search } = Input

type Item = {
    content: string,
    id: number,
    status: number | boolean,
    user_id: number
}
type Props = {
    itemInfo: Item,
    index: number,
    [key: string]: any
}
const TodoItem: React.SFC<Props> = (props) => {

    function handleFinish() {
        props.onFinish(props.itemInfo)
    }
    function handleDelete() {
        props.onDelete(props.itemInfo)
    }

    return (
        <div className="item">
            <span className="text">
                { props.index + 1 }. { props.itemInfo.content }
            </span>
            <span className="pullRight">
                <Button size="small" type="primary" style={{ marginRight: '6px' }} onClick={handleFinish}>完成</Button>
                <Button size="small" danger onClick={handleDelete}>删除</Button>
            </span>
        </div>
    )
}
const FinishedItem: React.SFC<Props> = (props) => {

    function handleBack() {
        props.onBack(props.itemInfo)
    }

    if (props.itemInfo.status) {
        return (
            <div className="item">
                <span className="text finished">
                    {props.index + 1}. {props.itemInfo.content}
                </span>
                <span className="pullRight">
                    <Button size="small" type="primary" onClick={handleBack}>还原</Button>
                </span>
            </div>
        )
    } else {
        return null
    }

}
const TodoList: React.FC = () => {
    const [list, setList] = useState([])
    const [todos, setTodos] = useState('')
    const [activeKey, setActiveKey] = useState('todo')
    const [name, setName] = useState('')
    const [id, setId] = useState(0)

    useEffect(() => {
        const userInfo = getUserInfo()
        setName(userInfo.name)
        setId(userInfo.id)
        if (id) getTodoList(id)
    }, [id])

    function todoRender(data: Item[]) {
        return data.map((item: Item, index: number) => {
            return !item.status && <TodoItem key={index} index={index} itemInfo={item} onFinish={handleFinish} onDelete={handleDelete}></TodoItem>
        })
    }
    function fininshRender(data: Item[]) {
        if (data.some((x: Item) => x.status)) {
            return data.map((item: Item, index: number) => {
                return <FinishedItem key={index} index={index} itemInfo={item} onBack={handleBack}></FinishedItem>
            })
        } else {
            return <div>无已完成事项</div>
        }
    }

    const handleDelete = ({ user_id, id }: { user_id: number, id: number }) => {
        axios.delete(`/api/todo/${user_id}/${id}`).then(() => {
            message.info('任务删除')
            getTodoList(user_id)
        }).catch(() => {
            message.error('删除失败')
        })
    }

    function handleFinish({ id, user_id, status }: { id: number, user_id: number, status: boolean }) {
        const obj = {
            id: id,
            user_id: user_id,
            status: !status
        }
        axios.put('/api/todo', obj).then(() => {
            message.success('任务完成')
            getTodoList(user_id)
        }).catch(() => {
            message.error('任务完成失败')
        })
    }

    function handleBack({ id, user_id, status }: { id: number, user_id: number, status: boolean }) {
        const obj = {
            id: id,
            user_id: user_id,
            status: !status
        }
        axios.put('/api/todo', obj).then(() => {
            message.success('任务还原')
            getTodoList(user_id)
        }).catch(() => {
            message.error('任务还原失败')
        })
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value } = event.target
        setTodos(value)
    }

    function handleInput(value: string) {
        // console.log(value)
        if (value === '') {
            return
        } else {
            let obj = {
                status: false,
                content: value
            }
            addTodo(obj)
        }
        setTodos(value)
    }

    function getUserInfo() {
        const token = sessionStorage.getItem('demo-token')
        if (token) {
            const decode = jwt.decode(token)
            return decode
        }
        return null
    }
    function getTodoList(id: number) {
        // const id = this.id
        // console.log()
        axios.get(`/api/todo/${id}`).then((res: any) => {
            setList(res.data)
        }).catch((e: any) => {
            console.log(e.response)
        })
    }

    function addTodo(data: any) {
        axios.post('/api/todo', data).then((res: any) => {
            message.success('任务添加')
            getTodoList(id)
        }).catch((error: any) => {
            console.log(error.response)
        })
    }

    return (
        <div>
            <span>欢迎: {name}! 你的待办事项是:</span>
            <Search placeholder="请输入待办事项" type="text" value={todos} onChange={handleChange} onSearch={(value: string) => handleInput(value)}></Search>
            <Tabs activeKey={activeKey} onChange={(value: string) => setActiveKey(value)}>
                <TabPane tab="待办事项" key="todo">
                    <div className="todoList">
                        { todoRender(list) }
                    </div>
                </TabPane>
                <TabPane tab="已完成事项" key="finished">
                    <div className="todoList">
                        { fininshRender(list) }
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default TodoList
