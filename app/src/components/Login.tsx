import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Button, message } from 'antd';
import _request from '~/utils/request'

export type User = {
    name: string,
    password: string
}

export interface LoginProps {
    handleSubmit?: (event: React.MouseEvent) => void;
}

const Login: React.FC<LoginProps> = () => {
    const history = useHistory()
    // const location = useLocation()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: React.MouseEvent) => {
        const info = {
            name: name,
            password: password
        }
        _request('/auth/user', {
            method: 'POST',
            body: JSON.stringify(info)
        })
          .then((res: any) => {
            if (res.success) {
                sessionStorage.setItem('demo-token', res.token)
                message.success('登录成功')
                history.push({
                    pathname: '/todo'
                })
            } else {
                message.error(res.message  || '请求错误！')
                sessionStorage.removeItem('demo-token')
            }
            // if (res.data.success) {
            //   sessionStorage.setItem('demo-token', res.data.token)
            //   message.success('登录成功')
            //   history.push({
            //       pathname: '/todo'
            //   })
            // } else {
            //   message.error(res.data.info)
            //   sessionStorage.setItem('demo-token', null)
            // }
          }).catch((err: any) => {
            message.error(err.message  || '请求错误！')
            console.log(err)
            sessionStorage.removeItem('demo-token')
          })
        event.preventDefault();
      }

      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        <form>
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
