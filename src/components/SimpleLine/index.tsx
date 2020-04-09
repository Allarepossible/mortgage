import React from 'react';

import {WrapLine, Line, Credit, Row, Overpayment} from './styles';

const SimpleLine = ({first, second, firstTitle, secondTitle}) => {
    const firstPercent = Math.round(first * 100 / (first + second));
    const secondPercent = Math.round(second * 100 / (first + second));

    return (
        <WrapLine>
            <Row>
                <Credit>{firstTitle} ({firstPercent}%)</Credit>
                <Overpayment>{secondTitle} ({secondPercent}%)</Overpayment>
            </Row>
            <Line percent={firstPercent} />
        </WrapLine>
    );
};

export default SimpleLine;
