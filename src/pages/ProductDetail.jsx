import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Button from '../components/UI/Button'

const DEFAULT_SELECT_VALUE = 0

const ProductDetail = () => {
  const {
    state: {
      product: { id, title, image, description, category, price, options },
    },
  } = useLocation()

  const [selected, setSelected] = useState(DEFAULT_SELECT_VALUE)

  const onChangeSelect = (e) => {
    setSelected(e.target.value)
  }

  const onAddCart = (e) => {}

  return (
    <section>
      <p>{category}</p>
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <p>₩{price}</p>
        <p>{description}</p>
        <p>옵션:</p>
        <select onChange={onChangeSelect} value={selected}>
          {options && options.map((option, idx) => <option key={idx}>{option}</option>)}
        </select>
      </div>
      <Button onClick={onAddCart}>장바구니에 추가</Button>
    </section>
  )
}

export default ProductDetail
