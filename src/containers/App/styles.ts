import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    width: 100%;
   
    & + & {
        border-top: 1px solid #eee;
    }
    
    & > div + div {
        border-left: 1px solid #eee;
   }
`;

export const Column = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const Info = styled(Column)`
    padding: 30px 40px;
`;

export const BigInfo = styled(Info)`
    width: 60%;
`;

export const SmallInfo = styled(Info)`
    width: 40%;
`;

export const Span = styled.span`
    font-weight: bold;
    font-size: 17px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 40px;
`;

export const Payment = styled(Span)`
    margin-top: 10px;
`;

export const Total = styled(Span)`
    color: #53b374;
`;

export const Overpayment = styled(Span)`
    color: #b32427;
`;

export const All = styled(Span)`
    color: #b32427;
`;

export const Title = styled.h2`
    text-align: left;
    margin-top: 0;
    margin-bottom: 40px;
`;

export const Big = styled.span`
    font-size: 23px;
`;
