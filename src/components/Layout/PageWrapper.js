import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

export default function PageWrapper({ children, announcement, announcementLink }) {
  return (
    <>
      <AnnouncementBar message={announcement} link={announcementLink} />
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  min-height: 60vh;
`;
