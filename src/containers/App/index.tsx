import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';

import {changeFullPrice, changePercent, changeInitialFee, changeYears, Target} from 'actions';
import PaymentAndRemainderChart from 'containers/PaymentAndRemainderChart';
import PaymentOfYearsChart from 'containers/PaymentOfYearsChart';
import OverpaimentsChart from 'containers/OverpaimentsChart';
import PaymentTable from 'containers/PaymentTable';
import Input from 'components/Input';
import SimplePie from 'components/SimplePie';
import {normalizePrice} from 'helpers/price';

import {App as StyledApp, Header, HeaderContainer,
    Container, Column, Big, Overpayment, Payment, Title, Total, All} from './styles';

interface Props {
    credit: number;
    percent: number;
    payment: number;
    years: number;
    fullPrice: number;
    initialFee: number;
    overpayment: number;
}

interface ActionsProps {
    ChangeFullPrice: ({target}: Target) => void;
    ChangeInitialFee: ({target}: Target) => void;
    ChangePercent: ({target}: Target) => void;
    ChangeYears: ({target}: Target) => void;
}
interface State {
    current: {
        fullPrice: number;
        percent: number;
        initialFee: number;
        years: number;
    };
}

const Index: React.FC<Props & ActionsProps> = ({
    credit,
    percent,
    payment,
    years,
    fullPrice,
    initialFee,
    overpayment,
    ChangeFullPrice,
    ChangeInitialFee,
    ChangePercent,
    ChangeYears,
}) => {
    const [other, setOther] = useState(false);

    return (
        <StyledApp>
            <Header>
                <HeaderContainer>
                    <h1>Ипотечный калькулятор</h1>
                </HeaderContainer>
            </Header>
            <Container>
                <Column>
                    <Title>Основные параметры ипотеки</Title>
                    <Input
                        id="fullPrice"
                        value={fullPrice}
                        changeInput={ChangeFullPrice}
                        title="Стоимость недвижимости"
                        type="cost"
                    />
                    <Input
                        id="initialFee"
                        value={initialFee}
                        changeInput={ChangeInitialFee}
                        title="Первоначальный взнос"
                        type="cost"
                    />
                    <Input
                        id="percent"
                        value={percent}
                        changeInput={ChangePercent}
                        title="Процент"
                        type="percent"
                    />
                    <Input
                        id="years"
                        value={years}
                        changeInput={ChangeYears}
                        title="Срок погашения (полных лет)"
                        type="years"
                    />
                    {/*<div className="inputWrap">*/}
                    {/*    <label htmlFor="start" className="label">Начало ипотеки</label>*/}
                    {/*</div>*/}
                    {/*<div className="inputWrap">*/}
                    {/*    <button>Внести доп платеж</button>*/}
                    {/*</div>*/}
                </Column>
                <Column>
                    <Payment>Ежемесячный платеж:
                        <Big> {normalizePrice(payment)}</Big>
                    </Payment>
                    <Total>Сумма кредита:
                        <Big>{normalizePrice(credit)}</Big>
                    </Total>
                    <Overpayment>Переплата:
                        <Big>{normalizePrice(overpayment)}</Big>
                    </Overpayment>
                    <All>Долг + проценты:
                        <Big>{normalizePrice(overpayment + credit)}</Big>
                    </All>
                </Column>
                <Column>
                    <SimplePie overpayment={overpayment} credit={credit}/>
                </Column>
            </Container>
            <Container>
                <PaymentTable
                    startDate={new Date()}
                    credit={credit}
                    payment={payment}
                />
            </Container>
            <Column>
                <h3>Выплата процентов и погашение задолженности</h3>
                <PaymentAndRemainderChart
                    startDate={new Date()}
                    credit={credit}
                    payment={payment}
                />
            </Column>
            <div className="button">
                <button onClick={() => setOther(!other)}>
                    {!other ? 'Показать другие графики' : 'Скрыть другие графики'}
                </button>
            </div>
            {
                other &&
                (
                    <Fragment>
                        <Column>
                            <h2>Ежемесячный платеж от количества лет</h2>
                            <OverpaimentsChart
                                fullPrice={fullPrice}
                                initialFee={initialFee}
                                percent={percent}
                            />

                            <h2>Переплата от количества лет</h2>
                            <PaymentOfYearsChart
                                fullPrice={fullPrice}
                                initialFee={initialFee}
                                percent={percent}
                            />
                        </Column>
                    </Fragment>

                )
            }
        </StyledApp>
    );
};

const mapStateToProps = ({current}: State): Props => {
    const {fullPrice, percent, initialFee, years} = current;
    const credit = fullPrice - initialFee;

    const duration = years * 12;
    const dem = 1 + percent/1200;

    const pow = Math.pow(dem, duration);
    const coef = pow * (dem - 1) / (pow - 1);

    const payment = Math.round(coef * credit);

    const overpayment = Math.round(payment * duration - credit);

    return {
        fullPrice,
        percent,
        initialFee,
        years,
        payment,
        credit,
        overpayment,
    };
};

const mapDispatchToProps: ActionsProps = {
    ChangeFullPrice: changeFullPrice,
    ChangePercent: changePercent,
    ChangeInitialFee: changeInitialFee,
    ChangeYears: changeYears,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
