import React from "react";

const Post = ({ post, onClick }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold">{post.title}</h3>
      <p>{post.body}</p>
      <button className="mt-2 text-blue-500" onClick={onClick}>
        View Details
      </button>
    </div>
  );
};

export default Post;
