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

export const Span = styled.span<{color?: string}>`
    font-size: 15px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    ${({color}) => `color: ${color || 'black'};`}
    align-items: baseline;
    margin-bottom: 15px;
`;

export const Title = styled.h2`
    text-align: left;
    margin-top: 0;
    margin-bottom: 40px;
`;

export const Big = styled.span`
    font-weight: bold;
    font-size: 20px;
`;
