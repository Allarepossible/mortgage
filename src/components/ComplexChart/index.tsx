import React from 'react';
import {Bar} from 'react-chartjs-2';
import {normalizePrice} from 'helpers/price';

const ComplexChart = ({
    dates,
    debet,
    percent,
}) => (
    <Bar
        height={100}
        data={{
            aspectRatio: 4,
            labels: dates,
            datasets: [{
                label: 'Основной долг',
                data: debet,
                backgroundColor: '#53b374',
            }, {
                label: 'Проценты',
                data: percent,
                backgroundColor: 'rgb(255, 201, 46)',
            }],
        }}
        options={{
            tooltips: {
                mode: 'index',
                callbacks: {
                    label: function(tooltipItems, data) {
                        return data.datasets[tooltipItems.datasetIndex].label +
                            ': ' + normalizePrice(tooltipItems.yLabel);
                    },
                    beforeBody: function (tooltipItems) {
                        let total = 0;
                        for (const tooltipItem of tooltipItems) {
                            total+= tooltipItem.yLabel;
                        }
                        total = Math.round(total * 100) / 100;
                        return 'Платеж: ' + normalizePrice(total) + '\n';
                    },
                },
            },
            scales: {
                xAxes: [{
                    stacked: true,
                    type: 'category',
                    gridLines: {
                        color: '#dde5e7',
                    },
                    ticks: {
                        maxRotation: 0,
                        autoSkip: false,
                        callback: function (value, index, values) {
                            if (values.length > 24) {
                                const year = value.substr(-4);

                                if (value.indexOf('Январь') === 0) {
                                    return year;
                                } else {
                                    return null;
                                }
                            } else {
                                // менее 24 мес.
                                if (values.length > 11) {
                                    return index % 2 === 0 ? value.split(' ')[0].substr(0, 3)
                                        + ' ' + value.split(' ')[1] : null;
                                } else {
                                    return value.split(' ')[0].substr(0, 3) + ' '
                                        + value.split(' ')[1];
                                }
                            }
                        },
                    },
                }],
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true,
                        display: false,
                    },
                    gridLines: {
                        display: false,
                        color: '#dde5e7',
                        drawBorder: false,
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Ежемесячный платеж',
                    },
                }],
            },
            legend: {
                position: 'bottom',
            },
        }}
    />
);

export default ComplexChart;
