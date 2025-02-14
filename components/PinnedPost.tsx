import { extractFirstParagraph } from "@/utils/formatPosts";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PinnedPost() {
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
 
  return (
    <section className="bg-background-800 py-16">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-3xl font-bold text-sky-900 dark:text-sky-600">
        Pinned Post
      </h2>
      <div className="rounded-lg bg-sky-100 p-8 shadow-lg">
        <h3 className="mb-4 text-2xl font-semibold text-sky-800">
          {posts[0].title}
        </h3>
        <p className="mb-4 text-sky-700 line-clamp-2">
          {extractFirstParagraph(posts[0].content)}
        </p>
        <Link
          href={`/blog/post/${posts[0].postId}`}
          className="flex animate-bounce cursor-pointer items-center gap-x-1.5 text-sky-700 underline visited:text-purple-700 hover:text-sky-600"
        >
          Read More <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  </section>
  )
}