import React from 'react';
import type { ReactElement } from 'react';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 2rem;
`;

export const Main = styled.div`
  padding: 4rem 0;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Layout = (page: ReactElement): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Main>{page}</Main>
      </Container>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }

    @media (prefers-color-scheme: dark) {
    html {
        color-scheme: dark;
    }
    body {
        color: white;
        background: black;
    }
`;
