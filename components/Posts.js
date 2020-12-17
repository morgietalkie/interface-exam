import React from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

const Posts = ({ posts, loading, hasMore, setPostsPerPage }) => {
  const observer = useRef();
  const lastItemElementRef = useCallback((node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      (entries) => {
        // console.log(entries[0].target);
        if (entries[0].isIntersecting) {
          // setPageNumber((prevPageNumber = prevPageNumber + 1));
          console.log("lastEnry");
        }
      },
      [loading, hasMore]
    );
    if (node) observer.current.observe(node);
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {posts.map((post, index) => {
        if (posts.length === index + 1) {
          return (
            <li ref={lastItemElementRef} key={post.title}>
              <Image src={post.url} alt={post.title} unsized="true" loading="lazy" quality="50" />
              <p>{post.title}</p>
            </li>
          );
        } else {
          return (
            <li key={post.title}>
              <Image src={post.url} alt={post.title} unsized="true" loading="lazy" quality="50" />
              <p>{post.title}</p>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Posts;
