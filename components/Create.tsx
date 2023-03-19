import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  useContext,
} from "react";
// import ReactMarkdown from "react-markdown";
// import rehypeRaw from "rehype-raw";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import moment from "moment";
// import remarkBreaks from "remark-breaks";
import {
  useUser,
  useSupabaseClient,
  Session,
  useSession,
} from "@supabase/auth-helpers-react";
import { useSupabase } from "../utils/supabase/useSupabase";
import { DataContext } from "@/context/DataContext";
import { countWords } from "@/utils/count-words";

interface BlogPostData {
  title: string;
  author: string;
  categories: string[];
  publishedDate: string | Date;
  description: string;
  excerpt: string;
  body: string;
  author_email: string;
}

function Write() {
  const [blogPostData, setBlogPostData] = useState<Partial<BlogPostData>>({});
  const [markdown, setMarkdown] = useState("");
  const [publishedDate, setPublishedDate] = useState<Date | null>(null);
  const inputRefs = useRef<any>({});
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();
  const dataContext = useContext(DataContext);
  const [authorized, setAuthorized] = useState(false);

  const { getPosts, getPublishedPosts, writeBlogPostToSupabase } =
    useSupabase();

  useEffect(() => {
    console.log("user", user);
    console.log("session", session);
    if (user?.id === process.env.AUTHORIZED_USER) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
    console.log("authorized", authorized);
  }, [user, session]);

  useEffect(() => {
    console.log("Markdown:", markdown);
  }, [markdown]);

  useEffect(() => {
    console.log("Blog Post Data:", blogPostData);
  }, [blogPostData]);

  //work on this later.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "y") {
        console.log("ctrl + y key pressed");
        event.preventDefault();
        const youtubeBlock = `<YouTube id='video id'/>`;
        const bodyTextArea = document.getElementById(
          "body"
        ) as HTMLTextAreaElement;
        if (bodyTextArea) {
          const { selectionStart, selectionEnd } = bodyTextArea;
          const currentValue = bodyTextArea.value;
          const newValue =
            currentValue.substring(0, selectionStart) +
            youtubeBlock +
            currentValue.substring(selectionEnd);
          setBlogPostData((prevState) => ({
            ...prevState,
            body: newValue,
          }));
          bodyTextArea.focus();
          bodyTextArea.setSelectionRange(
            selectionStart + 9,
            selectionStart + 9
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
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

  const handleSaveBlogPost = async (e: any) => {
    //console.log("Blog Post Data (handleSaveBlogPost): ", blogPostData);
    e.preventDefault();

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
      author_email: user?.email ?? "",
    };

    console.log("data from handleSaveBlogPost", data);

    const response: any = await writeBlogPostToSupabase(data);

    console.log("response from handleSaveBlogPost", response);

    if (response) {
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
    <form onSubmit={handleSaveBlogPost}>
      <div className="flex flex-col space-y-1">
        <label className="mt-0 mb-0" htmlFor="title">
          Title:
        </label>
        <input
          className="h-10 px-2 border-4 border-blue-500 rounded"
          type="text"
          id="title"
          name="title"
          ref={(el) => (inputRefs.current.title = el)}
          placeholder="Title"
          onChange={handleInputChange}
          value={blogPostData.title}
          required
          title="Please enter a title for your blog post."
        />
        <label className="mt-0 mb-0" htmlFor="author">
          Author:
        </label>
        <input
          className="h-10 px-2 border-4 border-blue-500 rounded"
          type="text"
          id="author"
          name="author"
          ref={(el) => (inputRefs.current.author = el)}
          placeholder="Author"
          onChange={handleInputChange}
          value={blogPostData.author}
          required
        />
        <label className="mt-0 mb-0" htmlFor="categories">
          Categories:
        </label>
        <input
          className="h-10 px-2 border-4 border-blue-500 rounded"
          type="text"
          id="categories"
          name="categories"
          ref={(el) => (inputRefs.current.categories = el)}
          placeholder="Categories. Separate with commas"
          onChange={handleInputChange}
          value={blogPostData.categories}
          required
        />
        <label className="mt-0 mb-0" htmlFor="publishedDate">
          Published Date:
        </label>
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
            required
          />
        </div>
        <label className="mt-0 mb-0" htmlFor="description">
          Description:
        </label>
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
          required
        ></textarea>
        <label className="mt-0 mb-0" htmlFor="excerpt">
          Excerpt:
        </label>
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
          required
        ></textarea>
        <label className="mt-0 mb-0" htmlFor="body">
          Content{" "}
          {markdown.length > 0 && (
            <span>
              {" "}
              {`(`}
              {countWords(blogPostData.body)} words{`)`}:
            </span>
          )}
        </label>
        <textarea
          name="body"
          id="body"
          ref={(el) => (inputRefs.current.body = el)}
          placeholder={`Please enter the content of the blog post. You can use markdown or MDX.\n\nHot Keys:\n\nAdd a YouTube element by pressing ctl+y.`}
          cols={30}
          rows={10}
          className="p-2 border-4 border-blue-500 rounded"
          onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
            handleTextAreaChange(event)
          }
          value={blogPostData.body}
          required
        ></textarea>

        <div className="h-5"></div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:bg-gray-500 disabled:text-gray-300"
          disabled={!session}
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
    </form>
  );
}

export default Write;
