import React from 'react'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { getImgUrl } from '../../utils/getImgUrl';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';



const BookCard = ({book}) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }
  return (
    <div className="p-6 max-w-md bg-white shadow-lg rounded-lg transition-transform duration-300 hover:scale-105 flex flex-col sm:flex-row">
  <Link to={`/books/${book._id}`} className="block overflow-hidden rounded-lg sm:w-1/2">
    <img
      src={`${getImgUrl(book?.coverImage)}`}
      alt=""
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
    />
  </Link>

  <div className="p-4 sm:w-1/2">
    <Link to={`/books/${book._id}`} className="block hover:text-blue-600">
      <h3 className="text-xl font-bold mb-2">{book?.title}</h3>
    </Link>
    <p className="text-gray-700 mb-4 leading-relaxed">
      {book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}
    </p>

    <div className="flex items-center justify-between mb-4">
      <span className="text-lg font-semibold text-green-600">Br {book?.newPrice}</span>
      <span className="text-gray-500 line-through ml-2">Br {book?.oldPrice}</span>
    </div>

  <button
    onClick={() => handleAddToCart(book)}
     className="w-full bg-primary text-white py-2 rounded-md flex justify-center items-center gap-2 font-medium transition duration-300 hover:bg-blue-700"
    >
      <HiOutlineShoppingBag />
      <span>Add to Cart</span>
    </button>
   
   
  </div>
</div>
  )
}

export default BookCard