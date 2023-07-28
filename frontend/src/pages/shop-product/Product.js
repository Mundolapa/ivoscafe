import React, { Fragment } from "react"; 
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { useTranslation} from "react-i18next";
import { useNavigate } from 'react-router-dom';

const Product = () => {
  let { pathname } = useLocation();
  let { id } = useParams();
  const { t } = useTranslation();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product.id === Number(id)) || {};
  const navigate = useNavigate();

    // Checking if product exists
  if (!product) {
    navigate('/404');
  }

    return (
    <Fragment>
      <SEO
        titleTemplate={t('product_page_title')}
        description={t('product_page_description')}
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
            {label: t('breadcrumb_shop_product'), path: process.env.PUBLIC_URL + pathname }
          ]} 
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
        />

        {/* product description tab */}
        <ProductDescriptionTab
            spaceBottomClass="pb-90"
            productFullDesc={product.body}
            productAdditionalInfo={product.additional_info}
        />

        <RelatedProductSlider
            spaceBottomClass="pb-95"
            category={product.category[0]}
        />
      </Layout>
    </Fragment>
  );
};

export default Product;
