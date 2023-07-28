import PropTypes from "prop-types";
import clsx from "clsx";
import CountdownTimer from "../../components/countdown";
import { useTranslation } from "react-i18next";

const CountDownEight = ({
  backgroundImage,
  spaceTopClass,
  spaceBottomClass
}) => {
    const { t } = useTranslation();
  return (
    <div
      className={clsx("funfact-area funfact-valentine bg-img", spaceTopClass, spaceBottomClass)}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + backgroundImage})`
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 ms-auto me-auto">
            <div className="funfact-content text-center">
              <h2>{t('countdown_title_start_in')}</h2>
              <div className="timer">
                <CountdownTimer date="August 15, 2023 00:00:00" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDownEight.propTypes = {
  backgroundImage: PropTypes.string,
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CountDownEight;
