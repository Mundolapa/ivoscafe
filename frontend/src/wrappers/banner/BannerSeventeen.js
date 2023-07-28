import PropTypes from "prop-types";
import clsx from "clsx";
import BannerSeventeenSingle from "../../components/banner/BannerSeventeenSingle.js";
import useBannerData from "../../hooks/useBannerData";

const BannerSeventeen = ({ spaceBottomClass, spaceTopClass }) => {
    const bannerData = useBannerData();
  return (
    <div className={clsx("banner-area pt-60", spaceTopClass, spaceBottomClass)}>
      <div className="container-fluid">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-6 col-md-6" key={key}>
              <BannerSeventeenSingle
                data={single}
                spaceBottomClass="mb-60"
                textAlign={key % 2 === 0 ? "right" : "left"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

BannerSeventeen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerSeventeen;
