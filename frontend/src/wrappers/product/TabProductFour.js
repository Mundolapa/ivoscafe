import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitle from "../../components/section-title/SectionTitle";
import ProductGrid from "./ProductGridTwo";

const TabProductFour = ({ spaceBottomClass, productTabClass }) => {
    const { t } = useTranslation();
  return (
    <div className={clsx("product-area", spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText={t('product_tab_title_featured')}
          positionClass="text-center"
        />
        <Tab.Container defaultActiveKey="bestSeller">
          <Nav
            variant="pills"
            className={clsx("product-tab-list pt-35 pb-60 text-center", productTabClass)}
          >
            <Nav.Item>
              <Nav.Link eventKey="newArrival">
                <h4>{t('product_tab_new_arrival')}</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="bestSeller">
                <h4>{t('product_tab_best_seller')}</h4>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="saleItems">
                <h4>{t('product_tab_sale_items')}</h4>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGrid
                  type="new"
                  limit={4}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGrid
                  type="bestSeller"
                  limit={4}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGrid
                  type="saleItems"
                  limit={4}
                  spaceBottomClass="mb-25"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/products"}
          >
            {t('product_view_more')}
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductFour.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default TabProductFour;
