Notes:

read files should be accessible to the public. That will take care of the useStaticProps issue.

for create, update, delete, we need to use session. only logged in users can alter blog posts. this can be done with the react hooks so we can use the front end authentication.

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

<!-- Title: The Art of Procrastination: How to Put Off Everything Until the Last Minute
Content: In this tongue-in-cheek blog post, we explore the fine art of procrastination and provide tips for perfecting it. We cover strategies like delaying important tasks, indulging in distractions, and mastering the art of excuse-making. By embracing their inner procrastinator, readers can learn how to avoid work and still manage to get things done.
Description: Learn how to perfect the fine art of procrastination with tips and tricks for putting off important tasks until the very last minute. -->

<!-- Title: The Benefits of Being a Couch Potato: How to Embrace Your Inner Laziness
Content: This blog post takes a humorous look at the benefits of being a couch potato and offers tips for embracing one's inner laziness. We cover strategies like binge-watching TV shows, avoiding exercise, and prioritizing relaxation. By giving themselves permission to be lazy, readers can reduce stress and enjoy the simple pleasures of life.
Description: Discover the surprising benefits of being a couch potato and learn how to embrace your inner laziness with tips for relaxation and self-care. -->

<!-- Title: The Joy of Being a Perfectionist: How to Drive Yourself and Everyone Else Crazy
Content: In this lighthearted blog post, we explore the joys and pitfalls of being a perfectionist and provide tips for driving oneself and others crazy with impossible standards. We cover strategies like obsessing over details, nitpicking, and striving for unattainable perfection. By embracing their inner perfectionist, readers can learn how to alienate everyone around them while still feeling like they're achieving something.
Description: Learn how to embrace your inner perfectionist and drive yourself and everyone else crazy with tips for impossible standards and obsessive attention to detail. -->

<!-- Title: How to Sleep Your Way to the Top: The Power of Napping in the Workplace
Content: This blog post takes a humorous look at the power of napping in the workplace and offers tips for incorporating naps into one's daily routine. We cover strategies like finding the perfect nap spot, setting a timer, and using sleep aids. By prioritizing rest and relaxation, readers can boost their productivity and get ahead in their careers.
Description: Discover the power of napping in the workplace and learn how to incorporate rest and relaxation into your daily routine with actionable tips for getting the perfect nap. -->

<!-- Title: The Fine Art of Complaining: How to Be a Master of Misery
Content: In this tongue-in-cheek blog post, we explore the art of complaining and provide tips for being a master of misery. We cover strategies like finding fault in everything, dwelling on negative thoughts, and seeking out misery in all situations. By embracing their inner pessimist, readers can learn how to spread their misery to everyone around them.
Description: Learn how to become a master of misery with tips for complaining, finding fault in everything, and spreading negative thoughts to those around you. -->

Title: The Secret to Success: How to Be Mediocre and Still Achieve Greatness
Content: This blog post takes a humorous look at the secret to success and offers tips for achieving greatness while embracing mediocrity. We cover strategies like setting low expectations, avoiding risk-taking, and prioritizing comfort over growth. By accepting mediocrity, readers can achieve great things without ever leaving their comfort zone.
Description: Discover the secret to success with tips for embracing mediocrity, avoiding risk-taking, and achieving greatness without ever leaving your comfort zone.
