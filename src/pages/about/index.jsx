import React from 'react';
import { Container } from '@/common/components/elements/Container';
import PageHeading from '@/common/components/elements/PageHeading';
import About from '@/modules/aboutPage';

const PAGE_TITLE = 'About';
const PAGE_DESCRIPTION =
  'A short story of me, not important but seem better than nothing.';

const AboutPage = () => {
  return (
    <>
      <Container data-aos='fade-up'>
        <PageHeading title={PAGE_TITLE} description={PAGE_DESCRIPTION} />
        <About />
      </Container>
    </>
  );
};

export default AboutPage;
