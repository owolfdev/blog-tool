import { getPosts, getPublishedPosts } from "../utils/supabase/sb-utils";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function Home({ posts }: any) {
  return (
    <>
      <Layout title="Published Blog Posts">
        <BlogPosts posts={posts} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPublishedPosts();
  return { props: { posts } };
}
