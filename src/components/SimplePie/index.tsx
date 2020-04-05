import React from 'react';
import {Pie} from 'react-chartjs-2';

import {normalizePrice} from 'helpers/price';

const SimplePie = ({credit, overpayment}) => (
    <Pie data={{
        labels: [
            'Сумма кредита',
            'Сумма переплаты',
        ],
        datasets: [{
            data: [credit, overpayment],
            backgroundColor: [
                '#53b374',
                '#fad16a',
            ],
            hoverBackgroundColor: [
                '#53b374',
                '#fad16a',
            ],
        }],
    }} options={{
        responsive: true,
        legend: {
            position: 'top',
            reverse: true,
        },
        tooltips: {
            callbacks: {
                label: (tooltipItem, data) => {
                    const money = data.datasets[0].data[tooltipItem.index];

                    return ` ${data.labels[tooltipItem.index]}: ${normalizePrice(money)}`;
                },
                afterLabel: (tooltipItem, data) => {
                    const money = data.datasets[0].data[tooltipItem.index];

                    return `\n${Math.round(money * 100/(overpayment + credit))} % от всей суммы`;
                },
            },
            width: '100px',
        },
    }}
    />
);

export default SimplePie;
