import React from 'react';

import {normalizePrice} from 'helpers/price';
import {Table as StyledTable, Headline, HeadlineItem, List, ListItemWrap, Detail, Title, Date} from './styles';

const Cell = ({type, value}) => {
    if (type === 'date') {
        return <Date>{value}</Date>;
    }
    if (type === 'price') {
        return <Detail>{normalizePrice(value)}</Detail>;
    }
    return <div>{normalizePrice(value)}</div>;
};

const Table = ({title, data, types}) => (
    <StyledTable>
        <Title>{title}</Title>
        <Headline>
            {
                types.map(({name}, index) => (
                    <HeadlineItem key={index}>{name}</HeadlineItem>
                ))
            }
        </Headline>
        <List>
            {data && data.length > 0 &&
                data.map((item, index) => (
                    <ListItemWrap key={index} type={item.type}>
                        {
                            types.map(({value, type}, index) => (
                                <Cell type={type} key={index} value={item[value]} />
                            ))
                        }
                    </ListItemWrap>
                ))
            }
        </List>
    </StyledTable>
);

export default Table;
