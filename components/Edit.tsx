import React, {
  useState,
  useEffect,
  ChangeEvent,
  useRef,
  forwardRef,
  useContext,
} from "react";
import { DataContext } from "@/context/DataContext";
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
import { countWords } from "../utils/count-words";

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

  const dataContext = useContext(DataContext);

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
    console.log("Blog Post Data:", blogPostData);
  }, [blogPostData]);

  //work on this later.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey) {
        let newTextBlock = "";

        if (event.key === "y") {
          newTextBlock = `<YouTube id='YOUTUBE_VIDEO_ID'/>`;
        } else if (event.key === "u") {
          newTextBlock = `<UnsplashImage id="UNSPLASH_PHOTO_ID" caption='Image from Unsplash'/>`;
        } else {
          return; // If the key is not 'y' or 'i', exit the function
        }

        console.log(`ctrl + ${event.key} key pressed`);
        console.log("newTextBlock:", newTextBlock);

        event.preventDefault();

        const bodyTextArea = document.getElementById(
          "content"
        ) as HTMLTextAreaElement;
        if (bodyTextArea) {
          const { selectionStart, selectionEnd } = bodyTextArea;
          const currentValue = bodyTextArea.value;
          const newValue =
            currentValue.substring(0, selectionStart) +
            newTextBlock +
            currentValue.substring(selectionEnd);
          setBlogPostData((prevState) => ({
            ...prevState,
            content: newValue,
          }));
          bodyTextArea.focus();
          bodyTextArea.setSelectionRange(
            selectionStart + newTextBlock.length,
            selectionStart + newTextBlock.length
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
    //console.log("Blog Post Data (handleSaveBlogPost): ", blogPostData);

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

    console.log("date from handleEditBlogPost", data.published_date);

    const response: any = await updatePost(data);

    if (response) {
      console.error("Failed to save blog post");
    } else {
      console.log("Blog post saved");
      var toast = document.getElementById("toast");

      toast?.classList.remove("hidden");

      setTimeout(function () {
        toast?.classList.add("hidden");
        router.push(`/blog/${data.slug}?table=${dataContext.table}`);
      }, 3000);
    }
  };

  return (
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
        value={blogPostData?.title}
      />
      <label className="mt-0 mb-0" htmlFor="slug">
        Slug:
      </label>
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
        value={blogPostData?.author}
      />
      <label className="mt-0 mb-0" htmlFor="categories">
        categories:
      </label>
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
      <label className="mt-0 mb-0" htmlFor="published_date">
        Date:
      </label>
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
        value={blogPostData?.description}
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
        value={blogPostData?.excerpt}
      ></textarea>
      <label className="mt-0 mb-0" htmlFor="body">
        Content{" "}
        {blogPostData?.content && (
          <span>
            {" "}
            {`(`}
            {countWords(blogPostData.content)} words{`)`}:
          </span>
        )}
      </label>
      <textarea
        name="content"
        id="content"
        ref={(el) => (inputRefs.current.body = el)}
        placeholder="Please enter the content of the blog post. You can use markdown or MDX."
        cols={30}
        rows={10}
        className="p-2 border-4 border-blue-500 rounded"
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
          handleTextAreaChange(event)
        }
        value={blogPostData?.content}
      ></textarea>
      <div className="h-5"></div>
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
