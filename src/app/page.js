"use client";
import React, { Suspense } from "react";
import {
  QueryClient,
  QueryClientProvider,
  // useQuery,
  // useMutation,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import PostFeed from "./components/PostFeed";
import PostSkeleton from "./components/PostSkeleton";
import { ToastContainer } from "react-toastify";
import Link from "next/link";

const queryClient = new QueryClient();

export const PostContext = React.createContext();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <header className="py-4 bg-gray-900 text-white text-center">
          <h1 className="text-2xl font-bold">Only1 - Post Feed</h1>
        </header>
        <main className="flex-1">
          <Suspense fallback={<PostSkeleton />}>
            <PostFeed />
          </Suspense>
        </main>
        <button className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-full shadow-xl">
          <Link legacyBehavior href="/new">
            New Post
          </Link>
        </button>
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
