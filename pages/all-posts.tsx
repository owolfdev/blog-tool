import { getPosts, getPublishedPosts } from "../utils/supabase/sb-utils";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function AllPosts({ posts }: any) {
  return (
    <>
      <Layout title="All Blog Posts">
        <BlogPosts posts={posts} />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getPosts();
  return { props: { posts } };
}
