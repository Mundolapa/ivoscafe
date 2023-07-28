import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { endpoints } from "../../../helpers/endpoints";

const MobileNavMenu = () => {
  const [categories, setCategories] = useState([]);
    const { i18n, t } = useTranslation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await endpoints.categories(i18n.language);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, [i18n.language]);

  const renderSubcategories = (subcategories) => {
    return subcategories.map((subcategory) => (
        <li key={subcategory.id} {...(subcategory.children.length > 0 ? { className: "menu-item-has-children" } : {})}>
          <Link to={process.env.PUBLIC_URL + `/products/category/${subcategory.id}`}>
            {subcategory.title}
          </Link>
          {subcategory.children.length > 0 && (
              <ul className="sub-menu">{renderSubcategories(subcategory.children)}</ul>
          )}
        </li>
    ));
  };

  const renderCategories = () => {
    return categories.map((category) => (
        <li key={category.id} {...(category.children.length > 0 ? { className: "menu-item-has-children" } : {})}>
          <Link to={process.env.PUBLIC_URL + `/products/category/${category.id}`}>
            {category.title}
          </Link>
          {category.children.length > 0 && (
              <ul className="sub-menu">{renderSubcategories(category.children)}</ul>
          )}
        </li>
    ));
  };

  return (
      <nav className="offcanvas-navigation" id="offcanvas-navigation">
        <ul>
            <li>
                <Link to={process.env.PUBLIC_URL + `/`}>
                    {t("home")}
                </Link>
            </li>
          {/* Other menu items */}

          {/* Render categories */}
          {renderCategories()}

          {/* Other menu items */}
            {/* About */}
            <li>
                <Link to={process.env.PUBLIC_URL + `/${i18n.language === 'en' ? 'about' : 'acerca-de'}`}>
                    {t('about_us')}
                </Link>
            </li>

            {/* Contact */}
            <li>
                <Link to={process.env.PUBLIC_URL + `/${i18n.language === 'en' ? 'contact' : 'contactenos'}`}>
                    {t('contact_us')}
                </Link>
            </li>
        </ul>
      </nav>
  );
};

export default MobileNavMenu;
