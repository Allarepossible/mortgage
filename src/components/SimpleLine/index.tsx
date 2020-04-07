import React from 'react';

import {WrapLine, Line, Credit, Row, Overpayment} from './styles';

const SimpleLine = ({credit, overpayment}) => {
    const creditPercent = Math.round(credit * 100 / (credit + overpayment));
    const overpaymentPercent = Math.round(overpayment * 100 / (credit + overpayment));

    return (
        <WrapLine>
            <Row>
                <Credit>Кредит ({creditPercent}%)</Credit>
                <Overpayment>Переплата ({overpaymentPercent}%)</Overpayment>
            </Row>
            <Line percent={creditPercent} />
        </WrapLine>
    );
};

export default SimpleLine;
