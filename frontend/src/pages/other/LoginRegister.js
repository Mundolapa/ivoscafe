import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";
import LoginForm from "../../components/login-register/LoginForm"
import RegisterForm from "../../components/login-register/RegisterForm";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const { t } = useTranslation();

  return (
      <Fragment>
        <SEO
            titleTemplate={t('login_register_page_title')}
            description={t('login_register_page_description')}
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
                {label: t('breadcrumb_login_register'), path: process.env.PUBLIC_URL + pathname }
              ]}
          />
          <div className="login-register-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-7 col-md-12 ms-auto me-auto">
                  <div className="login-register-wrapper">
                    <Tab.Container defaultActiveKey="login">
                      <Nav variant="pills" className="login-register-tab-list">
                        <Nav.Item>
                          <Nav.Link eventKey="login">
                            <h4>{t('login')}</h4>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="register">
                            <h4>{t('register')}</h4>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <Tab.Pane eventKey="login">
                          <LoginForm />
                        </Tab.Pane>
                        <Tab.Pane eventKey="register">
                          <RegisterForm />
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </Fragment>
  );
};

export default LoginRegister;
