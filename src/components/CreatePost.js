import React from "react";

export const NewPostForm = () => {
  const [postContent, setPostContent] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate delay in creating a new post
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate error in creating a new post
    const randomError = Math.random() < 0.5;
    if (randomError) {
      setIsError(true);
    } else {
      // Handle successful post creation here
      setPostContent("");
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
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        disabled={isLoading}
        className="w-full p-2 mb-4 border-2  rounded"
        rows={4}
        placeholder="Enter your post content..."
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
