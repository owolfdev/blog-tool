import Blogs from "../../components/BlogPosts";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import { formatDate } from "../../utils/format-date";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { useEffect, useState, useContext } from "react";
import { useSupabase } from "../../utils/supabase/useSupabase";
import { useUser } from "@supabase/auth-helpers-react";
import { DataContext } from "@/context/DataContext";
import { countWords } from "../../utils/count-words";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

import YouTube from "../../components/YouTube";
import Image from "next/image";
import IFrame from "../../components/IFrame";

interface Post {
  id: string;
  title: string;
  slug: string;
  published_date: string;
  author: string;
  content: string;
}

export default function BlogsPage() {
  const { getPost, deletePost } = useSupabase();
  const [post, setPost] = useState<Post>();
  const user = useUser();
  const router = useRouter();
  const dataContext = useContext(DataContext);
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult>();

  useEffect(() => {
    const { slug } = router.query;
    getPost(slug).then((data: any) => {
      slug && setPost(data[0]);
    });
  }, [router.query.slug]);

  useEffect(() => {
    post && getMDX(post);
  }, [post]);

  const getMDX = async (post: any) => {
    const mdx = await serialize(post.content, {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeHighlight,
        ],
      },
    });
    setMdxSource(mdx);
  };

  const handleDelete = async () => {
    //console.log("delete post: ", post);
    await deletePost(post?.id);
    //console.log("deletedPost", post?.title);
    router.push("/all-posts");
  };

  return (
    <>
      <Layout title={post?.title}>
        <div className="mb-5">
          {/* {JSON.stringify(postData)} */}
          <div className="mb-5 text-sm text-gray-500">
            <p>Word Count: {post?.content && countWords(post?.content)}</p>
            <p>Published Date: {formatDate(post?.published_date)}</p>
            <p>Author: {post?.author}</p>
            <p>Post Id: {post?.id}</p>
            <p>Current Table: {dataContext.table} </p>
          </div>
          {mdxSource && (
            <MDXRemote {...mdxSource} components={{ YouTube, Image, IFrame }} />
          )}
        </div>

        <div className="flex space-x-3">
          <div className="underline">
            <Link href={`/edit/${post?.id}`}>Edit Post</Link>
          </div>
          {user && (
            <button className="underline" onClick={handleDelete}>
              Delete Post
            </button>
          )}
        </div>
      </Layout>
    </>
  );
}
