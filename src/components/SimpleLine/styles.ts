import styled from 'styled-components';

export const WrapLine = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
`;

export const Row = styled.div`
    display: flex;
    margin-bottom: 10px;
    
    span + span {
        margin-left: 20px;
    }
`;

const Span = styled.span`
    font-size: 11px;
    position: relative;
    padding-left: 10px;
    
    &:before {
        content: "";
        position: absolute;
        border-radius: 50%;
        height: 5px;
        width: 5px;
        left: 0;
        top: 4px;
    }
`;

export const Credit = styled(Span)`
    &:before {
        background-color: #53b374;
    }
`;

export const Overpayment = styled(Span)`
    &:before {
        background-color: rgb(255, 201, 46);
    }
`;

export const Line = styled.div<{percent: number}>`
    position: relative;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    background-color: rgb(255, 201, 46);
    overflow: hidden;
    
    &:before {
        content: "";
        position: absolute;
        background-color: #53b374;
        height: 10px;
        ${({percent}) => `width: ${percent}%;`}
        left: 0px;
        bottom: 0px;
    }
`;
