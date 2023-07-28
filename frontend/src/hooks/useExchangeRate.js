// hooks/useExchangeRate.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useGlobalSettings } from "../context/GlobalSettingsContext";

export const useExchangeRate = (currency) => {
    const [currencyRate, setCurrencyRate] = useState(1);
    const { globals } = useGlobalSettings();

    useEffect(() => {
        const fetchExchangeRate = async () => {
            if (currency && globals) {
                try {
                    const response = await axios.get(
                        `https://v6.exchangerate-api.com/v6/${globals.exchange_rate_api_key}/latest/${currency.code}`
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
    }, [currency, globals]);

    return currencyRate;
};
