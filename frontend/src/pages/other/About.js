import { Fragment } from "react"; 
import { useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
import TextGrid from "../../wrappers/text-grid/TextGridSimple";
// import BrandLogoSliderOne from "../../wrappers/brand-logo/BrandLogoSliderOne";
import { useTranslation } from "react-i18next";

const About = () => {
  let { pathname } = useLocation();
  const { t } = useTranslation();

  return (
    <Fragment>
      <SEO
        titleTemplate={t('about_us_page_title')}
        description={t('about_us_page_description')}
      />
        <Layout
            headerTop="visible"
            headerContainerClass="container-fluid"
            headerBorderStyle="fluid-border"
            headerPaddingClass="header-padding-2"
        >
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: t('breadcrumb_home'), path: process.env.PUBLIC_URL + "/" },
            {label: t('breadcrumb_about_us'), path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* section title with text */}
        <SectionTitleWithText spaceTopClass="pt-100" spaceBottomClass="pb-95" />

        {/* text grid */}
        <TextGrid spaceBottomClass="pb-70" />

        {/* brand logo slider */}
        {/*<BrandLogoSliderOne spaceBottomClass="pb-70" />*/}
      </Layout>
    </Fragment>
  );
};

export default About;
