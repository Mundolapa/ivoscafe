import PropTypes from "prop-types";
import clsx from "clsx"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const BannerFifteenSingle = ({ data, spaceBottomClass }) => {
    const currency = useSelector((state) => state.currency);
    const price = (data.price * currency.currencyRate).toFixed(2);
  return (
    <div className={clsx("single-banner banner-green-color", spaceBottomClass)}>
      <Link to={process.env.PUBLIC_URL + data.link}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" />
      </Link>
      <div className="banner-content-9 extra-size-banner banner-position-hm15-2">
        <h3>{data.title}</h3>
        <h4>{data.banner_text} {price > 0.00 && <span>{currency.currencySymbol + price}</span>}</h4>
        <Link to={process.env.PUBLIC_URL + data.link}>
            {data.button_text}
        </Link>
      </div>
    </div>
  );
};

BannerFifteenSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default BannerFifteenSingle;
