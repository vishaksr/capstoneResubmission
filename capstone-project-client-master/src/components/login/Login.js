import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinners from '../../utils/Spinner';
const Login = () => {

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',

        },
    };
    const [loading, setLodiing] = useState(false)

    const navigate = useNavigate()

    const sumitHandeler = async (value) => {
        try {
            const user = await axios.post('https://money-bakend.onrender.com/login', value)
            message.success('login sussess')

            localStorage.setItem('user', JSON.stringify({ ...user.data }))
            navigate('/')

        } catch (error) {
            message.error("email or password worng")
        }
    }

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/')
        }

    }, [navigate])


    return (
        <div>
            <div className='register-body'>
                {loading
                    ? <Spinners /> :
                    <div className='register mt-3'>

                        <Form
                            validateMessages={validateMessages}
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
                            <h1 className='text-white mt-3'>Login</h1>
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
                                    Login
                                </button>
                            </Form.Item>
                            <div className='d-flex mb-2' >
                                <Link to='/register' className='link'>Don't have an account ? Register Now</Link>
                            </div>

                        </Form>
                    </div>}
            </div>
        </div >
    )
}

export default Login
