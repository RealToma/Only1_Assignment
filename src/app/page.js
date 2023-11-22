"use client";
import React, { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
  // useMutation,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Modal from "../components/Modal";
import PostFeed from "../components/PostFeed";
import PostSkeleton from "../components/PostSkeleton";
import { NewPostForm } from "@/components/CreatePost";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export const PostContext = React.createContext();

export default function Home() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [postTitle, setPostTitle] = React.useState("");
  const [postContent, setPostContent] = React.useState("");
  const [postDate, setPostDate] = React.useState("");

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-gray-900 text-white text-center">
          <h1 className="text-2xl font-bold">Only1 - Post Feed</h1>
        </header>
        <main className="flex-1">
          <Suspense fallback={<PostSkeleton />}>
            <PostFeed
              postTitle={postTitle}
              postContent={postContent}
              postDate={postDate}
            />
          </Suspense>
        </main>
        <button
          className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-xl"
          onClick={() => setModalOpen(true)}
        >
          New Post
        </button>
        {modalOpen && (
          <Modal onClose={handleCloseModal}>
            <h2 className="text-xl font-bold mb-3">New Post</h2>
            <NewPostForm
              setPostTitle={setPostTitle}
              setPostContent={setPostContent}
              setPostDate={setPostDate}
              handleCloseModal={handleCloseModal}
            />
          </Modal>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
