import { getPostForEdit } from "../../../utils/supabase/sb-utils";
import { useRouter } from "next/router";
import Edit from "@/components/Edit";
import Layout from "@/components/Layout";

export default function BlogsPage({ postData }: any) {
  return (
    <Layout title="Edit Blog Post">
      <Edit postData={postData} />
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  console.log("params:", params.id);
  const postData = await getPostForEdit(params.id);
  console.log("postData from get server side props:", postData);
  return { props: { postData } };
}
