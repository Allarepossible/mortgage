import React from 'react';

import {normalizePrice} from 'helpers/price';
import {Table as StyledTable, Headline, HeadlineItem, List, ListItemWrap, Detail, Title} from './styles';

const Table = ({table}) => (
    <StyledTable>
        <Title>График платежей</Title>
        <Headline>
            <HeadlineItem>Месяц/год</HeadlineItem>
            <HeadlineItem>Платеж</HeadlineItem>
            <HeadlineItem>Проценты</HeadlineItem>
            <HeadlineItem>Основной долг</HeadlineItem>
            <HeadlineItem>Остаток долга</HeadlineItem>
        </Headline>
        <List>
            {table && table.length > 0 &&
                table.map((item, index) => (
                    <ListItemWrap key={index}>
                        <div>{item.date}</div>
                        <div>{normalizePrice(item.amount)}</div>
                        <Detail>{normalizePrice(item.percentAmount)}</Detail>
                        <Detail>{normalizePrice(item.payOffAmount)}</Detail>
                        <div>{normalizePrice(item.remainder)}</div>
                    </ListItemWrap>
                ))
            }
        </List>
    </StyledTable>
);

export default Table;
