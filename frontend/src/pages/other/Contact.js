import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map"
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useGlobalSettings} from "../../context/GlobalSettingsContext";
import { useSelector } from "react-redux";

const Contact = () => {
  let { pathname } = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { t } = useTranslation();
  const { globals } = useGlobalSettings();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const renderSocialIcon = (link, iconName) => {
    // console.log("renderSocialIcon globals: ", globals, "link: ", link, "iconName: ", iconName);
    return (
        globals[link] && (
            <li>
              <a
                  href={globals[link]}
                  target="_blank"
                  rel="noopener noreferrer"
              >
                <i className={`fa fa-${iconName}`} />
              </a>
            </li>
        )
    );
  };

  const onSubmit = (data) => {
    console.log("onSubmit data: ", data);
  }

  return (
    <Fragment>
      <SEO
        titleTemplate={t("contact_page_title")}
        description={t("contact_page_description")}
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
            {label: t('breadcrumb_contact_us'), path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="contact-map mb-10">
              <GoogleMap lat={globals.latitude} lng={globals.longitude} zoom={globals.zoom} />
            </div>
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>{t('phone')}: {globals.website_phone}</p>
                      <p>{t('mobile')}: {globals.website_whatsapp}</p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-globe" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                          {globals.website_email}
                      </p>
                      <p>
                          {globals.site}
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>{globals.website_address}</p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      {renderSocialIcon("website_facebook", "facebook")}
                      {renderSocialIcon("website_twitter", "twitter")}
                      {renderSocialIcon("website_instagram", "instagram")}
                      {renderSocialIcon("website_youtube", "youtube")}
                      {renderSocialIcon("website_linkedin", "linkedin")}
                      {renderSocialIcon("website_telegram", "telegram")}
                      {renderSocialIcon("website_pinterest", "pinterest")}
                      {renderSocialIcon("website_tiktok", "tiktok")}
                      {renderSocialIcon("website_vimeo", "vimeo")}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7">
                <div className="contact-form">
                  <div className="contact-title mb-30">
                    <h2>{t('get_in_touch')}:</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                      <div className="col-lg-6">
                        {isAuthenticated && user ? (
                            <>
                              <label>{t('contact_your_name')}</label>
                              <p>{user.first_name } {user.last_name}</p>
                              <input name="name" type="hidden" value={user.first_name + ' ' + user.last_name} />
                            </>
                        ) : (
                            <>
                              <label>{t('contact_your_name')}</label>
                              <input
                                  type="text"
                                  {...register("name", { required: true })}
                                  placeholder={t('contact_your_name_placeholder')}
                              />
                              {errors.name && ( <p className="error">{t('contact_your_name_required')} </p> )}
                            </>
                        )}
                      </div>
                      <div className="col-lg-6">
                        {isAuthenticated && user ? (
                            <>
                              <label>{t('contact_email')}</label>
                              <p>{user.email }</p>
                              <input name="name" type="hidden" value={user.email } />
                            </>
                        ) : (
                            <>
                              <label>{t('contact_email')}</label>
                              <input
                                  type="email"
                                  {...register("email", {
                                    required: t('email_required'),
                                    pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: t('email_invalid')
                                    }
                                  })}
                                  placeholder={t('contact_email_placeholder')}
                              />
                              {errors.email && <p className="error">{errors.email.message}</p>}
                            </>
                        )}
                      </div>
                      <div className="col-lg-12">
                        <label>{t('contact_subject')}</label>
                        <input
                            type="text"
                            {...register("subject", { required: true })}
                            placeholder={t('contact_subject_placeholder')}
                        />
                        {errors.subject && ( <p className="error">{t('contact_subject_required')} </p> )}
                      </div>
                      <div className="col-lg-12">
                        <label>{t('contact_message')}</label>
                        <textarea
                            {...register("message", { required: true })}
                            placeholder={t('contact_message_placeholder')}
                            defaultValue={""}
                        />
                        {errors.message && ( <p className="error">{t('contact_message_required')} </p> )}
                        <button className="submit" type="submit">
                          {t('contact_send')}
                        </button>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default Contact;
