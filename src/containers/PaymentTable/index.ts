import {connect} from 'react-redux';

import Table from 'components/Table';
import {createTable} from 'helpers/days';

const mapStateToProps = ({current}, ownProps) => {
    const {percent, years} = current;
    const {credit, payment, startDate} = ownProps;

    const table = createTable({credit, percent, payment, years, startDate});

    return {
        table,
    };
};

export default connect(mapStateToProps)(Table);
