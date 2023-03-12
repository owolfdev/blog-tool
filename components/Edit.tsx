import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import {
  useUser,
  useSupabaseClient,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";
import { useSupabase } from "../utils/supabase/useSupabase";
import { useRouter } from "next/router";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  author: string;
  categories: string[];
  published_date: string | Date;
  description: string;
  excerpt: string;
  content: string;
}

function Edit({ postData }: any) {
  const [blogPostData, setBlogPostData] = useState<Partial<BlogPostData>>({});
  const [markdown, setMarkdown] = useState("");
  const [publishedDate, setPublishedDate] = useState<Date | null>(null);
  const inputRefs = useRef<any>({});
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  const { updatePost } = useSupabase();

  useEffect(() => {
    // console.log("user", user);
    // console.log("session", session);
    if (user?.id === process.env.AUTHORIZED_USER) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    //console.log("authorized", authorized);
  }, [user, session]);

  useEffect(() => {
    //console.log("Post data:", postData);
    setBlogPostData(postData);
  }, []);

  useEffect(() => {
    setBlogPostData(postData && postData[0]);
    setPublishedDate(new Date(postData && postData[0]?.published_date));
  }, [postData]);

  useEffect(() => {
    //console.log("Markdown:", markdown);
  }, [markdown]);

  useEffect(() => {
    // console.log("Blog Post Data:", blogPostData);
  }, [blogPostData]);

  function handleDateChange(date: Date) {
    console.log("Date:", date);
    setPublishedDate(date);
    setBlogPostData((prevState) => ({
      ...prevState,
      published_date: date.toISOString(),
    }));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBlogPostData((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setBlogPostData((prevState) => ({ ...prevState, [name]: value }));
    if (event.target.name === "content" && event.target.value.length > 0) {
      setMarkdown(value);
    }
  }

  const handleEditBlogPost = async () => {
    console.log("Blog Post Data (handleSaveBlogPost): ", blogPostData);

    const data: BlogPostData = {
      id: blogPostData?.id ?? "",
      title: blogPostData?.title ?? "",
      slug: blogPostData?.slug ?? "",
      author: blogPostData?.author ?? "",
      categories: blogPostData?.categories ?? [],
      published_date: blogPostData?.published_date
        ? new Date(blogPostData?.published_date).toISOString()
        : "",
      description: blogPostData?.description ?? "",
      excerpt: blogPostData?.excerpt ?? "",
      content: blogPostData?.content ?? "",
    };

    const response: any = await updatePost(data);

    if (response) {
      console.error("Failed to save blog post");
    } else {
      console.log("Blog post saved");
      var toast = document.getElementById("toast");

      toast?.classList.remove("hidden");

      setTimeout(function () {
        toast?.classList.add("hidden");
        router.push(`/blog/${data.slug}`);
      }, 3000);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="title"
        name="title"
        ref={(el) => (inputRefs.current.title = el)}
        placeholder="Title"
        onChange={handleInputChange}
        value={blogPostData?.title}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="slug"
        name="slug"
        ref={(el) => (inputRefs.current.slug = el)}
        placeholder="Slug"
        onChange={handleInputChange}
        value={blogPostData?.slug}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="author"
        name="author"
        ref={(el) => (inputRefs.current.author = el)}
        placeholder="Author"
        onChange={handleInputChange}
        value={blogPostData?.author}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="categories"
        name="categories"
        ref={(el) => (inputRefs.current.categories = el)}
        placeholder="Categories. Separate with commas"
        onChange={handleInputChange}
        value={blogPostData?.categories}
      />
      <div className="date-picker-container">
        <DatePicker
          className="h-10 px-2 border-4 border-blue-500 rounded"
          id="published_date"
          name="published_date"
          selected={moment(blogPostData?.published_date).toDate()}
          onChange={handleDateChange}
          dateFormat="yyy-MM-dd"
          placeholderText="Published Date"
          showTimeSelect
        />
      </div>
      <textarea
        name="description"
        id="description"
        ref={(el) => (inputRefs.current.description = el)}
        placeholder="Please enter a blog post description"
        cols={30}
        rows={3}
        className="p-2 border-4 border-blue-500 rounded"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextAreaChange(event)
        }
        value={blogPostData?.description}
      ></textarea>
      <textarea
        name="excerpt"
        id="excerpt"
        ref={(el) => (inputRefs.current.excerpt = el)}
        placeholder="Please enter the post excerpt"
        cols={30}
        rows={3}
        className="p-2 border-4 border-blue-500 rounded"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextAreaChange(event)
        }
        value={blogPostData?.excerpt}
      ></textarea>
      <textarea
        name="content"
        id="content"
        ref={(el) => (inputRefs.current.body = el)}
        placeholder="Please enter the content of the blog post. You can use markdown."
        cols={30}
        rows={10}
        className="p-2 border-4 border-blue-500 rounded"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextAreaChange(event)
        }
        value={blogPostData?.content}
      ></textarea>
      <div>
        {markdown.length > 0 && (
          <h4 className="mb-4 text-xl font-bold text-gray-400">Body Preview</h4>
        )}
      </div>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        skipHtml={false}
        children={markdown}
        components={{
          h1: ({ children }) => (
            <h2 className="mb-4 text-5xl font-bold">{children}</h2>
          ),
          h2: ({ children }) => (
            <h2 className="mb-4 text-3xl font-bold">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-4 text-2xl font-bold">{children}</h3>
          ),
          // and so on for other heading levels
        }}
      />
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300"
        onClick={handleEditBlogPost}
        disabled={!session}
      >
        Edit Blog Post
      </button>
      <div
        id="toast"
        className="fixed z-10 hidden px-4 py-2 text-xl text-white transform -translate-x-1/2 bg-gray-800 rounded-md bottom-5 left-1/2 opacity-70"
      >
        Post saved!
      </div>
    </div>
  );
}

export default Edit;
