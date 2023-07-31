import PropTypes from "prop-types";
import clsx from "clsx";
import {EffectFade} from 'swiper';
import Swiper, {SwiperSlide} from "../../components/swiper";
import HeroSlider from "../../components/hero-slider";
import { useTranslation } from "react-i18next";
import {endpoints} from "../../helpers/endpoints"
import {useEffect, useState} from "react";

const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true,
  autoHeight: false
};

const HeroSliderFive = ({ spaceLeftClass, spaceRightClass }) => {
  const [sliders, setSliders] = useState([]);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await endpoints.sliders(i18n.language);
        setSliders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSliders();
  }, [i18n.language]);

  const publicSliders = sliders.filter(slider => slider.public === true);

  return (
      <div className={clsx("slider-area", spaceLeftClass, spaceRightClass)}>
        <div className="slider-active nav-style-2 bg-gray-2">
          {publicSliders && (
              <Swiper options={params}>
                {publicSliders.map((single, key) => (
                    <SwiperSlide key={key}>
                      <HeroSlider
                          data={single}
                      />
                    </SwiperSlide>
                ))}
              </Swiper>
          )}
        </div>
      </div>
  );
};

HeroSliderFive.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default HeroSliderFive;
