import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    VerticalGridLines,
    LineSeries,
} from 'react-vis';

import './Chart.css';

const Chart = ({dataPercents, dataPayments, payment, current}) => (
    <div className="Chart">
        <XYPlot width={1200} height={400} className="inner">
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis />
            <YAxis />
            <DiscreteColorLegend
                style={{position: 'absolute', left: '50px', top: '10px'}}
                orientation="horizontal"
                items={[
                    {
                        title: 'Apples',
                        color: '#12939A'
                    },
                    {
                        title: 'Oranges',
                        color: '#79C7E3'
                    }
                ]}
            />
            <ChartLabel
                text="Месяцы"
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.025}
                yPercent={1.01}
            />

            <ChartLabel
                text="Платеж"
                className="alt-y-label"
                includeMargin={false}
                xPercent={0.01}
                yPercent={0.06}
                style={{
                    transform: 'rotate(-90)',
                    textAnchor: 'end'
                }}
            />
            <VerticalBarSeries
                cluster="2015"
                color="#79C7E3"
                onValueMouseOver={(datapoint, event)=>{
                    console.log(datapoint)
                }}
                className="fourth-series"
                data={dataPayments}
            />
            <VerticalBarSeries
                cluster="2015"
                color="#12939A"
                className="first-series"
                data={dataPercents}
            />
            <LineSeries
                curve={'curveMonotoneX'}
                className="first-series"
                style={{fill: 'none'}}
                data={[{x: current, y: 0}, {x: current, y: payment}]}
            />
        </XYPlot>
    </div>
);

export default Chart;
