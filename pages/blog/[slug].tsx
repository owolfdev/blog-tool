// pages/mdx-page.tsx
import React, { ReactNode, ComponentType, HTMLAttributes } from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
// import remarkGfm from "remark-gfm";
import { useEffect, useContext } from "react";
import { DataContext } from "@/context/DataContext";
import { getPost } from "@/utils/supabase/sb-utils";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { countWords } from "../../utils/count-words";
import { formatDate } from "../../utils/format-date";
import { YouTube } from "@/components/YouTube";
import Link from "next/link";
import { useSupabase } from "@/utils/supabase/useSupabase";
import { useUser } from "@supabase/auth-helpers-react";
//import ClipboardJS from "clipboard";
import { Pre, Code } from "@/components/CodeBlock";
import UnsplashImage from "@/components/UnsplashImage";

// function useClipboard(selector: string) {
//   useEffect(() => {
//     const clipboard = new ClipboardJS(selector);

//     clipboard.on("success", (e) => {
//       e.clearSelection();
//     });

//     return () => {
//       clipboard.destroy();
//     };
//   }, [selector]);
// }

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  published_date: string;
  categories: string[];
  excerpt: string;
  description: string;
  slug: string;
  author_email: string;
}

interface MdxPageProps {
  mdxSource: MDXRemoteSerializeResult;
  post: Post;
}

interface MDXComponents {
  [key: string]: ComponentType<any>;
}

const components: MDXComponents = {
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 text-5xl font-bold" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 text-4xl font-bold" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 text-3xl font-bold" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="mb-4 text-2xl font-bold" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4" {...props} />
  ),
  Image: (props: any) => (
    <div className="mb-4">
      <Image
        src={props.src || ""}
        alt={props.alt || ""}
        width={props.width || "auto"}
        height={props.height || "auto"}
        {...props}
      />
      {props.caption && <p className="text-gray-500 ">{props.caption}</p>}
    </div>
  ),
  YouTube: YouTube,
  pre: Pre,
  code: Code,
  UnsplashImage: UnsplashImage,
};

const MdxPage: React.FC<MdxPageProps> = ({ mdxSource, post }) => {
  const dataContext = useContext(DataContext);
  const { getPost, deletePost } = useSupabase();
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    console.log("post", post);
  }, []);

  const handleDelete = async () => {
    //console.log("delete post: ", post);
    await deletePost(post?.id);
    //console.log("deletedPost", post?.title);
    router.push("/all-posts");
  };

  return (
    <Layout title={post?.title}>
      <div className="mb-5">
        <div className="mb-5 text-sm text-gray-500">
          <p>Word Count: {post?.content && countWords(post?.content)}</p>
          <p>Published Date: {formatDate(post?.published_date)}</p>
          <p>Author: {post?.author}</p>
          <p>Post Id: {post?.id}</p>
          <p>Current Table: {dataContext.table} </p>
        </div>
        <MDXProvider components={components}>
          <MDXRemote {...mdxSource} />
        </MDXProvider>
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
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const slug = context.params?.slug as string;
    const table = context.query.table as string;

    const postData = await getPost(slug, table);
    const post = postData && postData[0];

    if (!post) {
      return {
        notFound: true,
      };
    }

    const { content } = matter(post?.content);
    const mdxSource = await serialize(post?.content, {
      mdxOptions: {
        rehypePlugins: [rehypeHighlight],
      },
    });
    console.log("post", post);

    return {
      props: { mdxSource, post },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        mdxSource: null,
        post: null,
      },
    };
  }
};

export default MdxPage;
