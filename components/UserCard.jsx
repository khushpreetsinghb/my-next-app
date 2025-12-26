"use client";

import { useState } from "react";

export default function UserCard({ name, email, role, avatar, isActive = true }) {
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="border-2 border-green-500 p-4 rounded-lg mb-8 max-w-xs">
      <h3 className="text-lg font-bold mb-4">UserCard Component - Props & Conditional Rendering</h3>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
          {avatar ? (
            <img src={avatar} alt={name} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-2xl">{name.charAt(0).toUpperCase()}</span>
          )}
        </div>
        
        <div>
          <h4 className="m-0 mb-1 font-semibold">{name}</h4>
          <p className="m-0 text-gray-600 text-sm">{email}</p>
        </div>
      </div>

      <div className="mb-4">
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          role === 'Admin' ? 'bg-red-500 text-white' : 
          role === 'Developer' ? 'bg-blue-500 text-white' : 
          'bg-green-500 text-white'
        }`}>
          {role}
        </span>
        
        {isActive ? (
          <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-green-500 text-white">
            Active
          </span>
        ) : (
          <span className="ml-2 px-2 py-1 rounded text-xs font-medium bg-gray-500 text-white">
            Inactive
          </span>
        )}
      </div>

      <button 
        onClick={toggleFollow}
        className={`px-4 py-2 rounded cursor-pointer transition-colors ${
          isFollowing 
            ? 'bg-gray-500 hover:bg-gray-600 text-white' 
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>

      <p className="mt-4 text-sm text-gray-600">
        This component demonstrates: props, conditional rendering, state
      </p>
    </div>
  );
}
