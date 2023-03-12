//import { getPosts, getPublishedPosts } from "../utils/supabase/sb-utils";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { useSupabase } from "../utils/supabase/useSupabase";
import { useEffect, useState } from "react";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);

  const { getPosts } = useSupabase();

  useEffect(() => {
    getPosts().then((data: any) => {
      console.log("data", data);
      setPosts(data);
    });
  }, []);

  return (
    <>
      <Layout title="All Blog Posts">
        <BlogPosts posts={posts} />
      </Layout>
    </>
  );
}
