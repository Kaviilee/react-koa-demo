import jwt from 'jsonwebtoken'
import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import { Tabs, Input, Button, message, List } from 'antd'
import _request from '~/utils/request'
import { useHistory } from 'react-router-dom'

const { TabPane } = Tabs
const { Search } = Input

import { Item, todoProps } from './index.d'

const TodoList: FC = () => {
    const [list, setList] = useState([])
    const [todos, setTodos] = useState('')
    const [activeKey, setActiveKey] = useState('todo')
    const [name, setName] = useState('')
    const [id, setId] = useState(0)

    const history = useHistory()
    // const [user, setUser] = useState({} as User)

    useEffect(() => {
        const userInfo = getUserInfo()
        if (userInfo) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const { name, id } = userInfo
            setName(name)
            setId(id)
        }
        getTodoList(id)
    }, [id])

    const todoRender = (data: Item[]) => {
        const todos = data.filter(x => !x.status)
        return (
            <List
                itemLayout="horizontal"
                dataSource={todos}
                renderItem={
                    (item, index) => (
                        <List.Item
                            actions={
                                [
                                    <Button key="finish" size="small" type="primary" onClick={() => handleFinish(item)}>完成</Button>,
                                    <Button key="delete" size="small" danger onClick={() => handleDelete}>删除</Button>
                                ]
                            }
                        >
                            <div>{ index + 1 }. { item.content }</div>
                        </List.Item>
                    )
                }
            ></List>
        )
    }
    const fininshRender = (data: Item[]) => {
        const finished = data.filter(x => x.status)
        return (
            <List
                itemLayout="horizontal"
                dataSource={finished}
                renderItem={
                    (item, index) => (
                        <List.Item
                            actions={
                                [
                                    <Button key="back" size="small" type="primary" onClick={() => handleBack(item)}>还原</Button>
                                ]
                            }
                        >
                            <div>{ index + 1 }. { item.content }</div>
                        </List.Item>
                    )
                }
            ></List>
        )
    }

    const handleDelete = async ({ user_id, id }: { user_id: number, id: number }) => {
        try {
            await _request('delete', `/api/todo/${user_id}/${id}`)
            message.info('任务删除')
            getTodoList(user_id)
        } catch (e) {
            console.log(e)
            message.error('删除失败')
        }
    }

    const handleFinish = ({ id, user_id, status }: { id: number, user_id: number, status: boolean | number }) => {
        const obj = {
            id: id,
            user_id: user_id,
            status: !status
        }
        _request('put', '/api/todo', JSON.stringify(obj)).then(() => {
            message.success('任务完成')
            getTodoList(user_id)
        }).catch(() => {
            message.error('任务完成失败')
        })
    }

    const handleBack = ({ id, user_id, status }: { id: number, user_id: number, status?: boolean | number }) => {
        const obj = {
            id: id,
            user_id: user_id,
            status: !status
        }
        _request('put', '/api/todo', JSON.stringify(obj)).then(() => {
            message.success('任务还原')
            getTodoList(user_id)
        }).catch(() => {
            message.error('任务还原失败')
        })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setTodos(value)
    }

    const handleInput = (value: string) => {
        if (value === '') {
            return
        } else {
            const obj = {
                status: false,
                content: value
            }
            addTodo(obj)
        }
        setTodos(value)
    }

    const getUserInfo = () => {
        const token = sessionStorage.getItem('demo-token')
        if (token) {
            const decode = jwt.decode(token)
            return decode
        }
        return null
    }
    const getTodoList = async (id: number) => {
        try {
            const data = await _request<Item[]>('get', `/api/todo/${id}`)
            setList(data)
        } catch (error) {
            // if (error.status === 401) {
            //     history.push('/')
            // }
            console.log(error)
        }
    }

    const addTodo = (data: todoProps) => {
        _request('post', '/api/todo', JSON.stringify(data)).then(() => {
            message.success('任务添加')
            getTodoList(id)
        }).catch((error) => {
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
