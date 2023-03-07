import React from "react";
import Link from "next/link";
import { formatDate } from "../utils/format-date";

function BlogPosts({ posts }: any) {
  return (
    <div>
      <div className="mb-2 text-sm text-gray-500">{posts.length} posts</div>
      <div className="space-y-5">
        {posts.map((post: any) => {
          return (
            <div className="border rounded-xl">
              <Link href={` /blog/${post.slug} `}>
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
