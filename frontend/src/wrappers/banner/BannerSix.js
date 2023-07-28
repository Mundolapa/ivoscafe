import PropTypes from "prop-types";
import clsx from "clsx";
import PromoBanner from "../../components/banner/BannerSixPromo";
import NormalBanner from "../../components/banner/BannerSixSingle";
import useBannerData from "../../hooks/useBannerData";

const BannerSix = ({ spaceTopClass, spaceBottomClass }) => {
  const bannerData = useBannerData();
  const promoBanner = bannerData?.find(banner => banner.promo === true);
  const normalBanners = bannerData?.filter(banner => banner.promo === false);

  return (
      <div className={clsx("banner-area pt-60 mb-40", spaceTopClass, spaceBottomClass)}>
        <div className="container padding-20-row-col">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              {promoBanner && <PromoBanner data={promoBanner} />}
            </div>
            <div className="col-lg-6 col-md-6">
              {normalBanners?.map((single, key) => (
                  <NormalBanner key={key} data={single} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

BannerSix.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerSix;
