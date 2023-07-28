import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../../store/slices/currency-slice"
import ErrorBoundary from "../../../helpers/ErrorBoundary";

const MobileLangCurrChange = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);

  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
    closeMobileMenu();
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
        "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
      <div className="mobile-menu-middle">
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="lang-curr-style">
            <span className="title mb-2">Choose Language </span>
            <select
                value={i18n.resolvedLanguage}
                onChange={changeLanguageTrigger}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
            </select>
          </div>
          <div className="lang-curr-style">
            <span className="title mb-2">Choose Currency</span>
            <select
                value={currency.currencyName}
                onChange={setCurrencyTrigger}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="HNL">HNL</option>
            </select>
          </div>
        </ErrorBoundary>
      </div>
  );
};

export default MobileLangCurrChange;