import {Fragment, useEffect, useState} from "react";
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import HeroSlider from "../../wrappers/hero-slider/HeroSliderFive";
// import FeatureIcons from "../../wrappers/feature-icon/FeatureIconFive";
import TabProduct from "../../wrappers/product/TabProductFour";
// import Banner from "../../wrappers/banner/BannerSeventeen";
import CountDown from "../../wrappers/countdown/CountDownEight";
// import Testimonial from "../../wrappers/testimonial/TestimonialOne";
import Newsletter from "../../wrappers/newsletter/NewsletterTwo";
import {useGlobalSettings} from "../../context/GlobalSettingsContext";

const HomeIvosCafe = () => {
    const {globals} = useGlobalSettings();
    const [Banner, setBanner] = useState(null);

    useEffect(() => {
        // Check that globals.banner_type is defined
        if (globals.banner_type) {
            // Dynamically import the correct Banner component based on globals.banner_type
            import(`../../wrappers/banner/Banner${globals.banner_type}`)
                .then((BannerComponent) => {
                    setBanner(() => BannerComponent.default);
                })
                .catch((error) => {
                    console.error(`Error loading Banner${globals.banner_type}: `, error);
                });
        }
    }, [globals.banner_type]);

    if (!Banner) {
        return null; // Return null or a loading spinner until Banner is set
    }

  return (
    <Fragment>
        <SEO
            titleTemplate={globals.website_title}
            description={globals.website_description}
        />

        <Layout
            headerTop="visible"
            headerContainerClass="container-fluid"
            headerBorderStyle="fluid-border"
            headerPaddingClass="header-padding-2"
        >
            {/* Wrappers in here */}
            {/* hero sliders */}
            <HeroSlider spaceLeftClass="ml-70" spaceRightClass="mr-70" />
            {/* banner */}
            <Banner />
            {/* feature icon */}
            {/*<FeatureIcons*/}
            {/*  spaceTopClass="pt-10"*/}
            {/*  spaceBottomClass="pb-60"*/}
            {/*  containerClass="container-fluid"*/}
            {/*  gutterClass="padding-10-row-col"*/}
            {/*/>*/}
            {/* tab product */}
            <TabProduct
                spaceBottomClass="pb-100"
                productTabClass="product-tab-ivoscafe"
            />
            {/* countdown */}
            <CountDown
                spaceTopClass="pt-80"
                spaceBottomClass="pb-95"
            />
            {/* testimonial */}
            {/*<Testimonial*/}
            {/*    spaceTopClass="pt-100"*/}
            {/*    spaceBottomClass="pb-95"*/}
            {/*    spaceLeftClass="ml-70"*/}
            {/*    spaceRightClass="mr-70"*/}
            {/*    bgColorClass="bg-gray-3"*/}
            {/*/>*/}
            {/* newsletter */}
            <Newsletter
                spaceTopClass="pt-100"
                spaceBottomClass="pb-100"
                subscribeBtnClass="green-subscribe"
            />
            {/* End of wrappers */}
        </Layout>
    </Fragment>
  );
};

export default HomeIvosCafe;
