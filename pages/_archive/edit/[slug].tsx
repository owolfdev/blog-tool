//import { getPostForEdit } from "../../../utils/supabase/sb-utils";
import { useSupabase } from "../../../utils/supabase/useSupabase";
import { useRouter } from "next/router";
import Edit from "@/components/Edit";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function BlogsPage() {
  const [postData, setPostData] = useState([]);
  const { getPostForEdit } = useSupabase();

  const router = useRouter();

  useEffect(() => {
    console.log("postData", postData);
  }, [postData]);

  useEffect(() => {
    console.log("router.query", router.query);
    const { slug } = router.query;
    getPostForEdit(slug).then((data: any) => {
      console.log("data from edit [slug]", data);
      setPostData(data);
    });
  }, []);

  return (
    <Layout title="Edit Blog Post">
      <Edit postData={postData} />
    </Layout>
  );
}

// export async function getServerSideProps({ params }: any) {
//   console.log("params:", params.id);
//   const postData = await getPostForEdit(params.id);
//   console.log("postData from get server side props:", postData);
//   return { props: { postData } };
// }
