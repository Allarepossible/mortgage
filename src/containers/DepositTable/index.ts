import {connect} from 'react-redux';

import DepositTable from 'components/DepositTable';

const mapStateToProps = ({deposit}) => {
    const {transactions} = deposit;

    const table = transactions;

    return {
        table,
    };
};

export default connect(mapStateToProps)(DepositTable);
