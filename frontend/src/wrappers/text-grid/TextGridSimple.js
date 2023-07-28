import PropTypes from "prop-types";
import clsx from "clsx";
import { useGlobalSettings} from "../../context/GlobalSettingsContext";
import { useTranslation} from "react-i18next";

const TextGridSimple = ({ spaceBottomClass }) => {
    const {globals} = useGlobalSettings();
    const {t} = useTranslation();
  return (
    <div className={clsx("about-mission-area", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4">
              <div className={clsx("single-mission", spaceBottomClass)}>
                  <h3>{t('about_us_our_vision')}</h3>
                  <p>{globals.website_our_vision}</p>
              </div>
          </div>
            <div className="col-lg-4 col-md-4">
                <div className={clsx("single-mission", spaceBottomClass)}>
                    <h3>{t('about_us_our_mission')}</h3>
                    <p>{globals.website_our_mission}</p>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className={clsx("single-mission", spaceBottomClass)}>
                    <h3>{t('about_us_our_goals')}</h3>
                    <p>{globals.website_our_goals}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

TextGridSimple.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default TextGridSimple;
