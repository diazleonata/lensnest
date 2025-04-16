import React from 'react';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/60 flex justify-between items-center bg-black text-white p-4">
      <div className="text-lg font-semibold">LensNest</div>

      <div className="flex gap-6">
        <button className="text-white hover:text-gray-400 font-bold">For You</button>
        <button className="text-white hover:text-gray-400">Favorite</button>
      </div>

      <div>
        <button className="bg-white text-black px-4 py-1 rounded hover:bg-gray-200">
          Sign in
        </button>
      </div>
    </header>
  );
};

export default Header;