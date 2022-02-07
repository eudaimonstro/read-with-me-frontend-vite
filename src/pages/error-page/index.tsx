import React from 'react'
import { Link } from 'react-router-dom'
const ErrorPage = () => {
  return (
    <div
      className="
            flex
            justify-center
            items-center
            w-screen
            h-screen
            bg-black
          "
    >
      <div className="py-20 px-40 bg-white rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
            <span className="text-red-500">Oops!</span> Page not found
          </h6>
          <p className="mb-8 text-center text-gray-500 md:text-lg">
            The page you’re looking for doesn’t exist.
          </p>
          <Link
            to="/"
            className="py-2 px-6 text-sm font-semibold text-blue-800 bg-blue-100"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
