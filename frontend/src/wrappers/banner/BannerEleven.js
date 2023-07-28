import PropTypes from "prop-types";
import clsx from "clsx";
import BannerElevenSingle from "../../components/banner/BannerElevenSingle.js";
import useBannerData from "../../hooks/useBannerData";

const BannerEleven = ({ spaceBottomClass }) => {
    const bannerData = useBannerData();
  return (
    <div className={clsx("banner-area pt-60", spaceBottomClass)}>
      <div className="row no-gutters">
        {bannerData?.map((single, key) => (
          <div className="col-lg-6 col-md-6" key={key}>
            <BannerElevenSingle data={single} textAlign={key % 2 === 0 ? "right" : "left"} spaceBottomClass="mb-60" />
          </div>
        ))}
      </div>
    </div>
  );
};

BannerEleven.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default BannerEleven;
