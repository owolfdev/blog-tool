import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import remarkBreaks from "remark-breaks";

interface BlogPostData {
  title: string;
  author: string;
  categories: string[];
  publishedDate: string | Date;
  description: string;
  excerpt: string;
  body: string;
}

function Write() {
  const [blogPostData, setBlogPostData] = useState<Partial<BlogPostData>>({});
  const [markdown, setMarkdown] = useState("");
  const [publishedDate, setPublishedDate] = useState<Date | null>(null);
  const inputRefs = useRef<any>({});

  useEffect(() => {
    console.log("Markdown:", markdown);
  }, [markdown]);

  useEffect(() => {
    console.log("Blog Post Data:", blogPostData);
  }, [blogPostData]);

  function handleDateChange(date: Date) {
    setPublishedDate(date);
    setBlogPostData((prevState) => ({
      ...prevState,
      publishedDate: date.toISOString(),
    }));
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBlogPostData((prevState) => ({ ...prevState, [name]: value }));
  };

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setBlogPostData((prevState) => ({ ...prevState, [name]: value }));
    if (event.target.name === "body" && event.target.value.length > 0) {
      setMarkdown(value);
    }
  }

  const handleSaveBlogPost = async () => {
    console.log("Blog Post Data (handleSaveBlogPost): ", blogPostData);

    const data: BlogPostData = {
      title: blogPostData.title ?? "",
      author: blogPostData.author ?? "",
      categories: blogPostData.categories ?? [],
      publishedDate: blogPostData.publishedDate
        ? new Date(blogPostData.publishedDate).toISOString()
        : "",
      description: blogPostData.description ?? "",
      excerpt: blogPostData.excerpt ?? "",
      body: blogPostData.body ?? "",
    };

    const response = await fetch("/api/save-blog-post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error("Failed to save blog post");
    } else {
      console.log("Blog post saved");
      setBlogPostData({});
      setPublishedDate(null);
      setMarkdown("");
      var toast = document.getElementById("toast");
      // Show the toast message using Tailwind classes
      toast?.classList.remove("hidden");
      // Hide the toast message after 3 seconds using Tailwind classes
      setTimeout(function () {
        toast?.classList.add("hidden");
      }, 3000);
      // Clear the input fields
      inputRefs.current.title.value = "";
      inputRefs.current.author.value = "";
      inputRefs.current.categories.value = "";
      inputRefs.current.description.value = "";
      inputRefs.current.body.value = "";
      inputRefs.current.excerpt.value = "";
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
        value={blogPostData.title}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="author"
        name="author"
        ref={(el) => (inputRefs.current.author = el)}
        placeholder="Author"
        onChange={handleInputChange}
        value={blogPostData.author}
      />
      <input
        className="h-10 px-2 border-4 border-blue-500 rounded"
        type="text"
        id="categories"
        name="categories"
        ref={(el) => (inputRefs.current.categories = el)}
        placeholder="Categories. Separate with commas"
        onChange={handleInputChange}
        value={blogPostData.categories}
      />
      <div className="date-picker-container">
        <DatePicker
          //popperPlacement="top-end"
          className="h-10 px-2 border-4 border-blue-500 rounded"
          id="publishedDate"
          name="publishedDate"
          selected={publishedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
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
        value={blogPostData.description}
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
        value={blogPostData.excerpt}
      ></textarea>
      <textarea
        name="body"
        id="body"
        ref={(el) => (inputRefs.current.body = el)}
        placeholder="Please enter the content of the blog post. You can use markdown."
        cols={30}
        rows={10}
        className="p-2 border-4 border-blue-500 rounded"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextAreaChange(event)
        }
        value={blogPostData.body}
      ></textarea>
      <div>
        {markdown.length > 0 && (
          <h4 className="mb-4 text-xl font-bold text-gray-400">Body Preview</h4>
        )}
      </div>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, remarkBreaks]}
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
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 "
        onClick={handleSaveBlogPost}
      >
        Save Blog Post
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

export default Write;
