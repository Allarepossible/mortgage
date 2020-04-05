import styled from 'styled-components';

export const App = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 50px;
`;

export const Container = styled.div`
    display: flex;
    width: 1300px;
    margin: 0 auto;
`;

export const Column = styled.div`
    width: 50%;
    display: flex;
    padding: 20px;
    flex-direction: column;
    
    & + & {
        margin-left: 40px;
    }
`;

export const Flex = styled.div`
    display: flex;
    width: 100%;
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
    width: 100%;
    text-align: center;
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
