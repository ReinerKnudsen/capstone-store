import { useContext, Fragment } from 'react';
import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';

function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);
  const { title } = categoriesMap;
  return (
    <Fragment>
      {
        // .keys returns an array of all keys in the object
        Object.keys(categoriesMap).map((title) => {
          // this provides the list of products for a 'title'
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />;
        })
      }
    </Fragment>
  );
}

export default CategoriesPreview;
