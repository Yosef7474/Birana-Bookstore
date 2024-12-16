import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchBooksByIdQuery } from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleBook = () => {
    const {id} = useParams();
    const {data: book, isLoading, isError} = useFetchBooksByIdQuery(id);

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
      dispatch(addToCart(product))
    }

    if(isLoading) return <div>Loading.....</div>
    if(isError) return <div>Error loading book</div>
  return (
    <div>

<div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Book Cover */}
        <div className="sm:w-1/2 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book?.title || "Book Cover"}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col sm:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{book?.title}</h1>
          <p className="text-gray-700 mb-4 leading-relaxed">{book?.description}</p>

          <div className="mb-4">
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

      {/* Additional Info */}
      <div className="mt-6">
        <h2 className="text-xl font-bold mb-3">Book Details</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li><strong>Author:</strong> {book.author || 'admin'}</li>
          <li><strong>Genre:</strong> {book?.category}</li>
          <li><strong>Published Date:</strong> {new Date(book?.createdAt).toLocaleDateString()}</li>
        </ul>
      </div>

      {/* Back to All Books */}
      <div className="mt-6">
        <Link
          to="/books"
          className="text-blue-600 font-medium hover:underline"
        >
          &larr; Back to all books
        </Link>
      </div>
    </div>

    </div>
  )
}

export default SingleBook