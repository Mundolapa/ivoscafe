import PropTypes from "prop-types";
import clsx from "clsx";
import BannerFiveSingle from "../../components/banner/BannerFiveSingle";
import PromoBanner from "../../components/banner/BannerFivePromo";
import useBannerData from "../../hooks/useBannerData";

const BannerFive = ({ spaceTopClass, spaceBottomClass }) => {
  const bannerData = useBannerData();
  const promoBanner = bannerData?.find(banner => banner.promo === true);
  const normalBanners = bannerData?.filter(banner => banner.promo === false);
  return (
      <div className={clsx("banner-area hm9-section-padding pt-60 mb-40", spaceTopClass, spaceBottomClass)}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="row">
                {normalBanners?.slice(0, 2).map((single, key) => (
                    <div className="col-lg-12" key={key}>
                      <BannerFiveSingle data={single} />
                    </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              {/* Promo banner */}
              {promoBanner && <PromoBanner data={promoBanner} />}
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="row">
                {normalBanners?.slice(2).map((single, key) => (
                    <div className={`col-lg-12 col-md-${key % 2 === 0 ? 6 : 6}`} key={key}>
                      <BannerFiveSingle data={single} />
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

BannerFive.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerFive;
