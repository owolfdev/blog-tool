import Link from "next/link";
import Grid from "../components/Grid";
import { useSupabase } from "../utils/supabase/useSupabase";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const GridPage = () => {
  const [posts, setPosts] = useState([]);

  const { getPosts } = useSupabase();

  useEffect(() => {
    getPosts().then((data: any) => {
      //console.log("data", data);
      setPosts(data);
    });
  }, []);
  return (
    <Layout title="All Blog Posts">
      <Grid posts={posts} />
    </Layout>
  );
};

export default GridPage;
