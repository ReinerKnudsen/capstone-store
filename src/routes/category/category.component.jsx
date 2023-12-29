import { useContext, useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const { categoriesMap } = useContext(CategoriesContext);

  // We could use the below function to get the products. This will run everytime
  // the component renders. Instead we only want to run this if category or categoryMap
  // change; that calls for useEffect!
  // 		const products = categoriesMap[category]

  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  const { title } = categoriesMap;

  return (
    <Fragment>
      <h2 className='category-title'>{category.toUpperCase()}</h2>
      <div className='category-container'>
        {/* we introduce the 'products &&' to make sure the ProductCard only renders
					when the products are actually available; this prevents issues when we first
					render and the call to firebase hasn't finished yet
			*/}
        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>
    </Fragment>
  );
};

export default Category;
