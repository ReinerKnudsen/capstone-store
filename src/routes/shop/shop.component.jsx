import { Route, Routes } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';

function Shop() {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />

      {/* by setting a parameter we can create a dynamic route.
          the parameter is available in the target component */}
      <Route path=':category' element={<Category />} />
    </Routes>
  );
}

export default Shop;
