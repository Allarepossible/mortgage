import styled from 'styled-components';

export const List = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    
    margin-bottom: 30px;
    
    & > div + div {
        margin-top: 20px;
    }
`;

export const Remove = styled.button`
    border: none;
    padding: 6px 8px;
    cursor: pointer;
    border-radius: 8px;
    margin-left: 30px;
    background-color: #3f80a3;
    
    &:active {
        padding: 5px 7px;
        margin: 1px 1px 1px 31px;
        background-color: #3b5e95;
    }
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    
    & > span + span {
        margin-left: 50px;
    }
`;

export const Span = styled.span<{weight?: string; size?: number; color?: string}>`
    ${({weight}) => `font-weight: ${weight};`}
    ${({size}) => `font-size: ${size || 15}px;`}
    ${({color}) => `color: ${color};`}
`;

