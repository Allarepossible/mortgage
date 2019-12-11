import React from 'react';
import {
    Bar
} from 'react-chartjs-2';

import './index.css';

const ComplexChart = ({
    dates,
    debet,
    percent,
}) => (
    <Bar
        data={{
            aspectRatio: 2.5,
            labels: dates,
            datasets: [{
                label: 'Основной долг',
                data: debet,
                backgroundColor: 'rgb(147, 112, 219, 0.7)',
            },{
                label: 'Проценты',
                data: percent,
                backgroundColor: 'rgb(255, 204, 51, 0.7)',
            }]
        }}
        options={{
            tooltips: {
                mode: 'index',
                callbacks: {
                    title: function(tooltipItem){
                        return this._data.labels[tooltipItem[0].index];
                    },
                    label: function(tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label;
                    },
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    type: 'category',
                    gridLines: {
                        color: '#dde5e7'
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: false,
                        callback: function(value, index, values) {
                            console.log('==========', value, index, values)
                        }
                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        display: false
                    },
                    gridLines: {
                        display: false,
                        color: '#dde5e7',
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Ежемесячный платеж'
                    },
                }]
            },
            legend: {
                position: 'bottom',
            }
        }}
    />
);

export default ComplexChart;
