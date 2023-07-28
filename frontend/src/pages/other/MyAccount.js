import React, { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import SEO from "../../components/seo";
import Layout from "../../layouts/LayoutThree";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import axiosInstance from "../../helpers/axiosInstance";

const MyAccount = () => {
  let { pathname } = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const { register, watch, handleSubmit, formState: { errors } } = useForm();
  const [profileData, setProfileData] = useState({});
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedBirthDate, setSelectedBirthDate] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
      if (isAuthenticated) {
          const fetchProfileData = async () => {
              try {
                  const response = await axiosInstance.get('/accounts/profile/');
                  setProfileData(response.data);
                  setSelectedGender(response.data.gender);
                  setSelectedBirthDate(response.data.birth_date);
                  setProfileImage(response.data.image);
              } catch (error) {
                  console.error("Error fetching profile data", error);
              }
          };
            fetchProfileData();
      }
  }, [isAuthenticated]);

  const onSubmitChangePasswd = (data) => {
    // console.log(data);
    alert(JSON.stringify(data));
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="My Account"
        description="My Account page of flone react minimalist eCommerce template."
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
            {label: "Home " + user.first_name + " " + user.last_name, path: process.env.PUBLIC_URL + "/" },
            {label: "My Account", path: process.env.PUBLIC_URL + pathname }
          ]}
        />

        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ms-auto me-auto col-lg-9">
                {/* Check if user is authenticated and user object exists */}
                {isAuthenticated && user && (
                <div className="myaccount-wrapper">
                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                        <span>1 .</span> Edit your account information{" "}
                      </Accordion.Header>
                        <Accordion.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information for user with ID: {user.pk}</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>First Name</label>
                                  <input type="text" defaultValue={user.first_name} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Last Name</label>
                                  <input type="text" defaultValue={user.last_name} />
                                </div>
                              </div>
                                {profileData && (
                                    <>
                                <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                        <label>Mobile</label>
                                        <input type="text" defaultValue={profileData?.mobile || ""} />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                        <label>Birth date</label>
                                        <input
                                            type="date"
                                            value={selectedBirthDate || ""}
                                            onChange={(e) => setSelectedBirthDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                        <label>Gender</label>
                                        <select
                                            value={selectedGender || ""}
                                            onChange={(e) => setSelectedGender(e.target.value)}
                                        >
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                            <option value="NS">Not Specified</option>
                                            <option value="P">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="billing-info">
                                        <label>Profile Image</label>
                                        <div>
                                            {profileImage && (
                                                <img src={profileImage} alt="Profile" />
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                // Handle file upload logic here
                                            }}
                                        />
                                    </div>
                                </div>
                                    </>
                                )}
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                      </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                          <span>2 .</span> Change your password
                      </Accordion.Header>
                      <Accordion.Body>
                          <div className="myaccount-info-wrapper">
                            <form onSubmit={handleSubmit(onSubmitChangePasswd)}>
                              <div className="account-info-wrapper">
                                <h4>Change Password</h4>
                                <h5>Your Password</h5>
                              </div>
                              <div className="row">
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label htmlFor="password1">{t('password_new')}</label>
                                    <input
                                        type="password"
                                        {...register("password1", {
                                          required: t('password_new_required'),
                                          minLength: {
                                          value: 8,
                                            message: t('password_new_min_length')}
                                        })}
                                        placeholder={t('password_new_placeholder')}
                                    />
                                    {errors.password1 && <p>{errors.password1.message}</p>}
                                  </div>
                                </div>
                                <div className="col-lg-12 col-md-12">
                                  <div className="billing-info">
                                    <label htmlFor="password2">{t('confirm_password_new')}</label>
                                    <input
                                        type="password"
                                        {...register("password2", {
                                          required: t('confirm_password_new_required'),
                                          validate: val =>
                                            watch('password1') !== val && t('confirm_password_new_mismatch')
                                        })}
                                        placeholder={t('confirm_password_new_placeholder')}
                                    />
                                    {errors.password2 && <p>{errors.password2.message}</p>}
                                  </div>
                                </div>
                              </div>
                              <div className="billing-back-btn">
                                <div className="billing-btn">
                                  <button type="submit">Continue</button>
                                </div>
                              </div>
                            </form>
                          </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="single-my-account mb-20">
                      <Accordion.Header className="panel-heading">
                          <span>3 .</span> Modify your address book entries
                      </Accordion.Header>
                      <Accordion.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Fragment>
  );
};

export default MyAccount;
