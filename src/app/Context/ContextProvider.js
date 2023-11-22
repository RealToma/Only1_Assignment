"use client";

import { createContext, useState } from "react";

export const RefContext = createContext();

export default function RefContextProvider({ children }) {
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postDate, setPostDate] = useState("");

  return (
    <RefContext.Provider
      value={{
        postTitle,
        postContent,
        postDate,
        setPostTitle,
        setPostContent,
        setPostDate,
      }}
    >
      {children}
    </RefContext.Provider>
  );
}
