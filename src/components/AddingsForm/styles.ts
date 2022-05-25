import styled from 'styled-components';

export const StyledForm = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    & > div + div,  & > div + select{
        margin-left: 30px;
    }
    
    width: 100%;
`;

export const Add = styled.button`
    border: none;
    padding: 3px 13px 8px;
    cursor: pointer;
    color: white;
    border-radius: 8px;
    margin-left: 20px;
    background-color: #3f80a3;
    font-size: 23px;
    
    &:active {
        padding: 2px 12px 7px;
        margin: 1px 1px 1px 21px;
        background-color: #3b5e95;
    }
`;

export const Select = styled.select`
    height: 37px;
`;

