import React from "react";

const PostSkeleton = () => {
  return (
    <div className="bg-gray-200 p-4 mb-4 rounded-lg animate-pulse">
      <div className="h-4 bg-gray-300 mb-2 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 mb-1 rounded w-full"></div>
      <div className="h-3 bg-gray-300 mb-1 rounded w-full"></div>
      <div className="h-3 bg-gray-300 mb-1 rounded w-full"></div>
    </div>
  );
};

export default PostSkeleton;
