import React, { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
// import { Input, Button, message } from 'antd';
import message from '@components/Message'
import _request from '~/utils/request'
import Particles from 'particlesjs'

export interface LoginProps {
    handleSubmit?: (event: React.MouseEvent) => void;
}

const Login: FC<LoginProps> = () => {
    const history = useHistory()
    // const location = useLocation()

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
      Particles.init({
        selector: '.background',
        color: '#dedede',
        sizeVariations: 12,
        maxParticles: 100,
        speed: 0.7
      })
    }, [])

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
        <div className="w-full h-full flex justify-center">


          <section className="w-2/12 text-center z-10">
            <header className="text-lg mb-3 font-bold">
              React Demo
            </header>
            <input name="name" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-base" type="text" placeholder="Account" value={name} onChange={handleChange}></input>

            <input name="password" className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal text-base mt-4" type="password" placeholder="Password" value={password} onChange={handleChange}></input>

            <button className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-2 px-4 rounded mt-4" onClick={handleSubmit}>Submit</button>
          </section>

          <canvas className="background absolute top-0"></canvas>
        </div>
      );
}

export default Login
