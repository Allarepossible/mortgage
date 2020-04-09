import styled from 'styled-components';

export const Table = styled.div`
    text-align: center;
`;

export const Headline = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
    box-shadow: 1px 2px 6px 3px rgba(0,0,0,.07);
`;

export const HeadlineItem = styled.div`
    color: #4b545b;
    width: 30%;
    text-align: center;
`;

export const List = styled.div`
    height: 500px;
    overflow-y: auto;
    flex-direction: column;
    display: flex;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.07);
`;

export const ListItemWrap = styled.div`
    padding-right: 20px;
    font-size: 14px;
    display: flex;
    align-items: center;
        
    & > div {
        padding: 10px 0;
        width: 30%;
        text-align: right
    }
    
    &:nth-of-type(2n) {
        background-color: #f8f9fa;
    }
`;

export const Title = styled.h2`
    margin-bottom: 30px;
`;

export const Detail = styled.div`
    color: #93989d;
`;

export const Date = styled.div`
    color: #93989d;
    font-size: 12px;
`;
