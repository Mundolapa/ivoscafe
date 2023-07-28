import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useGlobalSettings } from "../../context/GlobalSettingsContext";

const FooterTwo = ({
                       backgroundColorClass,
                       copyrightColorClass,
                       spaceLeftClass,
                       spaceRightClass,
                       footerTopBackgroundColorClass,
                       footerTopSpaceTopClass,
                       footerTopSpaceBottomClass,
                       backgroundImage,
                   }) => {
    const {globals} = useGlobalSettings();
    // console.log("FooterTwo globals: ", globals);

    const renderSocialIcon = (link, iconName) => {
        // console.log("renderSocialIcon globals: ", globals, "link: ", link, "iconName: ", iconName);
        return (
            globals[link] && (
                <li>
                    <a
                        href={globals[link]}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <i className={`fa fa-${iconName}`} />
                    </a>
                </li>
            )
        );
    };

    return (
        <footer
            className={clsx(
                "footer-area",
                backgroundColorClass,
                spaceLeftClass,
                spaceRightClass,
                backgroundImage && "bg-img"
            )}
            style={{
                backgroundImage: `${
                    backgroundImage
                        ? `url(${process.env.PUBLIC_URL + backgroundImage})`
                        : `url()`
                }`,
            }}
        >
            <div
                className={clsx(
                    "footer-top text-center",
                    footerTopBackgroundColorClass,
                    footerTopSpaceTopClass,
                    footerTopSpaceBottomClass
                )}
            >
                <div className="container">
                    <div className="footer-logo">
                        <Link to={process.env.PUBLIC_URL}>
                            <img
                                alt=""
                                src={globals.website_logo}
                                style={{ width: "250px", height: "auto" }} // Apply inline styles
                            />
                        </Link>
                    </div>
                    <p>{globals.website_footer_text}</p>
                    <div className="footer-social">
                        <ul>
                            {renderSocialIcon("website_facebook", "facebook")}
                            {renderSocialIcon("website_twitter", "twitter")}
                            {renderSocialIcon("website_instagram", "instagram")}
                            {renderSocialIcon("website_youtube", "youtube")}
                            {renderSocialIcon("website_linkedin", "linkedin")}
                            {renderSocialIcon("website_telegram", "telegram")}
                            {renderSocialIcon("website_pinterest", "pinterest")}
                            {renderSocialIcon("website_tiktok", "tiktok")}
                            {renderSocialIcon("website_vimeo", "vimeo")}
                            {renderSocialIcon("website_tripadvisor", "tripadvisor")}
                            {renderSocialIcon("website_ioverlander", "map-signs")}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom text-center">
                <div className="container">
                    <div className={clsx("copyright-2", copyrightColorClass)}>
                        <p>
                            &copy; {new Date().getFullYear()} {globals.website_copyright}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

FooterTwo.propTypes = {
    backgroundColorClass: PropTypes.string,
    copyrightColorClass: PropTypes.string,
    footerLogo: PropTypes.string,
    backgroundImage: PropTypes.string,
    footerTopBackgroundColorClass: PropTypes.string,
    footerTopSpaceBottomClass: PropTypes.string,
    footerTopSpaceTopClass: PropTypes.string,
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string,
};

export default FooterTwo;
