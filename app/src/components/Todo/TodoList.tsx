import React, { FC, useState, useEffect, ChangeEvent, KeyboardEvent } from 'react'
import { inject } from 'mobx-react'
import message from '@components/Message'
import _request from '~/utils/request'
import classNames from 'classnames'

import { Item, todoProps } from './index.d'

const TodoList = ({ users }) => {
    const [list, setList] = useState<Item[]>([])
    const [todos, setTodos] = useState('')
    const [activeKey, setActiveKey] = useState('todo')
    const [name, setName] = useState('')
    // console.log(users)

    // const [user, setUser] = useState({} as User)

    useEffect(() => {
      // console.log(localStorage.getItem('demo-token'))
      if (localStorage.getItem('demo-token')) {
        getTodoList()
        getMe()
      }
    }, [])

    const todoRender = (data: Item[]) => {
        const todos = data.filter(x => !x.status)
        return (
            <ul className="list-decimal bg-gray-200 rounded">
              {
                todos.length ?
                todos.map((x, idx) => (
                  <li key={idx} className="flex justify-between p-2 hover:bg-blue-300">
                    <span>{x.content}</span>
                    <div>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" onClick={() => handleFinish(x)}>完成</button>
                      <button className="bg-red-500 hover:bg-blue-700 text-white py-1 px-2 ml-1 rounded-full" onClick={() => handleDelete(x)}>删除</button>
                    </div>
                  </li>
                ))
                :
                <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                  <p>There is nothing</p>
                </div>
              }
            </ul>
        )
    }
    const fininshRender = (data: Item[]) => {
        const finished = data.filter(x => x.status)
        return (
            <ul className="list-decimal bg-gray-200 rounded">
              {
                finished.length ?
                finished.map((x, idx) => (
                  <li key={idx} className="flex justify-between p-2 hover:bg-blue-300">
                    <span>{x.content}</span>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-full" onClick={() => handleBack(x)}>还原</button>
                  </li>
                ))
                :
                <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                  <p>There is nothing</p>
                </div>
              }
            </ul>
        )
    }

    const handleDelete = async ({ id }: { id: number }) => {
        try {
            await _request('delete', `/api/todo/${id}`)
            message.info('任务删除')
            getTodoList()
        } catch (e) {
            console.log(e)
            message.error('删除失败')
        }
    }

    const handleFinish = ({ id, status }: { id: number, status: boolean | number }) => {
        const obj = {
            id: id,
            status: !status
        }
        _request('put', '/api/todo', JSON.stringify(obj)).then(() => {
            message.success('任务完成')
            getTodoList()
        }).catch(() => {
            message.error('任务完成失败')
        })
    }

    const handleBack = ({ id, status }: { id: number, status?: boolean | number }) => {
        const obj = {
            id: id,
            status: !status
        }
        _request('put', '/api/todo', JSON.stringify(obj)).then(() => {
            message.success('任务还原')
            getTodoList()
        }).catch(() => {
            message.error('任务还原失败')
        })
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        setTodos(value)
    }

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (todos === '') {
          return
        } else {
            const obj = {
                status: false,
                content: todos
            }
            addTodo(obj)
        }
        setTodos('')
      }
    }

    const getTodoList = async () => {
        try {
            const data = await _request<Item[]>('get', `/api/todo`)
            setList(data)
        } catch (error) {
            console.log(error)
        }
    }

    const getMe = async () => {
      try {
        const data = await _request<{ id: number, name: string }>('get', '/auth/me')
        console.log(data)
      } catch (e) {
        message.error(e)
      }
    }

    const addTodo = (data: todoProps) => {
        _request('post', '/api/todo', JSON.stringify(data)).then(() => {
            message.success('任务添加')
            getTodoList()
        }).catch((error) => {
            console.log(error.response)
        })
    }

    const cla = 'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold'
    const active = 'border-l border-t border-r rounded-t'


    return (
        <div className="w-1/2">
            <p className="text-lg mb-2">欢迎: {name}! 你的待办事项是:</p>

            <input name="todos" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-base" type="text" placeholder="Add Todo" value={todos} onChange={handleChange} onKeyDown={handleKeydown} />

            <ul className="flex border-b mt-4 mb-2">
                <li className="-mb-px mr-1" onClick={() => setActiveKey('todo')}>
                    <a className={
                      classNames(cla, {
                        [active]: activeKey === 'todo'
                      })
                    }>待办事项</a>
                </li>
                <li className="mr-1" onClick={() => setActiveKey('finished')}>
                    <a className={
                      classNames(cla, {
                        [active]: activeKey === 'finished'
                      })
                    }>已完成事项</a>
                </li>
            </ul>
            {
              activeKey === 'todo' ?
              todoRender(list) : null
            }
            {
              activeKey === 'finished' ?
              fininshRender(list) : null
            }
        </div>
    )
}

export default inject('users')(TodoList)
