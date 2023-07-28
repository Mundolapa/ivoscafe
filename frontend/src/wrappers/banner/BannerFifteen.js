import PropTypes from "prop-types";
import clsx from "clsx"
import BannerFifteenSingle from "../../components/banner/BannerFifteenSingle.js";
import useBannerData from "../../hooks/useBannerData";

const BannerFifteen = ({ spaceTopClass, spaceBottomClass }) => {
    const bannerData = useBannerData();
  return (
    <div className={clsx("banner-area banner-area-2 pt-60", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="custom-row-2">
          {bannerData?.map((single, key) => (
            <div className="col-xl-4 col-md-6" key={key}>
              <BannerFifteenSingle
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

BannerFifteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerFifteen;
