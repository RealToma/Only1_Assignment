import React from "react";
import { useInfiniteQuery } from "react-query";
import PostSkeleton from "./PostSkeleton";
import Post from "./Post";

const PAGE_SIZE = 10;

const fetchPosts = async (key, nextPage = 0) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Fetch posts from the server using pagination
  const response = await fetch(
    `/api/posts?pageSize=${PAGE_SIZE}&page=${nextPage}`
  );
  const data = await response.json();

  return data;
};

export default function PostFeed() {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "posts",
    fetchPosts,
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasNextPage ? lastPage.nextPage : null,
    }
  );

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop === clientHeight && hasNextPage) {
      fetchNextPage();
    }
  };

  console.log("data:", data);

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      onScroll={handleScroll}
    >
      {isLoading ? (
        <>
          {[...Array(PAGE_SIZE)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {data.pages.map((page) =>
            page.data.map((post) => <Post key={post.userId} post={post} />)
          )}

          {/* {!isLoading && !isFetching && hasNextPage && (
            <button
              className="p-4 bg-gray-100 text-gray-800 w-full text-center"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
          {!isLoading && !isFetching && !hasNextPage && (
            <button
              className="p-4 bg-gray-100 text-gray-800 w-full text-center"
              onClick={handleRefresh}
            >
              Refresh
            </button>
          )} */}
        </>
      )}
    </div>
  );
}
