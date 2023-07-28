import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {useForm} from 'react-hook-form';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../../store/slices/auth-slice';
import Alert from 'react-bootstrap/Alert';

import {endpoints} from "../../helpers/endpoints";

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch();

    // Define state variable for error
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (data) => {
        const payload = {
            email: data.email,
            password: data.password,
        };
        if (rememberMe) {
            payload.rememberMe = rememberMe;
        }
        // console.log(payload);
        endpoints.login(payload)
            .then((response) => {
                console.log(response.data);
                setErrorMessage(""); // Clear error message if request was successful

                const { access, refresh, user } = response.data;

                // Dispatch the loginSuccess action with the access token, refresh token, and user information
                dispatch(loginSuccess({ access, refresh, user }));

                // Redirect the user to the desired page (e.g., dashboard, home)
                navigate('/my-account'); // Replace '/dashboard' with the desired URL
            })
            .catch((error) => {
                console.error(error);
                console.log(error.response);
                let message = t('error_login');
                // Check if the response exists and has a non-empty data property
                if (error.response && error.response.data && Object.keys(error.response.data).length > 0) {
                    // Use the first error message from the non_field_errors array
                    const errorMessage = error.response.data.non_field_errors[0];
                    message += `; ${errorMessage}`;
                }
                setErrorMessage(message); // Set error message if request failed
            });
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <div className="login-form-container">
            {/* Only display Alert if there is an error message */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <div className="login-register-form">
                <div className="title_box">
                    <h2>{t('login')}</h2>
                    <Link to={process.env.PUBLIC_URL + "/register"}>
                        {t('sing_up')}
                    </Link>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label htmlFor="email">{t('email')}</label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder={t('email_placeholder')}
                    />
                    {errors.email && <p>{t('email_required')}</p>}

                    <label htmlFor="password">{t('password')}</label>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder={t('password_placeholder')}
                    />
                    {errors.password && <p>{t('password_required')}</p>}

                    <div className="button-box">
                        <div className="login-toggle-btn">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleRememberMeChange}
                            />
                            <label className="ml-10">{t('remember_me')}</label>
                            <Link to={process.env.PUBLIC_URL + "/"}>
                                {t('forgot_password')}
                            </Link>
                        </div>
                        <button type="submit">
                            <span>{t('login')}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
