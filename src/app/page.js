"use client";
import React, { useState, createContext } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";

import Modal from "../components/Modal";
import PostFeed from "../components/PostFeed";

const queryClient = new QueryClient();

export const PostContext = createContext();

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-gray-900 text-white text-center">
          <h1 className="text-2xl font-bold">Only1 Post Feed</h1>
        </header>
        <main className="flex-1">
          <PostContext.Provider value={selectedPost}>
            <PostFeed onPostClick={handlePostClick} />
          </PostContext.Provider>
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
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
