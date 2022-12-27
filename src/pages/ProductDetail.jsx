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
    <>
      <p className="mx-12 mt-4 text-gray-700">{category}</p>
      <section className="flex flex-col md:flex-row p-4">
        <img className="w-full px-4 basis-7/12" src={image} alt={title} />
        <div className="w-full basis-5/12 flex flex-col p-4">
          <h2 className="text-3xl font-bold py-2">{title}</h2>
          <p className="text-2xl font-bold py-2 border-b border-gray-400">₩{price}</p>
          <p className="py-4 te  xt-lg">{description}</p>
          <div className="flex items-center">
            <label className="text-brand font-bold" htmlFor="select">
              옵션:
            </label>
            <select
              className="p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none"
              id="select"
              onChange={onChangeSelect}
              value={selected}
            >
              {options && options.map((option, idx) => <option key={idx}>{option}</option>)}
            </select>
          </div>
          <Button onClick={onAddCart}>장바구니에 추가</Button>
        </div>
      </section>
    </>
  )
}

export default ProductDetail
