import jwt from 'jsonwebtoken'
import React, { useState, useEffect } from 'react'
import { Tabs, Input, Button, message } from 'antd'
// import axios from '../axios'
import _request from '~/utils/request'
export const { TabPane } = Tabs
export const { Search } = Input

export interface Item {
    content: string,
    id: number,
    status: number | boolean,
    user_id: number
}

export interface TodoItemProps {
    itemInfo: Item;
    index: number;
    onFinish: (item: Item) => void;
    onDelete: (item: Item) => void;
}

export interface FinishProps {
    itemInfo: Item;
    index: number;
    onBack: (item: Item) => void;
    // [key: string]: any
}
export type User = {
    name: string
    id: number
}
export const TodoItem: React.SFC<TodoItemProps> = (props) => {

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
export const FinishedItem: React.SFC<FinishProps> = (props) => {

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
        if (id) getTodoList(id)
    }, [id])

    const todoRender = (data: Item[]) => {
        return data.map((item: Item, index: number) => {
            return !item.status && <TodoItem key={index} index={index} itemInfo={item} onFinish={ (item) => handleFinish(item)} onDelete={handleDelete}></TodoItem>
        })
    }
    const fininshRender = (data: Item[]) => {
        if (data.some((x: Item) => x.status)) {
            return data.map((item: Item, index: number) => {
                return <FinishedItem key={index} index={index} itemInfo={item} onBack={handleBack}></FinishedItem>
            })
        } else {
            return <div>无已完成事项</div>
        }
    }

    const handleDelete = async ({ user_id, id }: { user_id: number, id: number }) => {
        try {
            await _request(`/api/todo/${user_id}/${id}`, {
                method: 'DELETE'
            })
            message.info('任务删除')
            getTodoList(user_id)
        } catch (e) {
            console.log(e)
            message.error('删除失败')
        }
        // .then((res) => {
        //     console.log(res)
        //     if (res.code === 204) {
        //         message.info('任务删除')
        //         getTodoList(user_id)
        //     }
        // }).catch(() => {
        //     message.error('删除失败')
        // })
    }

    const handleFinish = ({ id, user_id, status }: { id: number, user_id: number, status: boolean | number }) => {
        const obj = {
            id: id,
            user_id: user_id,
            status: !status
        }
        _request('/api/todo', {
            method: 'PUT',
            body: JSON.stringify(obj)
        }).then(() => {
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
        _request('/api/todo', {
            method: 'PUT',
            body: JSON.stringify(obj)
        }).then(() => {
            message.success('任务还原')
            getTodoList(user_id)
        }).catch(() => {
            message.error('任务还原失败')
        })
    }

    const  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setTodos(value)
    }

    const  handleInput = (value: string) => {
        // console.log(value)
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
            const data = await _request(`/api/todo/${id}`, {
                method: 'GET'
            })
            setList(data)
        } catch (error) {
            console.log(error)
        }
        // _request(`/api/todo/${id}`, {
        //     method: 'GET'
        // }).then((res: any) => {
        //     setList(res.data)
        // }).catch((e: any) => {
        //     console.log(e.response)
        // })
    }

    const addTodo = (data: any) => {
        _request('/api/todo', {
            method: 'POST',
            body: JSON.stringify(data)
        }).then((res: any) => {
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
