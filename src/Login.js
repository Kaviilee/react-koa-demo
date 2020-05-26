import React from 'react'
import { Input, Button, message } from 'antd';
import axios from 'axios'
export default class Login extends React.Component {
    constructor(props) {
      super(props);
      this.wrapper = React.createRef();
      this.state = {
          name: '',
          password: ''
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name
        this.setState({
            [name]: value
        });
    }
  
    handleSubmit(event) {
      //   alert('提交的名字: ' + this.state.name);
      const info = {
        name: this.state.name,
        password: this.state.password
      }
      axios.post('/auth/user', info)
        .then(res => {
          if (res.data.success) {
            sessionStorage.setItem('demo-token', res.data.token)
            message.success('登录成功')
            this.props.history.push({
                pathname: '/todo'
            })
          } else {
            message.error(res.data.info)
            sessionStorage.setItem('demo-token', null)
          }
        }).catch(err => {
          message.error('请求错误！')
          console.log(err.response)
          sessionStorage.setItem('demo-token', null)
        })
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <Input name="name" type="text" placeholder="账户" value={this.state.value} onChange={this.handleChange} />
          </label>
          <label>
            <Input name="password" type="password" placeholder="密码" value={this.state.password} onChange={this.handleChange} />
          </label>
          <Button onClick={this.handleSubmit} type="primary">登录</Button>
        </form>
      );
    }
}