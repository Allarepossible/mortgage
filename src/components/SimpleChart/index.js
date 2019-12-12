import React from 'react';
import {
    Bar
} from 'react-chartjs-2';

import './index.css';
import {normalizePrice} from "../../helpers/price";

const SimpleChart = ({xLabel, yLabel, data}) => (
    <Bar
        data={{
            aspectRatio: 2.5,
            labels: data.map(i => i.x),
            datasets: [{
                label: 'Основной долг',
                data: data.map(i => i.y),
                backgroundColor: '#53b374',
            }]
        }}
        options={{
            tooltips: {
                mode: 'index',
                callbacks: {
                    title: function(tooltipItem){
                        return xLabel;
                    },
                    label: function(tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label +': ' + normalizePrice(tooltipItems.yLabel);
                    },
                }
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    type: 'category',
                    gridLines: {
                        display: false,
                        color: '#dde5e7'
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: false,

                    }
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        display: false
                    },
                    gridLines: {
                        color: '#dde5e7',
                        drawBorder: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yLabel
                    },
                }]
            },
            legend: {
                position: 'bottom',
            }
        }}
    />
);

export default SimpleChart;
