import React from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
import { setProducts } from "./store/slices/product-slice";
import { endpoints } from "./helpers/endpoints";
import { i18n, i18nPromise } from './i18n';
import './plugins/animate/animate.css';
import 'swiper/swiper-bundle.min.css';
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import { GlobalSettingsProvider } from "./context/GlobalSettingsContext";

async function fetchAndSetProducts() {
    try {
        const response = await endpoints.products(i18n.language);
        if (response.status === 200) {
            store.dispatch(setProducts(response.data));
        } else {
            console.error(`Failed to fetch products: ${response.statusText}`);
        }
    } catch (error) {
        console.error(`Failed to fetch products: ${error}`);
    }
}

// Wait for i18next to initialize before fetching products
i18nPromise.then(() => {
    fetchAndSetProducts();

    // fetch products whenever the language is changed
    i18n.on('languageChanged', fetchAndSetProducts);

    // ...

});

// fetch products whenever the language is changed
i18n.on('languageChanged', fetchAndSetProducts);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <Provider store={store}>
        <GlobalSettingsProvider>
            <PersistProvider>
                <App />
            </PersistProvider>
        </GlobalSettingsProvider>
    </Provider>
);
