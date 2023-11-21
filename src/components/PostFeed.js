import React from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import Post from "./Post";
import PostSkeleton from "./PostSkeleton";

const fetchPosts = async (key, page = 0) => {
  // Simulate a delay of 1 second to load posts

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Replace this with your actual API call to fetch posts
  const res = await fetch(`/api/posts?page=${page}`);
  const data = await res.json();
  return data;
};

const PostFeed = ({ onPostClick }) => {
  const { data, isLoading, isFetchingMore, fetchMore, canFetchMore } =
    useInfiniteQuery("posts", fetchPosts, {
      getFetchMore: (lastGroup, allGroups) =>
        lastGroup.length ? allGroups.length : null,
      refetchOnWindowFocus: false,
      retryOnMount: false,
    });

  const [ref, inView] = useInView();

  const posts = data ? data.flat() : [];

  const handleLoadMore = () => {
    if (!isFetchingMore && canFetchMore) {
      fetchMore();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <React.Suspense fallback={<PostSkeleton />}>
            {[...Array(5)].map((_, index) => (
              <PostSkeleton key={index} />
            ))}
          </React.Suspense>
        ) : (
          <>
            {posts.map((post) => (
              <Post
                key={post.id}
                post={post}
                onClick={() => onPostClick(post)}
              />
            ))}
            {isFetchingMore && <PostSkeleton />}
            {!isFetchingMore && canFetchMore && (
              <div ref={ref} className="mt-4">
                {inView && (
                  <button
                    className="w-full py-2 bg-gray-100 text-gray-600 font-medium"
                    onClick={handleLoadMore}
                  >
                    Load More
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostFeed;
