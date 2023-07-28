// IndividualSlider.js
import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from 'swiper';
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-five.json";
import HeroSliderFiveSingle from "../../components/hero-slider/HeroSliderFiveSingle.js";

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

const IndividualSlider = ({ index, spaceLeftClass, spaceRightClass }) => {
    const single = sliderData[index];

    return (
        <div className={clsx("slider-area", spaceLeftClass, spaceRightClass)}>
            <div className="slider-active nav-style-1">
                <Swiper options={params}>
                    <SwiperSlide>
                        <HeroSliderFiveSingle data={single} />
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

IndividualSlider.propTypes = {
    index: PropTypes.number.isRequired,
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string
};

export default IndividualSlider;
