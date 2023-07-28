import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";
import LoginForm from "../../components/login-register/LoginForm"

const Login = () => {
  let { pathname } = useLocation();
  const { t } = useTranslation();

  return (
      <Fragment>
        <SEO
            titleTemplate={t('login_page_title')}
            description={t('login_page_description')}
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
                {label: t('breadcrumb_login'), path: process.env.PUBLIC_URL + pathname }
              ]}
          />
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ms-auto me-auto">
                  <div className="login-register-wrapper">
                    <LoginForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Fragment>
  );
};

export default Login;
