import React from "react";
import { Link } from "react-router-dom";


const Product = ({title, price, stock, descripcion, image_base_64, id}) => {
  return (
    <div>
      <h2>{title}</h2>
      <img 
        src={image_base_64} 
        alt={title} 
        width={'200'} 
        />
      <span> ID: {id}</span>
      <span> Descripcion: {descripcion}</span>
      <span> Stock: {stock}</span>
      <span> Precio: ${price}</span>
      <Link to={'/product/' + id}>Ir a detalle</Link>
    </div>
  )
}

export default Product;
