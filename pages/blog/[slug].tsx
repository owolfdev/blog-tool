import Blogs from "../../components/BlogPosts";
import { getPosts, getPost } from "../../utils/supabase/sb-utils";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/Layout";
import { formatDate } from "../../utils/format-date";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import { useEffect } from "react";

export default function BlogsPage({ postData }: any) {
  useEffect(() => {}, [postData]);

  const post = postData[0];
  return (
    <>
      <Layout title={post.title}>
        <div className="mb-5">
          {/* {JSON.stringify(postData)} */}
          <div className="mb-5 text-sm text-gray-500">
            <p>Published Date: {formatDate(post.published_date)}</p>
            <p>Author: {post.author}</p>
          </div>
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, remarkBreaks]}
            skipHtml={false}
            children={post.content}
            components={{
              h1: ({ children }) => (
                <h2 className="mb-4 text-5xl font-bold">{children}</h2>
              ),
              h2: ({ children }) => (
                <h2 className="mb-4 text-3xl font-bold">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-4 text-2xl font-bold">{children}</h3>
              ),
              // and so on for other heading levels
            }}
          />
          {/*  */}
        </div>
        <div className="underline">
          <Link href={`/blog/edit/${post.id}`}>Edit Post</Link>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const posts = await getPosts();
  //console.log("posts from getStaticPaths:", posts);
  const paths = posts?.map((post: any) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  console.log("params:", params.slug);
  const postData = await getPost(params.slug);
  console.log("postData from getStaticProps:", postData && postData[0]);
  return { props: { postData } };
}
