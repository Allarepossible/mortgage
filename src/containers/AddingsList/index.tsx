import React from 'react';
import moment from 'moment';
import {connect} from 'react-redux';
import {IconContext} from 'react-icons';
import {IoIosTrash} from 'react-icons/io';

import {removeContribution} from 'actions/deposit';
import {normalizePrice} from 'helpers/price';

import {List, Item, Remove, Span} from './styles';

interface Props {
    contributions: any;
    RemoveContribution: (value: any) => void;
}

const dict = {
    one: 'Единовременный платеж',
    month: 'Ежемесячный платеж',
};

const Form = ({contributions, RemoveContribution}: Props) => {
    return (
        <List>
            {
                contributions.map(({amount, id, date, periodicity}: any) => (
                    <Item key={id}>
                        <Span weight="bold" size={17}>{normalizePrice(amount)}</Span>
                        <Span>{moment(date, 'YYYY-MM-DD').format('DD MMM YYYY')}</Span>
                        <Span>{dict[periodicity]}</Span>
                        <Remove onClick={() => RemoveContribution(id)}>
                            <IconContext.Provider value={{color: 'white', size: '15px'}}>
                                <IoIosTrash />
                            </IconContext.Provider>
                        </Remove>
                    </Item>
                ))
            }
        </List>
    );
};


const mapStateToProps = ({deposit}: any) => ({contributions: deposit.contributions});

const mapDispatchToProps = {
    RemoveContribution: removeContribution,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
