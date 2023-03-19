import Link from "next/link";
import Grid from "../components/Grid";
import { useSupabase } from "../utils/supabase/useSupabase";
import { useEffect, useState, useContext } from "react";
import Layout from "../components/Layout";
import { DataContext } from "../context/DataContext";

const GridPage = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts } = useSupabase();
  const dataContext = useContext(DataContext);

  // useEffect(() => {
  //   getPosts().then((data: any) => {
  //     //console.log("data", data);
  //     setPosts(data);
  //   });
  // }, []);

  useEffect(() => {
    dataContext.table &&
      getPosts().then((data: any) => {
        setPosts(data);
      });
  }, [dataContext.table]);

  return (
    <Layout title="All Blog Posts">
      <div className="mb-5">
        <div>
          <span className="font-bold">Current Table: </span>
          {dataContext.table}
        </div>
      </div>
      <Grid posts={posts} />
    </Layout>
  );
};

export default GridPage;
