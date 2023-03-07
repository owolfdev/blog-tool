import Head from "next/head";
import Create from "@/components/Create";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <>
      <Layout title="Create Blog Post">
        <Create />
      </Layout>
    </>
  );
}
