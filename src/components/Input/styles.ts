import styled from 'styled-components';

export const Input = styled.input`
    box-sizing: border-box;
    line-height: 25px;
    font-size: 16px;
    width: 100%;
    padding: 5px 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;

export const Label = styled.label`
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 9px;
`;

export const InputWrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    
    &:after {
        position: absolute;
        content: '%';
        bottom: 10px;
        display: block;
        right: 10px;
        color: black;
        font-size: 16px;
    }
`;
