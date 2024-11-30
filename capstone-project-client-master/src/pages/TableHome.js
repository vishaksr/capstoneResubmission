import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'antd';
import moment from 'moment';
const TableHome = ({ frequuency, type }) => {
    const [gettAlltran, setgetsetAlltran] = useState([])

    const getAllTranc = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            console.log(user);
            const res = await axios.post('http://localhost:7000/get-transection', {
                userid: user.id,
                type,

            })
            setgetsetAlltran(res.data.transections)
            console.log(res.data.transections);
        } catch (error) {

        }
    }
    useEffect(() => {
        getAllTranc()
    }, [type])

    console.log(type);
    console.log(frequuency);
    // 
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            render: (text) => <span>{moment(text).format("DD-MM-YYYY")}</span>
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },
        {
            title: 'Type',
            dataIndex: 'type',
        },
        {
            title: 'Category',
            dataIndex: 'catagory',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Action',
            dataIndex: '',
        },

    ];
    const len = gettAlltran.length
    console.log(len);


    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    // const onSelectChange = (newSelectedRowKeys) => {
    //     console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    //     setSelectedRowKeys(newSelectedRowKeys);
    // };
    console.log(gettAlltran);
    const hasSelected = selectedRowKeys.length > 0;
    return (
        <div>
            <div style={{ marginBottom: 16, }}>
            </div>
            <Table className='c' columns={columns} dataSource={gettAlltran} />
        </div>
    )
}

export default TableHome
