import ProductCard from '../product-card/product-card.component';

import {
  CategoryPreviewMap,
  CategoryPreviewContainer,
  CategoryTitle,
} from './category-preview.styles';

const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </h2>
      <CategoryPreviewMap>
        {
          // this filters out all elements with the index being > 4
          // the '_' ignores the first parameter
          products
            .filter((_, idx) => idx < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        }
      </CategoryPreviewMap>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
