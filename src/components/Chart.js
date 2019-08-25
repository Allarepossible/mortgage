import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
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
            <LineSeries
                curve={'curveMonotoneX'}
                className="first-series"
                style={{fill: 'none'}}
                data={dataPercents}
            />
            <LineSeries
                className="fourth-series"
                curve={'curveMonotoneX'}
                style={{fill: 'none'}}
                data={dataPayments}
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
