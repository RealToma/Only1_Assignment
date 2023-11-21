import React from "react";

const Post = ({ post }) => {
  return (
    <div
      key={post.userId}
      className="p-4 border-b cursor-pointer hover:bg-gray-300"
    >
      <p className="text-gray-800 mb-3">Title: {post.title}</p>
      <p className="text-gray-400 text-sm">
        {post.author} - {post.createdAt}
      </p>
      <p className="text-gray-600 text-sm">Content: {post.content}</p>
    </div>
  );
};

export default Post;
