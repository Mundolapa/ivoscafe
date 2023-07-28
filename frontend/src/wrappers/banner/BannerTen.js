import PropTypes from "prop-types";
import clsx from "clsx";
import BannerTenSingle from "../../components/banner/BannerTenSingle.js";
import useBannerData from "../../hooks/useBannerData";

const BannerTen = ({ spaceTopClass, spaceBottomClass }) => {
    const bannerData = useBannerData();
  return (
    <div className={clsx("banner-area pt-60 banner-area-2", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row gx-md-4 gx-lg-2">
          {bannerData?.map((single, key) => (
            <div className="col-xl-3 col-md-6" key={key}>
              <BannerTenSingle
                spaceBottomClass="mb-60"
                data={single}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerTen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerTen;
