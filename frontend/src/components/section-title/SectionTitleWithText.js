import PropTypes from "prop-types";
import clsx from "clsx";
import { useGlobalSettings } from "../../context/GlobalSettingsContext";
import { useTranslation } from "react-i18next";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
    const { globals } = useGlobalSettings();
    const { t } = useTranslation();
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h5>{t('about_us_title')}</h5>
          <h1>{t('about_us_subtitle')}</h1>
          <p>
            {globals.website_about_us}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
