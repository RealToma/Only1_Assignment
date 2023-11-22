import React, { useRef, useContext } from "react";
import { useInfiniteQuery } from "react-query";
import PostSkeleton from "./PostSkeleton";
import Post from "./Post";
import { RefContext } from "../Context/ContextProvider";

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
  const { postTitle, postContent, postDate } = useContext(RefContext);
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery("posts", fetchPosts, {
    getNextPageParam: (lastPage) =>
      // lastPage.hasNextPage ? lastPage.nextPage : null,
      lastPage.length === PAGE_SIZE ? lastPage[lastPage.length - 1].id : null,
  });

  const postFeedRef = useRef(null);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log("event.currentTarget:", event.currentTarget);
    console.log("isFetchingNextPage:", isFetchingNextPage);
    console.log(
      " postFeedRef.current.scrollHeight:",
      postFeedRef.current.scrollHeight
    );
    console.log("hasNextPage:", hasNextPage);
    console.log(
      "postFeedRef.current.scrollTop + postFeedRef.current.clientHeight:",
      postFeedRef.current.scrollTop + postFeedRef.current.clientHeight
    );

    if (
      postFeedRef.current.scrollTop + postFeedRef.current.clientHeight ===
        postFeedRef.current.scrollHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    fetchNextPage();
  };

  return (
    <div
      className="flex flex-col h-full overflow-y-auto"
      onScroll={handleScroll}
      ref={postFeedRef}
    >
      {isLoading || isFetchingNextPage ? (
        <>
          {[...Array(PAGE_SIZE)].map((_, index) => (
            <PostSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {data.pages.map((page) => {
            let arrayPost = [];
            let newPost;
            if (postTitle === "" || postContent === "") {
              arrayPost = [...page.data];
            } else {
              let temp = [...page.data];
              newPost = {
                author: "Thomas Ken",
                content: postContent,
                createdAt: postDate,
                title: postTitle,
                userId: "thomas.ken0114",
              };
              temp.push(newPost);
              arrayPost = [...temp];
            }

            console.log("arrayPost:", arrayPost);

            return arrayPost
              .reverse()
              .map((post) => (
                <Post
                  key={post.userId}
                  post={post}
                  isFetchingNextPage={isFetchingNextPage}
                />
              ));
          })}
          {!isLoading && !isFetching && !hasNextPage && (
            <button
              className="p-4 bg-gray-100 text-gray-800 w-full text-center"
              onClick={handleRefresh}
            >
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
}
