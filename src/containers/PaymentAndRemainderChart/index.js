import React from 'react';
import {connect} from 'react-redux';

import ComplexChart from '../../components/ComplexChart';
import {createTable} from "../../helpers/days";
import './index.css';

const mapStateToProps = ({current}, ownProps) => {
    const {percent: p, years} = current;
    const {credit, payment, startDate} = ownProps;

    const table = createTable({credit, percent:p, payment, years, startDate});
    const percent = table.map(item => item.percentAmount);
    const debet = table.map(item => payment - item.percentAmount);
    const dates = table.map(item=> item.month);

    return {
        debet,
        percent,
        dates,
    }
};

export default connect(mapStateToProps)(ComplexChart);
