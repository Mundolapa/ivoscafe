import {Link} from "react-router-dom";
import { useSelector } from "react-redux";
import {useTranslation} from "react-i18next";

const PromoBanner = ({data}) => {
    const { t } = useTranslation();
    const currency = useSelector((state) => state.currency);
    const price = (data.price * currency.currencyRate).toFixed(2);
    const discount = (data.discount * 100).toFixed(0) + "%";
    return (
        <div className="single-banner mb-20">
            <Link to={process.env.PUBLIC_URL + data.link}>
                <img src={process.env.PUBLIC_URL + data.image} alt=""/>
            </Link>
            <div className="banner-content-4 banner-position-hm15-2">
                <div className="banner-content-4--transbox">
                    <span>{discount} {t('discount')}</span>
                    <h2>{data.title}</h2>
                    <h5>
                        {data.banner_text}<br />
                        <span> {price > 0.00 && (
                              <span style={{textDecoration: "line-through", color: "#C4C4C4"}}>
                              {currency.currencySymbol+ price}
                            </span>
                          )} {price > 0.00 && data.discount > 0.00 && (
                                                        <span style={{marginLeft: "5px"}}>
                              {currency.currencySymbol + (price * (1 - data.discount)).toFixed(2)}
                            </span>
                            )}
                        </span>
                    </h5>
                </div>
                <Link to={process.env.PUBLIC_URL + data.link}>
                    {data.button_text}
                </Link>
            </div>
        </div>
    );
};

export default PromoBanner;
