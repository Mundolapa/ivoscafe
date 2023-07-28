import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {endpoints} from "../../helpers/endpoints";
import PropTypes from "prop-types";
import clsx from "clsx";

const CategoryMenu = ({ menuWhiteClass, sidebarMenu }) => {
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
            <li key={subcategory.id}>
                <Link to={process.env.PUBLIC_URL + `/${subcategory.slug}`}>
                    {subcategory.title}
                </Link>
                {subcategory.children.length > 0 && (
                    <ul className="submenu">{renderSubcategories(subcategory.children)}</ul>
                )}
            </li>
        ));
    };

    const renderCategories = () => {
        return categories.map((category) => (
            <li key={category.id}>
                {category.children.length === 0 ? (
                    <Link to={process.env.PUBLIC_URL + `/${category.slug}`}>
                        {category.title}
                    </Link>
                ) : (
                    <Link to={process.env.PUBLIC_URL + `/${category.slug}`}>
                        {category.title}
                        {sidebarMenu ? (
                            <span>
                                <i className="fa fa-angle-right"></i>
                            </span>
                        ) : (
                            <i className="fa fa-angle-down" />
                        )}
                    </Link>
                )}
                {category.children.length > 0 && (
                    <ul className="submenu">{renderSubcategories(category.children)}</ul>
                )}
            </li>
        ));
    };

    return (
        <div
            className={clsx(sidebarMenu
                ? "sidebar-menu"
                : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`)}
        >
            <nav>
                <ul>
                    <li>
                        <Link to={process.env.PUBLIC_URL + `/`}>
                            {t("home")}
                        </Link>
                    </li>
                    {/* Render categories */}
                    {renderCategories()}
                    {/* Static pages */}
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
        </div>
    );
};

CategoryMenu.propTypes = {
    menuWhiteClass: PropTypes.string,
    sidebarMenu: PropTypes.bool,
};

export default CategoryMenu;
