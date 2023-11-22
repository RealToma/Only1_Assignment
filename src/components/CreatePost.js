import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const NewPostForm = ({
  postTitle,
  setPostTitle,
  postContent,
  setPostContent,
  handleCloseModal,
  setPostDate
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (postTitle === "") {
      toast.error("Enter post title.");
      return;
    }
    if (postContent === "") {
      toast.error("Enter post content.");
      return;
    }
    setIsLoading(true);
    // Simulate delay in creating a new post
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate error in creating a new post
    const randomError = Math.random() < 0.5;
    if (randomError) {
      setIsError(true);
      setTimeout(() => {
        setPostContent("");
        setPostTitle("");
        setIsError(false);
        setIsLoading(false);
      }, 2000);
    } else {
      // Handle successful post creation here
      toast.success("Created new post.");
      handleCloseModal();
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          Error creating post. Please try again.
        </div>
      )}
      <input
        value={postTitle}
        onChange={(e) => setPostTitle(e.target.value)}
        disabled={isLoading}
        className="w-full p-2 mb-4 border-2  rounded"
        placeholder="Enter your post title."
      ></input>
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        disabled={isLoading}
        className="w-full p-2 mb-4 border-2  rounded"
        rows={5}
        placeholder="Enter your post content here."
      ></textarea>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {isLoading ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};
