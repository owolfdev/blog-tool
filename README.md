Fix:

use session. only logged in users can alter blog posts.
add database credentials users can use their own database. This way it's a useful tool.

find out why markdown coming from database is not being rendered with proper line breaks.

## Blog Tool

Blog Tool is a web-based project that provides a custom interface for users to input and manage their blog posts. The project aims to simplify the process of managing multiple blog posts by automating the scheduling of posts based on their status and publishing date.

When a user logs into the Blog Tool platform, they are presented with a dashboard that displays all their current blog posts. From here, they can create new blog posts, edit existing ones, or delete posts they no longer need. The custom interface allows users to easily input all the necessary information for a blog post, such as the post title, content, and publishing date.

Once a blog post has been created, Blog Tool automatically schedules it for publication based on its status and publishing date. If a post is marked as "draft," it will not be published until the user changes its status to "published." If a post is marked as "scheduled," it will be automatically published on the specified publishing date.

Blog Tool also provides users with the ability to manage their published posts. Users can easily view and edit published posts, as well as delete them if necessary.

The MongoDB database used by Blog Tool allows for efficient storage and retrieval of blog posts, making it easy for users to manage large numbers of posts. The automated scheduling feature also helps to streamline the publishing process, reducing the amount of time and effort required to manage a blog.

Overall, Blog Tool is a powerful tool for bloggers and content creators who want to streamline their workflow and focus on creating high-quality content. By automating the scheduling and management of blog posts, this project makes it easier than ever to manage a successful blog.

Blog post Schema

    ```javascript
    {
    title: String,
    author: String,
    date: Date,
    excerpt: String,
    categories: [String],
    description: String,
    content: String,
    status: String,
    }
    ```
