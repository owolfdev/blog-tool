import { useSupabase } from "../utils/supabase/useSupabase";
import BlogPosts from "@/components/BlogPosts";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import Link from "next/link";
import { supabase } from "./../lib/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { DataContext } from "../context/DataContext";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { getPosts, getPublishedPosts } = useSupabase();
  const dataContext = useContext(DataContext);

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
        <div className="mb-5">
          <span className="font-bold">Current Table: </span>
          {dataContext.table}
        </div>
        <BlogPosts posts={posts} />
      </Layout>
    </>
  );
}
