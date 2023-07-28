import React, { useContext } from 'react';
import { LanguageContext } from './LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="es">Español</option>
      {/* Add more languages as needed */}
    </select>
  );
};

export default LanguageSwitcher;
