import React, { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Input, Button, message } from 'antd';
import _request from '~/utils/request'

export interface LoginProps {
    handleSubmit?: (event: React.MouseEvent) => void;
}

const Login: FC<LoginProps> = () => {
    const history = useHistory()
    // const location = useLocation()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async(event: React.MouseEvent) => {
        const info = {
            name: name,
            password: password
        }
        _request<{ success: boolean, token: string, message?: string }>('post' ,'/auth/user', JSON.stringify(info))
          .then((res) => {
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
          }).catch((err) => {
            message.error(err.statusText || '请求错误！')
            console.log(err.statusText)
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
        <div className="w-2/12">
          {/* <label>
            <Input name="name" type="text" placeholder="账户" value={name} onChange={handleChange} />
          </label>
          <label>
            <Input name="password" type="password" placeholder="密码" value={password} onChange={handleChange} />
          </label>
          <Button onClick={handleSubmit} type="primary">登录</Button> */}

          <input name="name" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-base" type="text" placeholder="Account" value={name} onChange={handleChange}></input>

          <input name="password" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-base mt-4" type="password" placeholder="Password" value={password} onChange={handleChange}></input>

          <button className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
        </div>
      );
}

export default Login
