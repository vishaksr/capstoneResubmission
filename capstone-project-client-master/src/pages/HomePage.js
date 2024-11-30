import React, { useEffect, useState } from 'react'
import { Layout } from '../components/Layout/Layout'
import { AiOutlineAreaChart, AiFillDelete } from 'react-icons/ai'
import { BsBarChartFill } from 'react-icons/bs'

import { Button, Modal, Form, Input, message, Select, DatePicker, Table } from 'antd';

import axios from 'axios';

import Analyites from '../components/analyites/Analyites';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoaading, setisLoaading] = useState(false)
    const [viewData, setviewData] = useState('table')
    const [type, setType] = useState('all')
    const [editTable, seteditTable] = useState(null)
    const [gettAlltran, setgetsetAlltran] = useState([])

    const showModal = () => {
        setIsModalOpen(true);

    };

    const handleOk = () => {

        setIsModalOpen(false);
        setisLoaading(true)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        getAllTranc()

    }, [type])
    console.log(gettAlltran);
    const getAllTranc = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))

            const res = await axios.post('https://money-bakend.onrender.com/get-transection', {
                userid: user.id,
                type,
            })
            setgetsetAlltran(res.data.transections)
        } catch (error) {
            console.log(error);
        }
    }



    const handelDel = async (id) => {
        console.log({ _id: id });
        try {

            const del = window.confirm(" you want to delete!!")
            if (del) {
                getAllTranc()
                await axios.delete(`https://money-bakend.onrender.com/delete-transection/${id}`)
                message.success('Delete')
            } else {
                message.error('chancel')
            }

        } catch (error) {
            console.log(error);
        }
    }

    const sumitHandeler = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user.id);

            const data = await axios.post('https://money-bakend.onrender.com/add-transection', { ...values, userid: user.id })

            message.success("transction add success")
            console.log(data.data);
            getAllTranc()
            seteditTable(null)
            setIsModalOpen(false);
        } catch (error) {
            message.error("transction add Failed")

        }
    }


    return (
        <div className=''>
            <Layout>
                <div className='d-flex main'>
                    <div className='filters sidebar'>

                        <div>
                            <div className=' '>

                                <div className='charts'>

                                    <div className='chartsicon1 '>
                                        <h5 className='d-flex mt-3' onClick={() => setviewData('table')}> <BsBarChartFill />List</h5>

                                    </div>



                                    <div className='chartsicon1 '>
                                        <h5 className='d-flex mt-3' onClick={() => setviewData('analytics')}>  <AiOutlineAreaChart />Analytics</h5>

                                    </div>



                                </div>

                                <Modal title={editTable ? "Edit " : "Add New"} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={false}>
                                    <Form

                                        name="basic"
                                        style={{ maxWidth: 600 }}
                                        initialValues={{ remember: true, editTable }}
                                        onFinish={sumitHandeler}
                                        autoComplete="off"
                                        className='input-filed'
                                        layout='vertical'
                                    >
                                        <Form.Item
                                            label="Amount"
                                            name="amount"
                                            rules={[{ required: true, message: 'Please enter Amount' }]}
                                        >
                                            <Input type='number' />
                                        </Form.Item>
                                        <Form.Item

                                            label="Type"
                                            name="type"
                                            rules={[{ required: true, message: 'Please select type', }]}

                                        >
                                            <Select>
                                                <Select.Option value="income">Income</Select.Option>
                                                <Select.Option value="expense">Expense</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Category"
                                            name="catagory"
                                            rules={[{ required: true, message: 'Please select one Category', }]}

                                        >
                                            <Select>

                                                <Select.Option value="Salary">Salary</Select.Option>
                                                <Select.Option value="Projet">Projet</Select.Option>
                                                <Select.Option value="Trip">Trip</Select.Option>
                                                <Select.Option value="Shopping">shopping</Select.Option>
                                                <Select.Option value="Fee">Fee</Select.Option>
                                                <Select.Option value="Tax">Tax</Select.Option>
                                                <Select.Option value="Medical">Medical</Select.Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            label="Date"
                                            name="date"
                                            rules={[{ required: true, message: 'Please enter Date', }]}
                                        >
                                            <DatePicker />
                                        </Form.Item>

                                        <Form.Item
                                            label="Description"
                                            name="description"
                                            rules={[{ required: true, message: 'fill it' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item className='text-center'>
                                            <button type="submit" className='btn btn-success btn-sm' onClick={() => getAllTranc} >
                                                Submit
                                            </button>
                                        </Form.Item>
                                    </Form>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className='full__box'>

                        {
                            isLoaading ? <h1>Loginnge</h1> :
                                <div className='table__'>
                                    {viewData === "table" ?
                                        <>
                                            <div className='box'>
                                                <div className='d-flex mt-4 content'>
                                                    <h6>Selet Type</h6>
                                                    <Select value={type} onChange={(values) => setType(values)}>
                                                        <Select.Option value='all'>All</Select.Option>
                                                        <Select.Option value='income'>Income</Select.Option>
                                                        <Select.Option value='expense'>Expence</Select.Option>
                                                    </Select>
                                                </div>

                                                <Button type="primary" className='mt-2' onClick={showModal}>
                                                    Add New
                                                </Button>
                                            </div>
                                            <div className='table'>
                                                <div style={{ marginBottom: 16, }}>
                                                </div>
                                                <table className="table bg-white  ">
                                                    <thead>
                                                        <tr className='bg-primary text-white '>

                                                            <th scope="col">Date</th>
                                                            <th scope="col">Amount</th>
                                                            <th scope="col">Type</th>
                                                            <th scope="col">Catagory</th>
                                                            <th scope="col">Description</th>
                                                            <th scope="col">Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className="table-group-divider">
                                                        {/* <tr>
                                                <th scope="row">1</th>
                                                <td>Mark</td>
                                                <td>Otto</td>
                                                <td>@mdo</td>
                                            </tr> */}
                                                        {
                                                            gettAlltran.map((val, idx) => {
                                                                // const types = gettAlltran.filter(tran => tran.type === "income" && tran.catagory === val)
                                                                // console.log(types);
                                                                return (
                                                                    <tr key={idx}>
                                                                        {/* {console.log(val.type = "income" ? 1 : 4)} */}
                                                                        <td>{moment(val.date).format("DD-MM-YYYY")}</td>
                                                                        <td className='ps-4'>{val.amount}</td>

                                                                        <td className={val.type === "income" ? ` mt-2 rounded-pill badge  text-bg-success badge-sm  py-1` : "badge text-bg-danger mt-2 rounded-pill py-1"}>{val.type}</td>
                                                                        <td>{val.catagory}</td>
                                                                        <td>{val.description}</td>
                                                                        <td ><AiFillDelete className=' delete ' title='delete' onClick={() => handelDel(val._id)} /></td>

                                                                        {/* {console.log(val.type = "expense" ? 1 : 2)} */}
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                        {/* {
                                                                val.type = "income" ? <tr className='text-danger'>{val.type}</tr> : <tr className='text-danger'> {val.type}</tr>
                                                            } */}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                        : <Analyites gettAlltran={gettAlltran} />

                                    }
                                </div>
                        }
                    </div>
                </div>
            </Layout>

        </div>
    )
}

export default HomePage
