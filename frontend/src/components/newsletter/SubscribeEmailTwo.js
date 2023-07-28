import PropTypes from "prop-types";
import clsx from "clsx";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import { useTranslation } from "react-i18next";

const CustomForm = ({
  status,
  message,
  onValidated,
  spaceTopClass,
  subscribeBtnClass
}) => {
  let email;
  const submit = () => {
    email &&
      email.value.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email.value
      });

    email.value = "";
  };
  const { t } = useTranslation();

  return (
    <div className={clsx("subscribe-form-3", spaceTopClass)}>
      <div className="mc-form">
        <div>
          <input
            className="email"
            ref={node => (email = node)}
            type="email"
            placeholder={t('newsletter_placeholder')}
            required
          />
        </div>
        {status === "sending" && (
          <div style={{ color: "#3498db", fontSize: "12px" }}>sending...</div>
        )}
        {status === "error" && (
          <div
            style={{ color: "#e74c3c", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        {status === "success" && (
          <div
            style={{ color: "#2ecc71", fontSize: "12px" }}
            dangerouslySetInnerHTML={{ __html: message }}
          />
        )}
        <div
          className={`clear-3 ${subscribeBtnClass ? subscribeBtnClass : ""}`}
        >
          <button className="button" onClick={submit}>
            {t('newsletter_subscribe')}
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscribeEmailTwo = ({
  mailchimpUrl,
  spaceTopClass,
  subscribeBtnClass
}) => {
  return (
    <div>
      <MailchimpSubscribe
        url={mailchimpUrl}
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={formData => subscribe(formData)}
            spaceTopClass={spaceTopClass}
            subscribeBtnClass={subscribeBtnClass}
          />
        )}
      />
    </div>
  );
};

SubscribeEmailTwo.propTypes = {
  mailchimpUrl: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SubscribeEmailTwo;
