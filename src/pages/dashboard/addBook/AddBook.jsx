import React, { useEffect, useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddBookMutation } from '../../../redux/features/books/booksApi';
import Swal from 'sweetalert2';
import { getImgUrl } from '../../../utils/getImgUrl';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddBookMutation();
    const [imageFileName, setImageFileName] = useState('')
    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Book added",
                text: "Your book is uploaded successfully!",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ok"
              });
              reset();
              setImageFileName('')
              setImageFile(null);
        } catch (error) {
            console.error(error);
            alert("Failed to add book. Please try again.")   
        }
        
        }
        

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            if(file) {
                setImageFile(file);
                setImageFileName(file.name);
            }
        }
  return (
    <div className="max-w-2xl mx-auto p-8 bg-gray-700 rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold text-white  mb-6">Add a New Book</h2>
  

  {/* Form starts here */}
  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
    {/* Title Input */}
    <div>
      <label className="block text-sm font-medium  text-white">Book Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter book title"
        {...register('title')}
        className="w-full mt-2 p-3 border border-gray-700 placeholder-white bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>

    {/* Description Textarea */}
    <div>
      <label className="block text-sm font-medium  text-white">Description</label>
      <textarea
        name="description"
        placeholder="Enter book description"
        rows="4"
        {...register('description')}
        className="w-full mt-2 p-3 border border-gray-700 placeholder-white bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      ></textarea>
    </div>

    {/* Category Dropdown */}
    <div>
      <label className="block text-sm font-medium text-white">Category</label>
      <select
        name="category"
        {...register('category')}
        className="w-full mt-2 p-3 border border-gray-300 text-white bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        <option value="">Choose a Category</option>
        <option value="business">Business</option>
        <option value="technology">Technology</option>
        <option value="fiction">Fiction</option>
        <option value="horror">Horror</option>
        <option value="adventure">Adventure</option>
      </select>
    </div>

    {/* Trending Checkbox */}
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        {...register('trending')}
        className="w-5 h-5 text-green-600 border-gray-300 bg-gray-400 rounded focus:ring-green-500"
      />
      <label className="text-sm font-medium text-white">Mark as Trending</label>
    </div>

    {/* Price Fields */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium  text-white">Old Price</label>
        <input
          type="number"
          name="oldPrice"
          placeholder="Old Price"
          {...register('oldPrice')}
          className="w-full mt-2 p-3 border border-gray-300 placeholder-white bg-gray-400  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-white">New Price</label>
        <input
          type="number"
          name="newPrice"
          placeholder="New Price"
          {...register('newPrice')}
          className="w-full mt-2 p-3 border border-gray-300 placeholder-white bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
    </div>

    {/* File Upload */}
    <div>
      <label className="block text-sm font-medium text-white">Cover Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2 w-full p-2 border placeholder-white bg-gray-400 border-gray-300 rounded-lg cursor-pointer"
      />
      {imageFileName && <p className="text-sm text-gray-500 mt-1">Selected: {imageFileName}</p>}
    </div>

    {/* Submit Button */}
    <div>
      <button
        type="submit"
        className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        {isLoading ? 'Adding...' : 'Add Book'}
      </button>
    </div>
  </form>
</div>

  )
}

export default AddBook