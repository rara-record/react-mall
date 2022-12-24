/**
 *
 * @param file: 제품 등록 이미지
 * @returns {Promise<any>}
 * @description cloudinary에 제품을 등록하고, url을 반환하는 함수
 */
export const uploadImage = (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET)
  return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => data.url)
}
