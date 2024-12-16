import React, { useEffect, useState } from 'react'

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import BookCard from '../books/BookCard';
import {  useGetRecommendedBooksQuery } from '../../redux/features/books/booksApi';


const Recommended = () => {

  // const {data: books = []} = useFetchAllBooksQuery();
  const { data: books, error, isLoading } = useGetRecommendedBooksQuery();

  if (isLoading) return <p>Loading recommendations...</p>;
  if (error) return <p>Error loading recommendations: {error.message}</p>;
  if (!books || books.length === 0) return <p>No recommendations available.</p>;


  return (
    
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>Recommended Books</h2>

        <Swiper
    slidesPerView={1}
    spaceBetween={30}
    navigation={true}
    
    breakpoints={{
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 50,
      },
      1180: {
        slidesPerView: 3,
        spaceBetween: 50,
      }
    }}
    modules={[Pagination, Navigation]}
    className="mySwiper"
  >
    {books.length > 0 &&
          books.slice(8, 18).map((book, index) => (
            <SwiperSlide key={index}>
              <BookCard key={index} book={book} />
            </SwiperSlide>
          ))}

  </Swiper>
    </div>
  )
}

export default Recommended