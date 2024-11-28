import React from "react";
import Product from "../Product/Product";

const ProductList = ({ products }) => {
  return products.map((product) => {
    return <Product key={product.id} {...product} />;
  });
};

export default ProductList;
