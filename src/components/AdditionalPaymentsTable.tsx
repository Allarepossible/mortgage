import React from 'react';
import styled from 'styled-components';

import {normalizePrice} from 'helpers/price';

export const Scroll = styled.div`
    height: 200px;
    overflow: scroll;
`;

const AdditionalPaymentsTable = ({additional}) => (
    <Scroll>
        <table>
            <thead>
                <tr>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>Изменение платежа</th>
                    <th>Текущий платеж</th>
                </tr>
            </thead>
            <tbody>
                {additional.length > 0 &&
                    additional.map(item => (
                        <tr key={item.date}>
                            <td>{item.date}</td>
                            <td>{normalizePrice(item.summ)}</td>
                            <td>{normalizePrice(item.change)}</td>
                            <td>{normalizePrice(item.current)}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </Scroll>
);

export default AdditionalPaymentsTable;
