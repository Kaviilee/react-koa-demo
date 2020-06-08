import React, { useState, useRef, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Input, Button, message } from 'antd';
import axios from 'axios'

export type User = {
    name: string,
    password: string
}

const Login: React.FC = () => {
    const history = useHistory()
    const location = useLocation()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
        //   alert('提交的名字: ' + this.state.name);
        const info = {
            name: name,
            password: password
        }
        axios.post('/auth/user', info)
          .then((res: any) => {
            if (res.data.success) {
              sessionStorage.setItem('demo-token', res.data.token)
              message.success('登录成功')
              history.push({
                  pathname: '/todo'
              })
            } else {
              message.error(res.data.info)
              sessionStorage.setItem('demo-token', null)
            }
          }).catch((err: any) => {
            message.error('请求错误！')
            console.log(err.response)
            sessionStorage.setItem('demo-token', null)
          })
        event.preventDefault();
      }

      function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name
        switch (name) {
            case 'name':
                setName(value)
                break
            case 'password':
                setPassword(value)
                break
        }
    }

      return (
        <form onSubmit={handleSubmit}>
          <label>
            <Input name="name" type="text" placeholder="账户" value={name} onChange={handleChange} />
          </label>
          <label>
            <Input name="password" type="password" placeholder="密码" value={password} onChange={handleChange} />
          </label>
          <Button onClick={handleSubmit} type="primary">登录</Button>
        </form>
      );
}

export default Login
