import PropTypes from "prop-types";
import clsx from "clsx"
import BannerThreeSingle from "../../components/banner/BannerThreeSingle.js";
import useBannerData from "../../hooks/useBannerData";

const BannerThree = ({ spaceBottomClass }) => {
    const bannerData = useBannerData();
  return (
    <div className={clsx("banner-area pt-60", spaceBottomClass)}>
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) =>  (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerThreeSingle
                data={single}
                spaceBottomClass="mb-60"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerThree.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerThree;
