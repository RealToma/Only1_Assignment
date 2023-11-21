"use client";
import React, { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRouter } from "next/navigation";

import Modal from "../components/Modal";
import PostFeed from "../components/PostFeed";
import PostSkeleton from "../components/PostSkeleton";

const queryClient = new QueryClient();

export const PostContext = React.createContext();

export default function Home() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-gray-900 text-white text-center">
          <h1 className="text-2xl font-bold">Post Feed</h1>
        </header>
        <main className="flex-1">
          <Suspense fallback={<PostSkeleton />}>
            <PostFeed />
          </Suspense>
          {/* <PostContext.Provider >
            <PostFeed  />
          </PostContext.Provider> */}
        </main>
        <button
          className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-xl"
          onClick={() => setModalOpen(true)}
        >
          New Post
        </button>
        {modalOpen && (
          <Modal onClose={handleCloseModal}>
            <h2 className="text-xl font-bold">New Post</h2>
            {/* Add your new post form here */}
          </Modal>
        )}
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function NewPostForm() {
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
    <form onSubmit={handleSubmit} className="p-4">
      {isError && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          Error creating post. Please try again.
        </div>
      )}
      <textarea
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        disabled={isLoading}
        className="w-full p-2 mb-4"
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
}
