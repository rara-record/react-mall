import React, { useState } from 'react'
import Button from '../components/UI/Button'
import { uploadImage } from '../api/uploader'
import { addNewProduct } from '../api/firebase'

export default function NewProduct() {
  const [product, setProduct] = useState({})
  const [file, setFile] = useState()
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState('')

  const onChangeInput = (e) => {
    const { name, value, files } = e.target
    if (name === 'file') {
      setFile(files && files[0])
      return
    }
    setProduct((product) => ({ ...product, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setIsUploading(true)
    try {
      const url = await uploadImage(file)
      await addNewProduct(product, url)
      await setSuccess('성공적으로 제품이 추가되었습니다.')
      setTimeout(() => {
        setSuccess(null)
      }, 2000)
    } catch (err) {
      console.log(err)
      setSuccess('제품 등록이 실패하였습니다.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <section>
      <h2>새로운 제품 등록</h2>
      {success && <p>💡{success}</p>}
      {file && <img src={URL.createObjectURL(file)} alt="local file" />}
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
        <Button disabled={isUploading}>{isUploading ? '업로드중...' : '제품등록하기'}</Button>
      </form>
    </section>
  )
}
