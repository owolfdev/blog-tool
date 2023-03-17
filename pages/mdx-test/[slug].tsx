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

  useEffect(() => {
    const { slug } = router.query;
    getPost(slug).then((data: any) => {
      slug && setPost(data[0]);
    });
  }, [router.query.slug]);

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
          <ReactMarkdown
            rehypePlugins={[rehypeRaw, remarkBreaks]}
            skipHtml={false}
            children={post?.content!}
            components={{
              p: ({ children }) => <p className="mb-4 ">{children}</p>,
              h1: ({ children }) => (
                <h1 className="mb-4 text-5xl font-bold">{children}</h1>
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
