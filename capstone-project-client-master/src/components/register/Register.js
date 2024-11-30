import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinners from '../../utils/Spinner';
const Register = () => {



    const [loading, setLodiing] = useState(false)

    const navigate = useNavigate()

    const sumitHandeler = async (value) => {
        try {

            await axios.post('https://money-bakend.onrender.com/register', value)

            message.success('Register sussess')
            setLodiing(true)

            navigate('/login')
        } catch (error) {
            message.error("invalid email or password")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }

    }, [navigate])

    return (
        <div className='register-body'>
            {loading
                ? <Spinners /> :
                <div className='register'>

                    <Form

                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={sumitHandeler}
                        autoComplete="off"
                        className='input-filed form-register'
                        layout='vertical'
                    >
                        <h1 className='text-white' >Register</h1>
                        <Form.Item
                            className='input'
                            label="Username"
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className='' />
                        </Form.Item>
                        <Form.Item
                            className='input'
                            label="Email"
                            name="email"

                            rules={[{ required: true, message: 'Please input your email!', }, { type: 'email' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            className='input'
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <button type="primary" htmlType="submit" className='btn_login'>
                                Register
                            </button>
                        </Form.Item>
                        <div className='d-flex mb-2' >
                            <Link to='/login' className='link'>Alredey register ? check Here to login</Link>
                        </div>

                    </Form>
                </div>}
        </div>
    )
}

export default Register
