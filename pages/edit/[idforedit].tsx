import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSupabase } from "../../utils/supabase/useSupabase";
import Edit from "@/components/Edit";
import Layout from "@/components/Layout";

function EditPage() {
  const [postData, setPostData] = useState([]);
  const { getPostForEdit, getPost } = useSupabase();

  const router = useRouter();

  useEffect(() => {
    const { idforedit } = router.query;
    console.log("idforedit", idforedit);
    getPostForEdit(idforedit).then((data: any) => {
      console.log("data from edit [slug]", data);
      setPostData(data);
    });
  }, []);

  useEffect(() => {
    console.log("postData", postData);
  }, [postData]);

  return (
    <Layout title="Edit Blog Post">
      <Edit postData={postData} />
    </Layout>
  );
}

export default EditPage;
