import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

import {
  useSession,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";

export const useSupabase = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const user = useUser();
  const dataContext = useContext(DataContext);

  async function getPosts() {
    try {
      let { data, error, status } = await supabase
        .from(`${dataContext.table}`)
        .select()
        .order("published_date", { ascending: false });
      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        return data;
      } else {
        console.log("no data");
        return data;
      }
    } catch (error) {
      console.log("error from get profile", error);
    } finally {
    }
  }

  async function getPublishedPosts() {
    console.log(
      "dataContext.table from get published posts:",
      dataContext.table
    );
    try {
      let { data } = await supabase
        .from(dataContext.table)
        .select()
        .lte("published_date", new Date().toISOString())
        .order("published_date", { ascending: false });

      //console.log("data from getPublishedPosts:", data);

      return data;
    } finally {
    }
  }

  async function getPost(slug) {
    console.log("slug from getPost:", slug);
    try {
      let { data } = await supabase
        .from(`${dataContext.table}`)
        .select()
        .eq("slug", slug);
      console.log("data from getPost:", data);
      return data;
    } finally {
    }
  }

  async function getPostForEdit(slug) {
    console.log("id from getPost:", slug);
    try {
      let { data } = await supabase
        .from(`${dataContext.table}`)
        .select()
        .eq("id", slug);
      console.log("data from getPost:", data);
      return data;
    } finally {
    }
  }

  async function writeBlogPostToSupabase(data) {
    generateBlogPost(data).then((blogPost) => {
      //console.log("blogPost:", blogPost);
      insertPost(blogPost);
      return blogPost;
    });
  }

  async function insertPost(post) {
    //console.log("insertPost(post):", post);
    try {
      let { error } = await supabase.from(`${dataContext.table}`).upsert(post);
      console.log(error);
    } finally {
    }
  }

  async function insertPostForEdit(post) {
    console.log("insertPost(post):", post);

    console.log("updatePost(post):", post);
    try {
      let { error } = await supabase
        .from(`${dataContext.table}`)
        .upsert(post)
        .eq("id", post.id);
      console.log(error);
    } finally {
    }
  }

  async function updatePost(data) {
    generateBlogPostForEdit(data).then((blogPost) => {
      //console.log("blogPost:", blogPost);
      insertPostForEdit(blogPost);
      return blogPost;
    });
  }

  async function deletePost(postId) {
    console.log("deletePost(post):", postId);
    try {
      let { data, error } = await supabase
        .from(`${dataContext.table}`)
        .delete()
        .eq("id", postId);
      console.log(error);
      console.log("data from deletePost:", data);
      return data;
    } finally {
    }
  }

  // this function generates a slug from the title. We compare post titles to the title of existing posts to see if the title already exists. If it does, we append a number to the end of the slug. If it doesn't, we just return the slug. If there is more than one post with the same title, we append the number of posts with the same title to the end of the slug, to make it unique.
  async function generateSlug(title) {
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
    //console.log("slug:", slug);

    const formattedSlug = await getPostsForSlugTest(title).then((data) => {
      //console.log("data from getPost:", data);
      if (data.length > 0) {
        //console.log("data.length:", data.length);
        //console.log("slug + data.length:", slug + "-" + data.length);
        return slug + "-" + data.length;
      } else {
        return slug;
      }
    });

    return formattedSlug;
  }

  // generate blog post object
  async function generateBlogPost(data) {
    // let excerpt = "";
    // if (data.body.length > 800) {
    //   excerpt = (await smmry.summarizeText(data.body)).sm_api_content;
    // }
    const cats = data.categories.toLowerCase().split(",");
    const categories = cats.map((cat) => {
      return cat.trim();
    });

    //console.log("categories:", categories);
    // Create blog post object
    const blogPost = {
      title: data.title,
      slug: await generateSlug(data.title),
      author: data.author,
      author_email: data.author_email,
      categories: categories,
      published_date: data.publishedDate,
      description: data.description,
      excerpt: data.excerpt,
      content: data.body,
    };
    return blogPost;
  }

  async function generateBlogPostForEdit(data) {
    // let excerpt = "";
    // if (data.body.length > 800) {
    //   excerpt = (await smmry.summarizeText(data.body)).sm_api_content;
    // }

    console.log("data:", data);

    // console.log("categories", data.categories);
    // console.log("typeof categories", typeof data.categories);
    let categories;
    if (typeof data.categories === "string") {
      const cats = data.categories.toLowerCase().split(",");
      categories = cats.map((cat) => {
        return cat.trim();
      });
    } else {
      categories = data.categories;
    }

    // console.log("categories:", categories);

    // Create blog post object
    const blogPost = {
      id: data.id,
      title: data.title,
      slug: data.slug,
      author: data.author,
      author_email: data.author_email,
      categories: categories,
      published_date: data.publishedDate,
      description: data.description,
      excerpt: data.excerpt,
      content: data.content,
    };
    return blogPost;
  }

  async function getPostsForSlugTest(title) {
    console.log("slug from getPost:", title);
    try {
      let { data } = await supabase
        .from(`${dataContext.table}`)
        .select()
        .ilike("title", title);
      console.log("data from getPost:", data);
      return data;
    } finally {
    }
  }

  async function tableExists(tableName) {
    console.log("tableExists(tableName):", tableName);
    try {
      const { data } = await supabase.from(tableName).select("*").limit(1);
      if (data == null) {
        return false;
      }
      return true;
    } catch (error) {
      if (error) {
        return false;
      } else {
        throw error;
      }
    }
  }

  return {
    getPosts,
    getPost,
    getPostForEdit,
    getPublishedPosts,
    writeBlogPostToSupabase,
    updatePost,
    deletePost,
    tableExists,
  };
};
