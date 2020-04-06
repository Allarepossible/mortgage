import styled from 'styled-components';

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    width: 900px;
    margin: 0 auto;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    
    & > div + div {
        margin-left: 50px;
    }
`;
