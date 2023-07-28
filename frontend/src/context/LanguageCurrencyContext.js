import { createContext, useState, useMemo, useContext, useEffect } from "react";
import axios from "axios";

const LanguageCurrencyContext = createContext();

export const useLanguageCurrency = () => {
    return useContext(LanguageCurrencyContext);
};

export const LanguageCurrencyProvider = ({ children }) => {
    const storedLanguage = localStorage.getItem("language");

    const [language, setLanguage] = useState(storedLanguage ? storedLanguage : "en");
    const [currency, setCurrency] = useState(() => {
        const storedCurrency = localStorage.getItem("currency");

        if (storedCurrency) {
            try {
                return JSON.parse(storedCurrency);
            } catch (error) {
                // Invalid JSON in local storage
            }
        }

        // Fallback to default currency if not found or invalid JSON
        const defaultCurrency = { code: "USD", symbol: "$" };
        localStorage.setItem("currency", JSON.stringify(defaultCurrency));
        return defaultCurrency;
    });
    const [currencyRate, setCurrencyRate] = useState(1);

    useEffect(() => {
        localStorage.setItem("language", language);
        localStorage.setItem("currency", JSON.stringify(currency));
    }, [language, currency]);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            if (currency) {
                try {
                    const response = await axios.get(
                        `https://v6.exchangerate-api.com/v6/08a436d5d621c6206c2e37f0/latest/${currency.code}`
                    );
                    if (response.data && response.data.conversion_rates) {
                        setCurrencyRate(response.data.conversion_rates.USD);
                    } else {
                        console.error("Error fetching exchange rate: Unexpected API response");
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchExchangeRate();
    }, [currency]);

    const value = useMemo(
        () => ({ language, setLanguage, currency, setCurrency, currencyRate }),
        [language, currency, currencyRate]
    );

    return (
        <LanguageCurrencyContext.Provider value={value}>
            {children}
        </LanguageCurrencyContext.Provider>
    );
};

export { LanguageCurrencyContext };
