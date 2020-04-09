import React from 'react';

import {normalizePrice} from 'helpers/price';
import {Table as StyledTable, Headline, HeadlineItem, List, ListItemWrap, Detail, Title, Date} from './styles';

const Table = ({table}) => (
    <StyledTable>
        <Title>График платежей</Title>
        <Headline>
            <HeadlineItem>Дата</HeadlineItem>
            <HeadlineItem>Сумма %</HeadlineItem>
            <HeadlineItem>Приход на вклад</HeadlineItem>
            <HeadlineItem>Остаток вклада</HeadlineItem>
        </Headline>
        <List>
            {table && table.length > 0 &&
                table.map((item, index) => (
                    <ListItemWrap key={index}>
                        <Date>{item.date}</Date>
                        <Detail>{normalizePrice(item.percentAmount)}</Detail>
                        <Detail>{normalizePrice(item.adding)}</Detail>
                        <div>{normalizePrice(item.remainder)}</div>
                    </ListItemWrap>
                ))
            }
        </List>
    </StyledTable>
);

export default Table;
