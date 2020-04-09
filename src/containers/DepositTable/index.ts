import {connect} from 'react-redux';

import DepositTable from 'components/DepositTable';
import {createDepositTable} from 'helpers/days';

const mapStateToProps = ({deposit}) => {
    const {percent, months, initialFee, startDate} = deposit;

    const table = createDepositTable({deposit: initialFee, percent, months, startDate});

    return {
        table,
    };
};

export default connect(mapStateToProps)(DepositTable);
