
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';



ChartJS.register(ArcElement, Tooltip, Legend);


Chart.register(LinearScale);

const Analyites = ({ gettAlltran }) => {
    // total
    const totalTrancition = gettAlltran.length
    const totalIncometranction = gettAlltran.filter(transaction => transaction.type === 'income')
    const totalExpensetranction = gettAlltran.filter(transaction => transaction.type === 'expense')
    const totalIncomePercent = (totalIncometranction.length / totalTrancition) * 100
    const totalExpensePercent = (totalExpensetranction.length / totalTrancition) * 100


    // 

    const totalTurnover = gettAlltran.reduce(
        (acc, transction) => acc + transction.amount, 0)

    const totalincomeTurnover = gettAlltran.filter((transction) => transction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalEcpensceTurnover = gettAlltran.filter((transction) => transction.type === "expense").reduce((acc, transaction) => acc + transaction.amount, 0)

    const totalIncometurnOverpresent = (totalincomeTurnover / totalTurnover) * 100
    const totalExpenseturnOverpresent = (totalEcpensceTurnover / totalTurnover) * 100


    const catagorys = [
        "Salary",
        "Projet",
        "Trip",
        "Shopping",
        "Fee",
        "Tax",
        "Medical"
    ]



    // ! DoughnutChart.js
    const Transction = {
        labels: [
            'expense',
            'income',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [
                totalExpensetranction.length,
                totalIncometranction.length,
                ,
            ],
            backgroundColor: [
                'red',
                'green',
                'blue'
            ],
            hoverOffset: 4
        }]
    };

    const TurnOver = {
        labels: [
            'expense',
            'income',
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [
                totalEcpensceTurnover,
                totalincomeTurnover,],
            backgroundColor: [
                'red',
                'green'
            ],
            hoverOffset: 4
        }]
    };


    // !
    const bar = catagorys.map((val) => {
        const da = gettAlltran.filter(tran => tran.type === "income" && tran.catagory === val).reduce((acc, tran) => acc + tran.amount, 0)
        return ((da / totalincomeTurnover) * 100).toFixed(0)
    })


    console.log(bar);

    const incombar = {
        labels: ['Salary', 'Projet', 'Trip', 'Shopping', 'Fee', 'Shopping', 'Medical',],
        datasets: [
            {
                label: 'Income',
                data:
                    bar

                ,
                backgroundColor: [
                    'greenyellow',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(01, 262, 235, 1)',
                    'rgba(255, 70, 16, 1)',
                ],

                borderWidth: 1,
            },
        ],
    };

    const exbar = catagorys.map((val) => {
        const da = gettAlltran.filter(tran => tran.type === "expense" && tran.catagory === val).reduce((acc, tran) => acc + tran.amount, 0)
        return ((da / totalincomeTurnover) * 100).toFixed(0)
    })

    const expancebar = {
        labels: ['Salary', 'Projet', 'Trip', 'Shopping', 'Fee', 'Shopping', 'Medical',],
        datasets: [
            {
                label: 'Expence',
                data:
                    exbar

                ,
                backgroundColor: [
                    'red',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(01, 262, 235, 1)',
                    'rgba(255, 70, 16, 1)',
                ],

                borderWidth: 1,
            },
        ],
    };


    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <div className='container '>

            <div className='row doughnut gap-5' >
                <div className='col-lg-5 mt-2'>
                    <h1 className='text-center'>Total Transction : {totalTrancition} </h1>
                    <Doughnut data={Transction} />
                </div>
                <div className='col-lg-5 mt-2'>
                    <h1 className='text-center'>Total TurnOver :  {totalTrancition} </h1>
                    <Doughnut data={TurnOver} />
                </div>
            </div>
            <div className='row'>
                <div className='col-lg-10 mt-5 barchart'>
                    <h2>Bar Income</h2>
                    <Bar data={incombar} options={options} />
                </div>

            </div>
            <div className='row'>
                <div className='col-lg-10 mt-5 barchart'>
                    <h2>Bar Expence</h2>
                    <Bar data={expancebar} options={options} />
                </div>

            </div>

        </div>
    )
}

export default Analyites
