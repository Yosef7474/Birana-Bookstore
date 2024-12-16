import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import userReducer from './features/cart/userSlice';
import booksApi from './features/books/booksApi'
import usersApi from './features/users/userApi'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    User: userReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware,usersApi.middleware)
})
  
export default store;

// import { configureStore } from '@reduxjs/toolkit'
// import cartReducer from './features/cart/cartSlice'
// import booksApi from './features/books/booksApi'
// import usersApi from './features/books/usersApi'

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     [booksApi.reducerPath]: booksApi.reducer,
// [usersApi.reducerPath]: userssApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(booksApi.middleware,usersApi.middleware)
// })






