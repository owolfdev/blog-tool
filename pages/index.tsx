import { useSupabase } from "../utils/supabase/useSupabase";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { supabase } from "./../lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  const { getPosts, getPublishedPosts } = useSupabase();

  useEffect(() => {
    getPublishedPosts().then((data: any) => {
      //console.log("data", data);
      setPosts(data);
    });
  }, []);

  useEffect(() => {
    //console.log("publishedPosts", posts);
  }, [posts]);

  return (
    <>
      <Layout title="Published Blog Posts">
        <BlogPosts posts={posts} />
      </Layout>
    </>
  );
}
