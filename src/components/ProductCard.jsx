import React from 'react'

const ProductCard = ({ product: { id, image, title, category, price } }) => {
  return (
    <li>
      <img src={image} alt={title} />
      <div>
        <h3>{title}</h3>
        <p>{`₩${price}`}</p>
      </div>
    </li>
  )
}

export default ProductCard
