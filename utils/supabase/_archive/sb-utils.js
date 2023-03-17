const { createClient } = require("@supabase/supabase-js");
// import { supabase } from "../../lib/supabaseClient";

require("dotenv").config();

const smmry = require("smmry")({
  SM_API_KEY: "AB9D0C21AC",
  SM_LENGTH: 2,
});

async function getPosts() {
  try {
    const { data, error } = await supabase.from("posts").select();
    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log("Error fetching posts:", error.message);
    return null;
  }
}

async function getPublishedPosts() {
  try {
    let { data } = await supabase
      .from("posts")
      .select()
      .lte("published_date", new Date().toISOString());

    console.log("data from getPublishedPosts:", data);

    return data;
  } finally {
  }
}

async function getPost(slug) {
  console.log("id from getPost:", slug);
  try {
    let { data } = await supabase.from("posts").select().eq("slug", slug);
    console.log("data from getPost:", data);
    return data;
  } finally {
  }
}

async function getPostsForTitleTest(title) {
  console.log("title from getPost:", title);
  try {
    let { data } = await supabase.from("posts").select().ilike("title", title);
    console.log("data from getPost:", data);
    return data;
  } finally {
  }
}

async function getPostsForSlugTest(title) {
  console.log("slug from getPost:", title);
  try {
    let { data } = await supabase.from("posts").select().ilike("title", title);
    console.log("data from getPost:", data);
    return data;
  } finally {
  }
}

async function getPostForEdit(id) {
  console.log("title from getPost:", id);
  try {
    let { data } = await supabase.from("posts").select().eq("id", id);
    console.log("data from getPost:", data);
    return data;
  } finally {
  }
}

//write blog post to supabase

async function generateBlogPost(data) {
  let excerpt = "";
  if (data.body.length > 800) {
    excerpt = (await smmry.summarizeText(data.body)).sm_api_content;
  }
  const categories = data.categories
    .replaceAll(" ", "")
    .toLowerCase()
    .split(",");
  //console.log("categories:", categories);
  // Create blog post object
  const blogPost = {
    title: data.title,
    slug: await generateSlug(data.title),
    author: data.author,
    categories: categories,
    published_date: data.publishedDate,
    description: data.description,
    excerpt: data.excerpt,
    content: data.body,
  };
  return blogPost;
}

async function insertPost(post) {
  //console.log("insertPost(post):", post);
  try {
    let { error } = await supabase.from("posts").upsert(post);
    console.log(error);
  } finally {
  }
}

async function updatePost(post) {
  console.log("updatePost(post):", post);
  try {
    let { error } = await supabase.from("posts").upsert(post);
    console.log(error);
  } finally {
  }
}

async function writeBlogPostToSupabase(data) {
  generateBlogPost(data).then((blogPost) => {
    //console.log("blogPost:", blogPost);
    insertPost(blogPost);
  });
}

// this function generates a slug from the title. We compare post titles to the title of existing posts to see if the title already exists. If it does, we append a number to the end of the slug. If it doesn't, we just return the slug. If there is more than one post with the same title, we append the number of posts with the same title to the end of the slug, to make it unique.
async function generateSlug(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, "")
    .replace(/\s+/g, "-");
  console.log("slug:", slug);

  const formattedSlug = await getPostsForSlugTest(title).then((data) => {
    //console.log("data from getPost:", data);
    if (data.length > 0) {
      console.log("data.length:", data.length);
      console.log("slug + data.length:", slug + "-" + data.length);
      return slug + "-" + data.length;
    } else {
      return slug;
    }
  });

  return formattedSlug;
}

export async function getAuthenticatedPosts() {
  const { data: posts, error } = await supabase.from("posts").select("*");
  if (error) {
    throw error;
  }
  return posts;
}
