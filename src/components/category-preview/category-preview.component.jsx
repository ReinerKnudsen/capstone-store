import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
      <h2>
        <Link className='title' to={title}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className='preview'>
        {
          // this filters out all elements with the index being > 4
          // the '_' ignores the first parameter
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </div>
    </div>
  );
};

export default CategoryPreview;
