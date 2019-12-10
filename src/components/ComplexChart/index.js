import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalBarSeries,
    DiscreteColorLegend,
    LineSeries,
    Crosshair,
} from 'react-vis';

import './index.css';

const ComplexChart = ({
    onItemClick,
    onMouseLeave,
    onNearestX,
    xLabel,
    yLabel,
    firstData,
    secondData,
    current,
    itemsFormat,
    titleFormat,
    crosshairValues,
    items,
    payment,
}) => (
    <div className="Chart" key={1}>
        <div className="legend">
            <DiscreteColorLegend
                onItemClick={onItemClick}
                width={1000}
                items={items}
            />
        </div>
        <XYPlot width={1000} height={400} className="inner" onMouseLeave={onMouseLeave}>
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
            <VerticalBarSeries
                cluster="2015"
                color="#79C7E3"
                className="fourth-series"
                data={firstData}
            />
            <VerticalBarSeries
                onNearestX={onNearestX}
                cluster="2015"
                color="#12939A"
                className="first-series"
                data={secondData}
            />
            <LineSeries
                curve={'curveMonotoneX'}
                className="first-series"
                style={{fill: 'none'}}
                data={[{x: current, y: 0}, {x: current, y: payment}]}
            />
            <Crosshair
                itemsFormat={itemsFormat}
                titleFormat={titleFormat}
                values={crosshairValues}
            />
        </XYPlot>
    </div>
);

export default ComplexChart;
