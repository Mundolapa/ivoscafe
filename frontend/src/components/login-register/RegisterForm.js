import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import Alert from'react-bootstrap/Alert';

import {endpoints} from "../../helpers/endpoints";

const RegisterForm = () => {
    const { register, watch, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();

    // Define state variable for error
    const [errorMessage, setErrorMessage] = useState("");

    // Define state variable for username availability
    const [isEmailAvailable, setIsEmailAvailable] = useState(null);

    // Define state variable for username error
    const [emailError, setEmailError] = useState('');

    // Define state variable for username input
    const [email, setEmail] = useState('');


    useEffect(() => {
        // Add a debounce delay
        const delayDebounceCheck = setTimeout(() => {
            if (email) {
                // Define checkEmailAvailability here
                const checkEmailAvailability = () => {
                    endpoints.checkEmail(email)
                        .then(response => {
                            if (response.data.available) {
                                setIsEmailAvailable(true);
                                setEmailError(""); // Clear username error
                            } else {
                                setIsEmailAvailable(false);
                                setEmailError(t('email_not_available'));
                            }
                        })
                        .catch(error => {
                            console.error(error);
                            setEmailError(t('email_check_failed'));
                        });
                };
                checkEmailAvailability();
            }
        }, 1000);

        return () => {
            clearTimeout(delayDebounceCheck);
        };
    }, [email, t, setIsEmailAvailable, setEmailError]);

    const onSubmit = (data) => {
        const payload = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            password1: data.password1,
            password2: data.password2,
        };

        if(isEmailAvailable === false){
            setErrorMessage(t('username_taken'));
            return;
        }

        // console.log(payload);
        endpoints.registration(payload)
            .then(response => {
                console.log(response.data);
                setErrorMessage(""); // clear error message if request was successful
                // Redirect to the login page
                navigate('/login');
            })
            .catch(error => {
                console.error(error);
                let message = t('error_registration');
                // check if the response exists and has a non-empty data property
                if (error.response && error.response.data && Object.keys(error.response.data).length > 0) {
                    // you might need to adjust this according to your API error structure
                    message = error.response.data.detail || error.response.data.message || message;
                }
                setErrorMessage(message); // set error message if request failed
            });
    };

    return (
        <div className="login-form-container">
            {/* Only display Alert if there is an error message */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <div className="login-register-form">
                <div className="title_box">
                    <h2>{t('register')}</h2>
                    <Link to={process.env.PUBLIC_URL + "/login"}>
                        {t('login')}
                    </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <label htmlFor="email">{t('email')}</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: t('email_required'),
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: t('email_invalid')
                            }
                        })}
                        placeholder={t('email_placeholder')}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    {emailError && <p>{emailError}</p>}

                    <label htmlFor="first_name">{t('first_name')}</label>
                    <input
                        type="text"
                        {...register("first_name", { required: true })}
                        placeholder={t('first_name_placeholder')}
                    />
                    {errors.first_name && <p>{t('first_name_required')}</p>}

                    <label htmlFor="last_name">{t('last_name')}</label>
                    <input
                        type="text"
                        {...register("last_name", { required: true })}
                        placeholder={t('last_name_placeholder')}
                    />
                    {errors.last_name && <p>{t('last_name_required')}</p>}

                    <label htmlFor="password1">{t('password')}</label>
                    <input
                        type="password"
                        {...register("password1", {
                            required: t('password_required'),
                            minLength: {
                                value: 8,
                                message: t('password_min_length')
                            }
                        })}
                        placeholder={t('password_placeholder')}
                    />
                    {errors.password1 && <p>{errors.password1.message}</p>}

                    <label htmlFor="password2">{t('confirm_password')}</label>
                    <input
                        type="password"
                        {...register("password2", {
                            required: t('confirm_password_required'),
                            validate: val =>
                                watch('password1') !== val && t('confirm_password_mismatch')
                        })}
                        placeholder={t('confirm_password_placeholder')}
                    />
                    {errors.password2 && <p>{errors.password2.message}</p>}

                    <div className="button-box">
                        <button type="submit">
                            <span>{t('register')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
