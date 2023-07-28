import React from "react";
import BannerFourSingle from "../../components/banner/BannerFourSingle.js";
import useBannerData from "../../hooks/useBannerData";

const BannerFour = () => {
    const bannerData = useBannerData();
  return (
    <div className="banner-area bg-white pt-60">
      <div className="container">
        <div className="row">
          {bannerData?.map((single, key) => (
            <div className="col-lg-4 col-md-4" key={key}>
              <BannerFourSingle
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

export default BannerFour;
