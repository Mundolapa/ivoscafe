import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../../store/slices/auth-slice";
import { useTranslation } from "react-i18next";
import { endpoints} from "../../helpers/endpoints";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";

const IconGroup = ({ iconWhiteClass }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleClick = e => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Get authentication state and user info

    const handleLogout = () => {
        endpoints.logout()
            .then((response) => {
                console.log(response.data);
                // Remove token from local storage
                localStorage.removeItem('accessToken');
                // Dispatch logout action to update Redux store
                dispatch(logoutAction());
                // Redirect to the home page
                navigate("/");
            })
            .catch((error) => {
                console.error(error);
                console.log(error.response);
                // Handle error here if logout request failed
                // e.g., show an error notification
            });
    };


    const getUserInitials = () => {
    if (isAuthenticated && user && user.first_name && user.last_name) {
      const firstNameInitial = user.first_name.charAt(0).toUpperCase();
      const lastNameInitial = user.last_name.charAt(0).toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`;
    }
    return "";
  };



  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)} >
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={e => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder={t('search')} />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={e => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
          {/* Implement user initials when login */}
          {isAuthenticated && (
              <span className="count-style">{getUserInitials()}</span>
          )}

        </button>
        <div className="account-dropdown">
          <ul>
            {isAuthenticated && (
              <>
              <li>
                  <Link to={process.env.PUBLIC_URL + "/my-account"}>
                      {t('my_account')}
                  </Link>
              </li>
                <li>
                  <Link to={process.env.PUBLIC_URL + "/"} onClick={handleLogout}>
                    {t("logout")}
                  </Link>
                </li>
                </>
            )}
            {!isAuthenticated && (
            <>
            <li>
              <Link to={process.env.PUBLIC_URL + "/login"}>
                {t('login')}
              </Link>
            </li>
            <li>
              <Link to={process.env.PUBLIC_URL + "/register"}>
                {t('register')}
              </Link>
            </li>
            </>
            )}
          </ul>
        </div>
      </div>
      <div className="same-style header-compare">
        <Link to={process.env.PUBLIC_URL + "/compare"}>
          <i className="pe-7s-shuffle" />
          <span className="count-style">
            {compareItems && compareItems.length ? compareItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style header-wishlist">
        <Link to={process.env.PUBLIC_URL + "/wishlist"}>
          <i className="pe-7s-like" />
          <span className="count-style">
            {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={e => handleClick(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>
        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};



export default IconGroup;
