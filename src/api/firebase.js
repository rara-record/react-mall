import { initializeApp } from 'firebase/app'
import { v4 as uuid } from 'uuid'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { get, getDatabase, ref, set } from 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const provider = new GoogleAuthProvider()
const db = getDatabase(app)

export const login = () => {
  signInWithPopup(auth, provider).catch(console.error)
}

export const logout = () => {
  signOut(auth).catch(console.error)
}

/**
 * @description 사용자의 상태 정보를 구독하는 함수
 */
export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null
    console.log(updatedUser)
    callback(updatedUser)
  })
}

/**
 * firebase ref: https://firebase.google.com/docs/database
 * @description: 어드민 사용자를 판별하고, 객체에 결과값을 추가하여 리턴하는 함수
 * @param user
 * @returns {Promise<DataSnapshot>}
 */
const adminUser = async (user) => {
  return get(ref(db, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val()
        const isAdmin = admins.includes(user.uid)
        return { ...user, isAdmin }
      }
      return user
    })
}

/**
 * @description firebase database에 제품을 추가하는 함수
 * @param product
 * @param image
 * @returns {Promise<void>}
 */
export const addNewProduct = async (product, image) => {
  const id = uuid()
  await set(ref(db, `products/${id}`), {
    ...product,
    id,
    image,
    price: parseInt(product.price),
    options: product.options.split(','), // 배열로 저장
  })
}

/**
 * @description firebase database에서 product data를 가져오는 함수
 * @returns {Promise<DataSnapshot>}
 */
export const getProducts = async () => {
  return get(ref(db, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val())
      }
      return []
    })
}
