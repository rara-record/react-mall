import React, { useState } from 'react'
import Button from '../components/UI/Button'

export default function NewProduct() {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState()

  const onChangeInput = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setFile(files && files[0])
      console.log(files[0])
      return
    }
    setProduct((product) => ({ ...product, [name]: value }))
  }
  const onSubmit = (e) => {}

  return (
    <section>
      <h2>새로운 제품 등록</h2>
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" name="file" required onChange={onChangeInput} />
        <input
          type="text"
          name="title"
          value={product.title ?? ''}
          placeholder="제품명"
          required
          onChange={onChangeInput}
        />
        <input
          type="number"
          name="price"
          value={product.price ?? ''}
          placeholder="가격"
          required
          onChange={onChangeInput}
        />
        <input
          type="text"
          name="category"
          value={product.category ?? ''}
          placeholder="카테고리"
          required
          onChange={onChangeInput}
        />
        <input
          type="text"
          name="description"
          value={product.description ?? ''}
          placeholder="제품 설명"
          required
          onChange={onChangeInput}
        />
        <input
          type="text"
          name="options"
          value={product.options ?? ''}
          placeholder="옵션들(콤마(,)로 구분)"
          required
          onChange={onChangeInput}
        />
        <Button>제품등록하기</Button>
      </form>
    </section>
  )
}
