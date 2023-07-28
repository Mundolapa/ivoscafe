import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";
import ErrorBoundary from "../../helpers/ErrorBoundary";
import { useGlobalSettings } from "../../context/GlobalSettingsContext";
import {useTranslation} from "react-i18next";

const HeaderTop = ({ borderStyle }) => {
    const currency = useSelector((state) => state.currency);
    const { globals } = useGlobalSettings();
    const { t } = useTranslation();
    return (
        <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
            <ErrorBoundary fallback={<p>Something went wrong</p>}>
                <LanguageCurrencyChanger whatsappNumber={globals.website_whatsapp} currency={currency} />
                <div className="header-offer">
                    {globals.free_delivery ? (
                        <p>
                            {t('free_delivery')}{" "}
                            <span>
                                {currency.currencySymbol + (globals.free_delivery_amount * currency.currencyRate).toFixed(2)}
                            </span>
                        </p>
                    ) : null}
                </div>
            </ErrorBoundary>
        </div>
    );
};

HeaderTop.propTypes = {
    whatsappNumber: PropTypes.string,
    borderStyle: PropTypes.string,
};

export default HeaderTop;
