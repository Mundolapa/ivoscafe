import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import { setCurrency } from "../../../store/slices/currency-slice"

const LanguageCurrencyChanger = ({whatsappNumber, currency}) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
  };

  const renderWhatsappNumber = () => {
    return (
        <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>{" "}
          Whatsapp
        </a>
    );
  }

  return (
      <div className="language-currency-wrap">
        <div className="same-language-currency language-style">
      <span>
        {i18n.resolvedLanguage === "en"
            ? "English"
            : i18n.resolvedLanguage === "es"
                ? "Español"
                : ""}{" "}
        <i className="fa fa-angle-down" />
      </span>
          <div className="lang-car-dropdown">
            <ul>
              <li>
                <button value="en" onClick={e => changeLanguageTrigger(e)}>
                  English
                </button>
              </li>
              <li>
                <button value="es" onClick={e => changeLanguageTrigger(e)}>
                  Español
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="same-language-currency use-style">
        <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span>
          <div className="lang-car-dropdown">
            <ul>
              <li>
                <button value="USD" onClick={e => setCurrencyTrigger(e)}>
                  USD
                </button>
              </li>
              <li>
                <button value="EUR" onClick={e => setCurrencyTrigger(e)}>
                  EUR
                </button>
              </li>
              <li>
                <button value="HNL" onClick={e => setCurrencyTrigger(e)}>
                  HNL
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="same-language-currency">
          {renderWhatsappNumber()}
        </div>
      </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currency: PropTypes.shape({}),
  whatsappNumber: PropTypes.string,
};

export default LanguageCurrencyChanger;
