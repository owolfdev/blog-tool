import Head from "next/head";
import Create from "@/components/Create";
import Layout from "@/components/Layout";
import { DataContext } from "@/context/DataContext";
import { useContext } from "react";

export default function Home() {
  const dataContext = useContext(DataContext);
  return (
    <>
      <Layout title="Create Blog Post">
        <div className="mb-5">
          <div>
            <span className="font-bold">Current Table: </span>
            {dataContext.table}
          </div>
        </div>
        <Create />
      </Layout>
    </>
  );
}
