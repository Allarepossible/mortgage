import React from 'react';
import {Bar} from 'react-chartjs-2';

import {normalizePrice} from 'helpers/price';

export const ticksCallbackY = (v: number) => {
    return v % 100 === 0 ? normalizePrice(v) : null;
};

const SimpleChart = ({xLabel, yLabel, data}) => (
    <Bar
        height={100}
        data={{
            aspectRatio: 2.5,
            labels: data.map(i => i.x),
            datasets: [{
                label: yLabel,
                data: data.map(i => i.y),
                backgroundColor: '#3f82a4',
            }],
        }}
        options={{
            tooltips: {
                mode: 'index',
                callbacks: {
                    title: function(tooltipItem){
                        return xLabel;
                    },
                    label: function(tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label + ': '
                            + normalizePrice(tooltipItems.yLabel);
                    },
                },
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    type: 'category',
                    gridLines: {
                        display: false,
                        color: '#dde5e7',
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: false,
                    },
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        padding: 10,
                        beginAtZero: true,
                        display: true,
                        fontColor: '#AAABAD',
                        callback: v => ticksCallbackY(v),
                    },
                    gridLines: {
                        color: '#dde5e7',
                        drawBorder: false,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: yLabel,
                    },
                }],
            },
            legend: {
                display: false,
            },
        }}
    />
);

export default SimpleChart;
