import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalBarSeries,
} from 'react-vis';

import './index.css';

const SimpleChart = ({xLabel, yLabel, data}) => (
    <div className="Chart" key={2}>
        <XYPlot width={1000} height={400} className="inner">
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <ChartLabel
                text={xLabel}
                className="alt-x-label"
                includeMargin={false}
                xPercent={0.01}
                yPercent={1.13}
            />

            <ChartLabel
                text={yLabel}
                className="alt-y-label"
                includeMargin={false}
                xPercent={-0.06}
                yPercent={0.06}
                style={{
                    transform: 'rotate(-90)',
                    textAnchor: 'end'
                }}
            />
            <VerticalBarSeries color="#12939A" className="first-series" data={data} />
        </XYPlot>
    </div>
);

export default SimpleChart;
