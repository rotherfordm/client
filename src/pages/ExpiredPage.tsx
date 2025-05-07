import React from 'react';
import { Link } from 'react-router';

const ExpiredPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Link Expired</h1>
        <p className="text-gray-700 mb-6">
          Sorry, this shortened URL is no longer active. It may have expired or
          been removed.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ExpiredPage;
