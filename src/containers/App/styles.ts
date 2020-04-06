import styled from 'styled-components';

export const Row = styled.div`
    display: flex;
    width: 100%;
   
    & + & {
        border-top: 1px solid #eee;
    }
`;

export const Column = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

export const Info = styled(Column)`
    padding: 30px 40px;
    
    & + & {
        border-left: 1px solid #eee;
   }
`;

export const Payment = styled.span`
    margin-top: 10px;
    font-weight: bold;
    font-size: 17px;
    margin-bottom: 50px;
`;

export const Total = styled.span`
    font-weight: bold;
    color: #53b374;
    font-size: 17px;
    margin-bottom: 50px;
`;

export const Title = styled.h2`
    text-align: left;
    margin-top: 0;
    margin-bottom: 40px;
`;

export const Overpayment = styled.span`
    font-weight: bold;
    color: #b32427;
    font-size: 17px;
    margin-bottom: 50px;
`;

export const All = styled.span`
    font-weight: bold;
    color: #b32427;
    font-size: 17px;
    margin-bottom: 50px;
`;

export const Big = styled.span`
    font-size: 23px;
`;
