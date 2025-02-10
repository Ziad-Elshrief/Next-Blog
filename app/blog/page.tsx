import PinnedPost from "@/components/PinnedPost";
import RecentPosts from "@/components/RecentPosts";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      author: { name: "Ziad Ragab" },
      content:
        "<h2><strong>The Future of Web Development</strong></h2><p>Explore the cutting-edge technologies shaping the future of web development...</p>",
      createdAt: "2025-02-10T23:22:39.101Z",
      postId: "342e51f4-4c55-408c-85b4-2577dd7f9581",
      title: "The Future of Web Development",
      updatedAt: "2025-02-10T23:22:39.101Z",
    },
  ];
  const extractFirstParagraph = (htmlString:string) => {
    const match = htmlString.match(/<p>(.*?)<\/p>/);
    return match ? match[1] : null;
  };
  return (
    <>
      <PinnedPost />
      <RecentPosts />
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-sky-900 dark:text-sky-600">
            Blog Posts
          </h2>
          <Link
            href="blog/new"
            className="bg-primary hover:bg-primary-hover flex cursor-pointer items-center justify-center gap-x-1.5 rounded-lg p-2 text-sm text-white shadow"
          >
            <PenBoxIcon className="size-3.5" />
            Create
          </Link>
        </div>
        <div className="grid gap-8">
          {posts.map((post) => (
            <article
              key={post.postId}
              className="border-b border-gray-200 pb-8 dark:border-gray-700"
            >
              <Link href={`/blog/post/${post.postId}`} className="block">
                <h2 className="mb-2 text-2xl font-bold text-sky-900 hover:text-sky-700 dark:text-sky-600">
                  {post.title}
                </h2>
                <p className="mb-4 line-clamp-2 text-gray-600 dark:text-gray-300">
                  {extractFirstParagraph(post.content)}
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{post.author.name}</span>
                  <span className="mx-2">·</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
