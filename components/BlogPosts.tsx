import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import Link from "next/link";
import { formatDate } from "../utils/format-date";

function BlogPosts({ posts }: any) {
  const dataContext = useContext(DataContext);
  return (
    <div>
      <div className="mb-2 text-sm text-gray-500">{posts.length} posts</div>
      <div className="space-y-5">
        {posts.map((post: any) => {
          return (
            <div key={post.id} className="border rounded-xl">
              <Link href={` /blog/${post.slug}?table=${dataContext.table}`}>
                <div className="p-3" key={post.id}>
                  <h3 className="text-2xl font-bold">{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <p className="mt-1 text-sm text-gray-400">
                    {formatDate(post.published_date)}
                  </p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogPosts;
