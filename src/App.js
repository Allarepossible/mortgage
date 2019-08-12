import React, { Component } from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    ChartLabel,
    HorizontalGridLines,
    VerticalGridLines,
    LineSeries,
} from 'react-vis';
import logo from './logo.svg';
import './App.css';
const data = [];

for (let i = 0; i < 20; i++) {
    const series = [];
    for (let j = 0; j < 100; j++) {
        series.push({x: j, y: (i / 10 + 1) * Math.sin((Math.PI * (i + j)) / 50)});
    }
    data.push({color: i, key: i, data: series, opacity: 0.8});
}
class App extends Component {
  render() {
      const Line = LineSeries;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
          <XYPlot
              width={300}
              height={300}
              fill="#fff"
              colorType="linear"
              colorDomain={[0, 9]}
              colorRange={['yellow', 'orange']}
          >
              <HorizontalGridLines />
              <VerticalGridLines />
              <XAxis />
              <YAxis />
              {data.map(props => (
                  <LineSeries {...props} style={{
                      fill: 'none',
                  }} />
              ))}
          </XYPlot>
        <p className="App-intro">
            <XYPlot width={300} height={300}>
                <HorizontalGridLines />
                <VerticalGridLines />
                <XAxis />
                <YAxis />
                <ChartLabel
                    text="X Axis"
                    className="alt-x-label"
                    includeMargin={false}
                    xPercent={0.025}
                    yPercent={1.01}
                />

                <ChartLabel
                    text="Y Axis"
                    className="alt-y-label"
                    includeMargin={false}
                    xPercent={0.06}
                    yPercent={0.06}
                    style={{
                        transform: 'rotate(-90)',
                        textAnchor: 'end'
                    }}
                />
                <Line
                    style={{
                        fill: 'none',
                    }}
                    className="first-series"
                    data={[{x: 1, y: 3}, {x: 2, y: 5}, {x: 3, y: 15}, {x: 4, y: 12}]}
                />
                <Line className="second-series" data={null} />
                <Line
                    className="third-series"
                    curve={'curveMonotoneX'}
                    style={{
                        fill: 'none',
                    }}
                    data={[{x: 1, y: 10}, {x: 2, y: 4}, {x: 3, y: 2}, {x: 4, y: 15}]}
                    strokeDasharray={'7, 3'}
                    fill="none"
                />
                <Line
                    className="fourth-series"
                    style={{
                        fill: 'none',
                        // note that this can not be translated to the canvas version
                        strokeDasharray: '2 2'
                    }}
                    data={[{x: 1, y: 7}, {x: 2, y: 11}, {x: 3, y: 9}, {x: 4, y: 2}]}
                />
            </XYPlot>
        </p>
          <XYPlot margin={50} width={200} height={200}>
              <VerticalGridLines />
              <XAxis />
              <YAxis />
              <LineSeries data={[{x: 1, y: 10}, {x: 2, y: 5}, {x: 3, y: 15}]} style={{
                  fill: 'none',
              }}/>
          </XYPlot>
      </div>
    );
  }
}

export default App;
