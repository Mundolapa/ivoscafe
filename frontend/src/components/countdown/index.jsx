import clsx from "clsx";
import PropTypes from "prop-types";
import useCountdown from "../../hooks/use-countdown";
import DateTimeDisplay from "./date-time-display"
import { useTranslation} from "react-i18next";


const CountdownTimer = ({ date, className }) => {
    const [days, hours, minutes, seconds] = useCountdown(date);
    const { t } = useTranslation();

    return (
        <div
            className={clsx("timer timer-style", className)}
        >
            <DateTimeDisplay value={days} type={t('countdown_title_days')} />
            <DateTimeDisplay value={hours} type={t('countdown_title_hours')} />
            <DateTimeDisplay value={minutes} type={t('countdown_title_minutes')} />
            <DateTimeDisplay value={seconds} type={t('countdown_title_seconds')} />
        </div>
    );
};

CountdownTimer.propTypes = {
    date: PropTypes.string.isRequired,
    className: PropTypes.string,
}


export default CountdownTimer;