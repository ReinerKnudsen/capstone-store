import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDcouments } from '../utils/firebase.utils.jsx';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoryMap = async () => {
      const categoryMap = await getCategoriesAndDcouments();
      setCategoriesMap(categoryMap);
    };
    getCategoryMap();
  }, []);

  const value = { categoriesMap };
  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>;
};
