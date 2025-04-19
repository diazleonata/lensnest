import React from 'react';

const Photos = ({ photoUrl, likes = 0, comments = 0, username }) => {
  return (
    <div className="bg-black text-white mb-6">
      <img src={photoUrl} alt="user photo" className="w-full object-cover rounded" />
      <div className="flex items-center gap-2 mt-2 px-1 text-sm">
        <span>🤍 {likes}</span>
        <span>💬 {comments}</span>
      </div>
      <div className="px-1 text-sm">
        <span className="font-semibold">{username}</span>{' '}
      </div>
      <div className="px-1 text-xs text-gray-400 cursor-pointer hover:underline">
        View all comments...
      </div>
    </div>
  );
};

export default Photos;