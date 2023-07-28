import { useState, useEffect } from 'react';
import { useTranslation } from'react-i18next';
import { endpoints } from "../helpers/endpoints";

const useBannerData = () => {
    const [bannerData, setBannerData] = useState([]);
    const { i18n } = useTranslation();

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                const response = await endpoints.banners(i18n.language);
                setBannerData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchBannerData();
    }, [i18n.language]);

    return bannerData;
};

export default useBannerData;
