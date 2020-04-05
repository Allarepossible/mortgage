import React, {useEffect} from 'react';
import styled from 'styled-components';
import GlobalStyle from 'helpers/global-styles';

export interface PageProps {
    children: React.ReactNode;
    title: string;
}

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 0;
`;

const StyledPage = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    flex-wrap: nowrap;
`;

const Page = ({children, title}: PageProps) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <StyledPage>
            <Content>
                <GlobalStyle />
                <h1>{title}</h1>
                {children}
            </Content>
        </StyledPage>
    );
};

export default Page;
