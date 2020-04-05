import React, {useEffect} from 'react';
import styled from 'styled-components';
import GlobalStyle from 'helpers/global-styles';

import Header from 'components/Header';
import Sidebar from 'components/Sidebar';

export interface PageProps {
    children: React.ReactNode;
    title: string;
}

const PageWrap = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 115px;
`;

const Content = styled.div`
    display: flex;
    background: white;
    box-shadow: -12px 11px 1px 0 rgba(255,255,255,0.3);
    border-radius: 40px 0 0 0;
    flex-grow: 1;
`;

const Page = ({children, title}: PageProps) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <PageWrap>
            <GlobalStyle />
            <Header />
            <Sidebar />
            <Content>
                {children}
            </Content>
        </PageWrap>
    );
};

export default Page;
