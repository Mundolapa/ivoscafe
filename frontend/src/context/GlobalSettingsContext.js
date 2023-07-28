// import PropTypes from "prop-types";
import { createContext, useContext, useMemo, useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { endpoints } from "../helpers/endpoints";

const GlobalSettingsContext = createContext();

export const useGlobalSettings = () => {
    const context = useContext(GlobalSettingsContext);

    if (context === undefined) {
        throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
    }

    return context;
};

export const GlobalSettingsProvider = ({ children }) => {
    const [globalConfig, setGlobalConfig] = useState({});
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation(); // get i18n instance

    useEffect(() => {
        const fetchGlobals = async () => {
            try {
                const response = await endpoints.globals(i18n.language); // use current language
                const [globalSettings] = response.data;
                setGlobalConfig(globalSettings);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchGlobals();
    }, [i18n.language]); // trigger re-fetch when language changes

    const value = useMemo(() => ({ globals: globalConfig, loading }), [globalConfig, loading]);

    return (
        <GlobalSettingsContext.Provider value={value}>
            {children}
        </GlobalSettingsContext.Provider>
    );
};

export { GlobalSettingsContext };
